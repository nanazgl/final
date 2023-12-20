CREATE DATABASE flashcard;

CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    theme_id INT REFERENCES themes(id) ON DELETE CASCADE
);
INSERT INTO themes (name) VALUES ('emotions'), ('weather'), ('food'), ('clothes'), ('job');

INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Happy', 'Cчастливый', 1),
    ('Sunny', 'Солнечно', 2),
    ('Cuisine', 'Кухня', 3),
	('Cargo Pants','Штаны Карго',4),
	('Teacher','Учитель',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Sad', 'Грустный', 1),
    ('Rainy', 'Дождливо', 2),
    ('Chocolate', 'Шоколад', 3),
	('Skirt','Юбка',4),
	('Pilot','Пилот',5);
	
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Delightful', 'Восхитительный', 1),
    ('Breeze', 'Ветер', 2),
    ('Cupcake', 'Капкейк', 3),
	('Shorts','Шорты',4),
	('Actor','Актер',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Upset', 'Расстроенный', 1),
    ('Fog', 'Туман', 2),
    ('Flour', 'Тесто', 3),
	('Blouse','Блузка',4),
	('Lifeguard','Спаситель',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Joy', 'Радость', 1),
    ('Cloudy', 'Облачно', 2),
    ('Grape', 'Виноград', 3),
	('Belt','Ремень',4),
	('Nurse','Медсестра',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Embarrassed', 'Смущенный', 1),
    ('Dry', 'Сухо', 2),
    ('Ham', 'Тунец', 3),
	('Gloves','Перчатки',4),
	('Writer','Писатель',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Mad', 'Злой', 1),
    ('Snowy', 'Снежно', 2),
    ('Hot dog', 'Хот дог', 3),
	('Dress','Платье',4),
	('Designer','Дизайнер',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Marvelous', 'Чудесный', 1),
    ('Tornado', 'Торнадо', 2),
    ('Macaroon', 'Макароны', 3),
	('Scarf','Шарф',4),
	('Cashier','Кассир',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Grateful', 'Благодарный', 1),
    ('Wind', 'Ветер', 2),
    ('Noodles', 'Лапша', 3),
	('Hat','Шапка',4),
	('Barber','Барбер',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Furios', 'Яростный', 1),
    ('Flood', 'Наводнение', 2),
    ('Pancake', 'Панкейк', 3),
	('Jeans','Джинсы',4),
	('Engineer','Инженер',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Thrilled', 'Заинтригованный', 1),
    ('Sunrise', 'Рассвет', 2),
    ('Salmon', 'Лосось', 3),
	('Cardigan','Кардиган',4),
	('Singer','Певец',5);
INSERT INTO flashcards (question, answer, theme_id) VALUES
    ('Provoked', 'Спровоцированный', 1),
    ('Sunset', 'Закат', 2),
    ('Waffle', 'Вафли', 3),
	('Slippers','Тапочки',4),
	('Motion Designer','Моушн дизайнер',5);
	

	


	
