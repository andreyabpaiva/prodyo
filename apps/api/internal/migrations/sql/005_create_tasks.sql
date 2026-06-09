CREATE TABLE IF NOT EXISTS tasks (
    id              UUID          PRIMARY KEY,
    iteration_id    UUID          NOT NULL REFERENCES iterations(id) ON DELETE CASCADE,
    title           VARCHAR(200)  NOT NULL,
    description     VARCHAR(2000) NOT NULL DEFAULT '',
    status          VARCHAR(20)   NOT NULL DEFAULT 'Backlog',
    tags            VARCHAR(2000) NOT NULL DEFAULT '[]',
    function_points DOUBLE        NOT NULL DEFAULT 0,
    expected_time   BIGINT        NOT NULL DEFAULT 0,
    time_spent      BIGINT        NOT NULL DEFAULT 0,
    assignee_id     UUID          REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
