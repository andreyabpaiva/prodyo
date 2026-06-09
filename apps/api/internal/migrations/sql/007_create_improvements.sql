CREATE TABLE IF NOT EXISTS improvements (
    id              UUID          PRIMARY KEY,
    task_id         UUID          NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    description     VARCHAR(2000) NOT NULL DEFAULT '',
    function_points DOUBLE        NOT NULL DEFAULT 0,
    limit_date      TIMESTAMP     NOT NULL,
    created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
