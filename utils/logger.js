const logger = require('tracer').colorConsole({
	format: [
		'[{{title}} {{timestamp}}] [{{file}}:{{line}}] {{path}} Call from {{method}} \t {{message}}',
		{
			error: '[{{title}} {{timestamp}}] [{{file}}:{{line}}] {{path}} Call from {{method}} \t {{message}} \nCall Stack:\n{{stack}}',
			info: '[{{title}} {{timestamp}}] [{{file}}:{{line}}] \t {{message}}'
		}
	],
	dateformat: 'HH:MM:ss.L',
	preprocess: function (data) {
		data.title = data.title.toUpperCase();
	}
});

module.exports = logger;
