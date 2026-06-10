package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/memberrepo"
	"github.com/google/uuid"
)

type AddMemberInput struct {
	UserID uuid.UUID
	Roles  []models.Role
}

type UpdateMemberInput struct {
	Roles []models.Role
}

type MemberUsecase struct {
	memberRepo memberrepo.MemberRepository
}

func NewMemberUsecase(memberRepo memberrepo.MemberRepository) *MemberUsecase {
	return &MemberUsecase{memberRepo: memberRepo}
}

func (u *MemberUsecase) List(ctx context.Context, projectID uuid.UUID) ([]models.Member, error) {
	return u.memberRepo.FindByProjectID(ctx, projectID)
}

func (u *MemberUsecase) Add(ctx context.Context, projectID uuid.UUID, input AddMemberInput) (*models.Member, error) {
	member := &models.Member{
		ID:        uuid.New(),
		UserID:    input.UserID,
		ProjectID: projectID,
		Roles:     utils.RoleSlice[models.Role](input.Roles),
		CreatedAt: time.Now().UTC(),
	}
	if err := u.memberRepo.Create(ctx, member); err != nil {
		return nil, err
	}
	return member, nil
}

func (u *MemberUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateMemberInput) (*models.Member, error) {
	member, err := u.memberRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	member.Roles = utils.RoleSlice[models.Role](input.Roles)
	if err := u.memberRepo.Update(ctx, member); err != nil {
		return nil, err
	}
	return member, nil
}

func (u *MemberUsecase) Remove(ctx context.Context, id uuid.UUID) error {
	return u.memberRepo.Delete(ctx, id)
}
