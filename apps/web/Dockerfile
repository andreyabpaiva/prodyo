FROM oven/bun:1.3-alpine AS builder
WORKDIR /src

COPY apps/web/package.json ./apps/web/package.json
COPY package.json ./package.json
RUN cd apps/web && bun install --frozen-lockfile

COPY apps/web ./apps/web

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN cd apps/web && bun run build

FROM nginx:1.27-alpine
COPY --from=builder /src/apps/web/dist /usr/share/nginx/html
EXPOSE 80
