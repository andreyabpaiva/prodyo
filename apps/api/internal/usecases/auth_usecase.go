package usecases

import (
	"context"
	"database/sql"
	"errors"
	"net/http"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/userrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/services"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrEmailTaken         = errors.New("email already taken")
	ErrInvalidCredentials = errors.New("invalid credentials")
)

type RegisterInput struct {
	Name     string
	Email    string
	Password string
}

type LoginInput struct {
	Email    string
	Password string
}

type AuthUsecase struct {
	userRepo    userrepo.UserRepository
	authService *services.AuthService
}

func NewAuthUsecase(userRepo userrepo.UserRepository, authService *services.AuthService) *AuthUsecase {
	return &AuthUsecase{userRepo: userRepo, authService: authService}
}

func (u *AuthUsecase) Register(ctx context.Context, input RegisterInput) (*models.User, string, error) {
	_, err := u.userRepo.FindByEmail(ctx, input.Email)
	if err == nil {
		return nil, "", ErrEmailTaken
	}
	if !errors.Is(err, sql.ErrNoRows) {
		return nil, "", err
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	now := time.Now().UTC()
	user := &models.User{
		ID:           uuid.New(),
		Name:         input.Name,
		Email:        input.Email,
		PasswordHash: string(hash),
		CreatedAt:    now,
		UpdatedAt:    now,
	}
	if err := u.userRepo.Create(ctx, user); err != nil {
		return nil, "", err
	}

	token, err := u.authService.Sign(user.ID)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (u *AuthUsecase) Login(ctx context.Context, input LoginInput) (*models.User, string, error) {
	user, err := u.userRepo.FindByEmail(ctx, input.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, "", ErrInvalidCredentials
		}
		return nil, "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return nil, "", ErrInvalidCredentials
	}

	token, err := u.authService.Sign(user.ID)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (u *AuthUsecase) Me(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	return u.userRepo.FindByID(ctx, userID)
}

func (u *AuthUsecase) SetCookie(w http.ResponseWriter, token string) {
	u.authService.SetCookie(w, token)
}

func (u *AuthUsecase) ClearCookie(w http.ResponseWriter) {
	u.authService.ClearCookie(w)
}
