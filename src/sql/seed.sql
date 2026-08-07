INSERT INTO authors (name, email, bio)
VALUES
('Juan Perez', 'juan@example.com', 'Backend Developer'),
('Maria Gomez', 'maria@example.com', 'Frontend Developer');

INSERT INTO posts (title, content, author_id, published)
VALUES
('Primer Post', 'Contenido del primer post', 1, true),
('Segundo Post', 'Contenido del segundo post', 2, false);

INSERT INTO comments (post_id, author_id, content)
VALUES
(1, 2, 'Muy buen artículo'),
(1, 1, 'Gracias por comentar');