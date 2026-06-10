package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/memberrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/projectrepo"
	"github.com/google/uuid"
)

type CreateProjectInput struct {
	Name        string
	Description string
	Tags        []string
}

type UpdateProjectInput struct {
	Name        string
	Description string
	Tags        []string
}

type ProjectUsecase struct {
	projectRepo projectrepo.ProjectRepository
	memberRepo  memberrepo.MemberRepository
}

func NewProjectUsecase(projectRepo projectrepo.ProjectRepository, memberRepo memberrepo.MemberRepository) *ProjectUsecase {
	return &ProjectUsecase{projectRepo: projectRepo, memberRepo: memberRepo}
}

func (u *ProjectUsecase) Create(ctx context.Context, userID uuid.UUID, input CreateProjectInput) (*models.Project, error) {
	now := time.Now().UTC()
	project := &models.Project{
		ID:          uuid.New(),
		Name:        input.Name,
		Description: input.Description,
		Tags:        utils.StringSlice(input.Tags),
		CreatedAt:   now,
		UpdatedAt:   now,
	}
	if err := u.projectRepo.Create(ctx, project); err != nil {
		return nil, err
	}

	owner := &models.Member{
		ID:        uuid.New(),
		UserID:    userID,
		ProjectID: project.ID,
		Roles:     utils.RoleSlice[models.Role]{models.RoleOwner},
		CreatedAt: now,
	}
	if err := u.memberRepo.Create(ctx, owner); err != nil {
		return nil, err
	}

	return project, nil
}

func (u *ProjectUsecase) List(ctx context.Context, userID uuid.UUID) ([]models.Project, error) {
	return u.projectRepo.FindByUserID(ctx, userID)
}

func (u *ProjectUsecase) GetByID(ctx context.Context, id uuid.UUID) (*models.Project, error) {
	return u.projectRepo.FindByID(ctx, id)
}

func (u *ProjectUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateProjectInput) (*models.Project, error) {
	project, err := u.projectRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	project.Name = input.Name
	project.Description = input.Description
	project.Tags = utils.StringSlice(input.Tags)
	project.UpdatedAt = time.Now().UTC()
	if err := u.projectRepo.Update(ctx, project); err != nil {
		return nil, err
	}
	return project, nil
}

func (u *ProjectUsecase) Delete(ctx context.Context, id uuid.UUID) error {
	return u.projectRepo.Delete(ctx, id)
}
