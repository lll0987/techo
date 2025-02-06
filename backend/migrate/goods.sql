CREATE TABLE IF NOT EXISTS goods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    remark TEXT,
    total INTEGER DEFAULT 0,
    quantity INTEGER DEFAULT 0,
    min INTEGER
);

CREATE TABLE IF NOT EXISTS goods_tag (
    goods_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (goods_id, tag_id)
);
