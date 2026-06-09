package config

import (
	"os"
	"strconv"
)

type Config struct {
	APIHost            string
	APIPort            string
	DuckDBPath         string
	JWTSecret          string
	JWTTTLSeconds      int
	CookieDomain       string
	CookieSecure       bool
	CookieSameSite     string
	CORSAllowedOrigins string
}

func Load() Config {
	return Config{
		APIHost:            getEnv("API_HOST", "0.0.0.0"),
		APIPort:            getEnv("API_PORT", "8080"),
		DuckDBPath:         getEnv("DUCKDB_PATH", "./data/prodyo.duckdb"),
		JWTSecret:          getEnv("JWT_SECRET", ""),
		JWTTTLSeconds:      getEnvInt("JWT_TTL_SECONDS", 86400),
		CookieDomain:       getEnv("COOKIE_DOMAIN", "localhost"),
		CookieSecure:       getEnv("COOKIE_SECURE", "false") == "true",
		CookieSameSite:     getEnv("COOKIE_SAMESITE", "Lax"),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", ""),
	}
}

func getEnv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return fallback
}
