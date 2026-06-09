FROM golang:1.25-bookworm AS builder

WORKDIR /src
ENV CGO_ENABLED=1

COPY apps/api/go.mod apps/api/go.sum ./
RUN go mod download

COPY apps/api/ ./
RUN go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

FROM debian:bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && groupadd --system app && useradd --system --gid app --home /app app

WORKDIR /app
COPY --from=builder /out/api /app/api

RUN mkdir -p /data && chown -R app:app /data /app
USER app

EXPOSE 8080
ENTRYPOINT ["/app/api"]
