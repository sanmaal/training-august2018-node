const pokemonsRoutes = require('./pokemonsRoutes');
module.exports = function(app, db) {
    pokemonsRoutes(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};
