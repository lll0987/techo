CREATE TABLE IF NOT EXISTS out_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goods INTEGER NOT NULL,
    tag INTEGER,
    event INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount INTEGER,
    specs TEXT,
    remark TEXT
);