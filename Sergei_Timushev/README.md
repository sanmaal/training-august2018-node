# Инструкция

**Инициализация БД**
npm run dbinit

**Запуск приложения**
npm run start

**Api User**

### Регистрация пользователя
POST запрос на /users/registration
с передачей
{
"username": "test7",
"email": "test7@email.com",
"password": "qwerty"
}

### Авторизация пользователя
POST запрос на /users/login
с передачей 
{
"email": "test7@email.com",
"password": "qwerty"
}

### Logout пользователя
GET запрос на /users/logout


**Api Покемонов**

### Получить покемонов
GET запрос на /pokemons

### Поиск покемона по имени
POST запрос на /pokemons
с передачей
{
	"name": "charmeleon"
}

### Пагинация
GET запрос на /pokemons/[page]
Где [page] - номер страницы

### Получить конкретного покемона
GET запрос на/pokemons/pokemon/[id]
Где [id] - айдишник покемона (поле id в БД)

### Поймать конкретного покемона (только для авторизованных)
PUT запрос на /pokemons/catch/[id]
Где [id] - айдишник покемона (поле id в БД)

### Показать пойманных покемонов (только для авторизованных)
GET запрос на /pokemons/caught/1