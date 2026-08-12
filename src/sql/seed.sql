-- Seed de datos de prueba para MiniBlog API
-- Ejecutar después de setup.sql
 
-- Limpia las tablas antes de insertar (respeta el orden por las FK)
TRUNCATE TABLE posts RESTART IDENTITY CASCADE;
TRUNCATE TABLE authors RESTART IDENTITY CASCADE;
 
-- Authors
INSERT INTO authors (name, email, bio) VALUES
  ('Juan Pérez', 'juan@example.com', 'Escritor y desarrollador apasionado por la tecnología'),
  ('María González', 'maria.gonzalez@example.com', 'Periodista especializada en tecnología y ciencia'),
  ('Carlos Rodríguez', 'carlos.rodriguez@example.com', 'Fotógrafo freelance y bloguero de viajes'),
  ('Ana Fernández', 'ana.fernandez@example.com', 'Ingeniera de software con foco en desarrollo web'),
  ('Diego Martínez', 'diego.martinez@example.com', 'Chef y creador de contenido gastronómico'),
  ('Lucía Sánchez', 'lucia.sanchez@example.com', 'Diseñadora gráfica y entusiasta del arte digital');
 
-- Posts (author_id referencia el orden de inserción de arriba: 1 a 6)
INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Los avances más recientes en inteligencia artificial', 'Un repaso por las últimas tendencias en IA y su impacto en la industria tecnológica.', true),
  (2, 'Cómo planificar tu próximo viaje de fotografía', 'Consejos prácticos para elegir destino, equipo y horarios ideales para capturar buenas imágenes.', true),
  (3, 'Buenas prácticas para el desarrollo web moderno', 'Repasamos patrones y herramientas que mejoran la mantenibilidad de un proyecto frontend.', true),
  (4, 'Recetas simples para una cena rápida entre semana', 'Ideas fáciles y rápidas para cocinar sin perder sabor ni tiempo.', true),
  (5, 'Tendencias en diseño gráfico digital para este año', 'Un vistazo a las paletas, tipografías y estilos que están marcando el diseño actual.', true),
  (6, 'Reflexiones sobre el periodismo en la era digital', 'Cómo cambió la forma de investigar y contar noticias con las nuevas herramientas online.', true);