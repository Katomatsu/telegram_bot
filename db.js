const { Sequelize } = require('sequelize');

module.exports = new Sequelize('telegram_bot', 'root', 'root', {
	host: 'master.ab959b51-7300-458a-b8b9-96fa83176533.c.dbaas.selcloud.ru',
	port: '5432',
    dialect: 'postgres'
});
