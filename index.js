const TelegramBot = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')
const token = '6797697710:AAE-t0A0FpiT_OjdYJJ7I1Pblbpml64bwq8';
const bot = new TelegramBot(token, { polling: true });


const chats = {};


const startGame = async chatId => {
	await bot.sendMessage(
		chatId,
		"Now I'll guess a number and you have to guess it"
	);
	const randomNum = Math.floor(Math.random() * 10);
	chats[chatId] = randomNum;
	await bot.sendMessage(chatId, 'Guess', gameOptions);
};

const start = () => {
	bot.setMyCommands([
		{
			command: '/start',
			description: 'greeting'
		},
		{
			command: '/info',
			description: 'get user data'
		},
		{
			command: '/game',
			description: 'Guess the number game'
		}
	]);

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if (text === '/start') {
			await bot.sendSticker(
				chatId,
				'https://tlgrm.eu/_/stickers/d97/c1e/d97c1e8a-943c-37c4-963f-8db69b18db05/192/4.webp'
			);
			return bot.sendMessage(chatId, `Welcome to Katomatsu's bot`);
		}
		if (text === '/info') {
			return bot.sendMessage(
				chatId,
				`Your name is ${msg.from.first_name}`
			);
		}
		if (text === '/game') {
			return startGame(chatId)
		}
		return bot.sendMessage(chatId, "I don't understand you");
	});

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }
		if (+data === chats[chatId]) {
			return bot.sendMessage(
				chatId,
				`Congratulation, you guessed the number ${chats[chatId]}`,
				againOptions
			);
		} else {
			return bot.sendMessage(
				chatId,
				`Unfortunately, your answer is wrong, bot guessed the number ${chats[chatId]}`,
				againOptions
			);
		}
	});
};

start();
