CREATE TABLE IF NOT EXISTS iterations (
    id         UUID        PRIMARY KEY,
    project_id UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    goal       VARCHAR(500) NOT NULL DEFAULT '',
    start_at   TIMESTAMP   NOT NULL,
    end_at     TIMESTAMP   NOT NULL,
    status     VARCHAR(20) NOT NULL DEFAULT 'Planned',
    increment  INTEGER     NOT NULL DEFAULT 1,
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);
