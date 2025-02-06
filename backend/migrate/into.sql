CREATE TABLE IF NOT EXISTS into_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goods INTEGER NOT NULL,
    tag INTEGER,
    event INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    price INTEGER NOT NULL,
    unit_qty INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    specs TEXT,
    remark TEXT
);
