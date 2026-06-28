CREATE TABLE IF NOT EXISTS members (
    id         UUID         PRIMARY KEY,
    user_id    UUID         NOT NULL REFERENCES users(id),
    project_id UUID         NOT NULL REFERENCES projects(id),
    roles      VARCHAR(200) NOT NULL DEFAULT '[]',
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id)
);
