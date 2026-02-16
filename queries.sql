-- ПРАКТИКА SQL: Тестирование базы данных интернет-магазина

-- 1. Поиск товаров, которые заканчиваются на складе (меньше 5 штук)
SELECT * FROM products 
WHERE stock < 5;

-- 2. Проверка работы поиска: ищем все товары со словом "Айфон"
SELECT * FROM products 
WHERE name LIKE '%Айфон%';

-- 3. Проверка фильтрации: товары категории "Телефоны" от дешевых к дорогим
SELECT name, price 
FROM products 
WHERE category = 'Телефоны' 
ORDER BY price ASC;