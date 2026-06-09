package models

type Role string

const (
	RoleOwner  Role = "Owner"
	RoleAdmin  Role = "Admin"
	RoleMember Role = "Member"
)
