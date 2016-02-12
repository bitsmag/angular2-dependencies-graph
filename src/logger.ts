/// <reference path="../typings/node/node.d.ts" />
let c = require('colors');

enum LEVEL {
	INFO,
	WARN,
	FATAL, ERROR
}

class Logger {

	name;
	sysout;

	constructor() {
		this.name = require('../package.json').shortName;
		this.sysout = console;
	}

	use(customLogger) {
		this.sysout = customLogger;
	}

	title(...args) {
		this.sysout.log(
			c.magenta(...args)
		);
	}

	info(...args) {
		this.sysout.log(
			this.format(LEVEL.INFO, ...args)
		);
	}

	warn(...args) {
		this.sysout.warn(
			this.format(LEVEL.WARN, ...args)
		);
	}

	error(...args) {
		this.sysout.error(
			this.format(LEVEL.FATAL, ...args)
		);
	}

	fatal(...args) {
		this.error(...args);
	}

	private format(level, ...args) {

		if (!this.sysout.Console) {
			return args.join(' ');
		}

		let pad = (s, l, c = '') => {
			return s + Array(Math.max(0, l - s.length + 1)).join(c)
		};

		let msg = args.join(' ');
		if (args.length > 1) {
			msg = `${pad(args.shift(), 15, ' ')}: ${args.join(' ')}`;
		}


		switch (level) {
			case LEVEL.INFO:
				msg = c.green(msg);
				break;

			case LEVEL.WARN:
				msg = c.yellow(msg);
				break;

			case LEVEL.ERROR:
			case LEVEL.FATAL:
				msg = c.red(msg);
				break;
		}

		return [
			c.yellow.bgMagenta(` ${this.name} `),
			c.yellow.bgBlue(` ${new Date().toISOString()} `),
			' ',
			msg
		].join('')
	}
}

export let logger = new Logger();