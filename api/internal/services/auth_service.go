package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

const cookieName = "prodyo_token"

type Claims struct {
	jwt.RegisteredClaims
	UserID string `json:"user_id"`
}

type CookieOptions struct {
	Domain   string
	Secure   bool
	SameSite http.SameSite
}

type AuthService struct {
	secret     []byte
	ttl        time.Duration
	cookieOpts CookieOptions
}

func NewAuthService(secret string, ttlSeconds int, domain string, secure bool, sameSite string) *AuthService {
	return &AuthService{
		secret: []byte(secret),
		ttl:    time.Duration(ttlSeconds) * time.Second,
		cookieOpts: CookieOptions{
			Domain:   domain,
			Secure:   secure,
			SameSite: parseSameSite(sameSite),
		},
	}
}

func (s *AuthService) Sign(userID uuid.UUID) (string, error) {
	now := time.Now()
	claims := Claims{
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(s.ttl)),
		},
		UserID: userID.String(),
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(s.secret)
}

func (s *AuthService) Parse(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return s.secret, nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token claims")
	}
	return claims, nil
}

func (s *AuthService) SetCookie(w http.ResponseWriter, token string) {
	http.SetCookie(w, &http.Cookie{
		Name:     cookieName,
		Value:    token,
		HttpOnly: true,
		Secure:   s.cookieOpts.Secure,
		SameSite: s.cookieOpts.SameSite,
		Domain:   s.cookieOpts.Domain,
		Path:     "/",
		MaxAge:   int(s.ttl.Seconds()),
	})
}

func (s *AuthService) ClearCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     cookieName,
		Value:    "",
		HttpOnly: true,
		Secure:   s.cookieOpts.Secure,
		SameSite: s.cookieOpts.SameSite,
		Domain:   s.cookieOpts.Domain,
		Path:     "/",
		MaxAge:   -1,
	})
}

func parseSameSite(s string) http.SameSite {
	switch s {
	case "Strict":
		return http.SameSiteStrictMode
	case "None":
		return http.SameSiteNoneMode
	default:
		return http.SameSiteLaxMode
	}
}
