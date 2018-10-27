INSERT INTO role (id, `create_date_time`, `update_date_time`, `name`)
VALUES (1, NOW(), NOW(), 'ADMIN') ON DUPLICATE KEY UPDATE name = 'ADMIN';
INSERT INTO role (id, `create_date_time`, `update_date_time`, `name`)
VALUES (2, NOW(), NOW(), 'ALUMNO') ON DUPLICATE KEY UPDATE name = 'ALUMNO';
INSERT INTO role (id, `create_date_time`, `update_date_time`, `name`)
VALUES (3, NOW(), NOW(), 'PROFESOR') ON DUPLICATE KEY UPDATE name = 'PROFESOR';