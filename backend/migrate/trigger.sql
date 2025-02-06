BEGIN TRANSACTION;

DROP TRIGGER IF EXISTS update_goods_after_into;
CREATE TRIGGER update_goods_after_into
AFTER INSERT ON into_item
BEGIN
    UPDATE goods
    SET quantity = quantity + NEW.unit_qty,
        total = total + NEW.unit_qty
    WHERE id = NEW.goods;
END;

DROP TRIGGER IF EXISTS update_goods_after_into_update;
CREATE TRIGGER update_goods_after_into_update
AFTER UPDATE ON into_item
BEGIN
    UPDATE goods
    SET quantity = quantity - OLD.unit_qty + NEW.unit_qty,
        total = total - OLD.unit_qty + NEW.unit_qty
    WHERE id = NEW.goods;
END;

DROP TRIGGER IF EXISTS update_goods_after_out;
CREATE TRIGGER update_goods_after_out
AFTER INSERT ON out_item
BEGIN
    UPDATE goods
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.goods;
END;

DROP TRIGGER IF EXISTS update_goods_after_out_update;
CREATE TRIGGER update_goods_after_out_update
AFTER UPDATE ON out_item
BEGIN
    UPDATE goods
    SET quantity = quantity + OLD.unit_qty - NEW.unit_qty
    WHERE id = NEW.goods;
END;

COMMIT;