CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start INTEGER NOT NULL,
    end INTEGER NOT NULL,
    grain INTEGER NOT NULL,
    topic INTEGER NOT NULL,
    value INTEGER,
    remark TEXT,
    title TEXT
);

CREATE INDEX IF NOT EXISTS idx_event_start ON event (start);

CREATE TABLE IF NOT EXISTS event_tag (
    event_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (event_id, tag_id)
);
