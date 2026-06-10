package config

import (
	"fmt"

	"github.com/andreyapaiva/prodyo/apps/api/internal/migrations"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/bugrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/impropo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/iterrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/memberrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/projectrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/taskrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/userrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/services"
	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/jmoiron/sqlx"
	_ "github.com/marcboeker/go-duckdb"
)

type Container struct {
	Config Config
	DB     *sqlx.DB

	UserRepo        userrepo.UserRepository
	ProjectRepo     projectrepo.ProjectRepository
	MemberRepo      memberrepo.MemberRepository
	IterationRepo   iterrepo.IterationRepository
	TaskRepo        taskrepo.TaskRepository
	BugRepo         bugrepo.BugRepository
	ImprovementRepo impropo.ImprovementRepository

	AuthService      *services.AuthService
	AuthUsecase      *usecases.AuthUsecase
	TaskChildFactory *services.TaskChildFactory
}

func NewContainer(cfg Config) (*Container, error) {
	db, err := sqlx.Open("duckdb", cfg.DuckDBPath)
	if err != nil {
		return nil, fmt.Errorf("open db: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping db: %w", err)
	}
	if err := migrations.Run(db.DB); err != nil {
		return nil, fmt.Errorf("run migrations: %w", err)
	}

	userRepo := userrepo.New(db)
	taskRepo := taskrepo.New(db)
	bugRepo := bugrepo.New(db)
	improveRepo := impropo.New(db)

	authService := services.NewAuthService(
		cfg.JWTSecret,
		cfg.JWTTTLSeconds,
		cfg.CookieDomain,
		cfg.CookieSecure,
		cfg.CookieSameSite,
	)
	authUsecase := usecases.NewAuthUsecase(userRepo, authService)
	factory := services.NewTaskChildFactory(taskRepo, bugRepo, improveRepo)

	return &Container{
		Config:           cfg,
		DB:               db,
		UserRepo:         userRepo,
		ProjectRepo:      projectrepo.New(db),
		MemberRepo:       memberrepo.New(db),
		IterationRepo:    iterrepo.New(db),
		TaskRepo:         taskRepo,
		BugRepo:          bugRepo,
		ImprovementRepo:  improveRepo,
		AuthService:      authService,
		AuthUsecase:      authUsecase,
		TaskChildFactory: factory,
	}, nil
}

func (c *Container) Close() error {
	return c.DB.Close()
}
