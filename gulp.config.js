// config
const config = {
  browsersync: {
    proxy: null,
    port: 8080,
    sync: true
  },

  sass: {
		src: ['./sass/*.scss'],
		dest: './assets/css',
		options: { indentedSyntax: false },
		autoprefixer: {
			browsers: ['last 2 versions', 'not ie <= 9']
		}
	},

	js: {
		src: './scripts/*.js',
		dest: './assets/js',
		eslint: { fix: true },
		babel: {
		  presets: ['es2015-rollup']
		}
	},

	watch: {
		sass: 'sass/**/*.scss',
		js: 'scripts/**/*.js',
		markup: '**/*.html'
	}
}

// helpers
const symbols = require('log-symbols')
const chalk = require('chalk')

module.exports = {
	get config() {
		config.sass.dest = config.sass.dest.replace(/\/$/, '')
	  config.js.dest = config.js.dest.replace(/\/$/, '')
		return config
	},

	get bsConfig() {
		let conf = {
			port: config.browsersync.port,
			ui: { port: config.browsersync.port + 1 }
		}

    if (!config.browsersync.sync) conf.ghostMode = false

    if (config.browsersync.proxy) conf.proxy = config.browsersync.proxy
    else conf.server = './'

		return conf
	},

	sassReporter(e) {
		let title = `${e.relativePath}:${e.line}`
		let message = e.messageOriginal.replace(/\s{4}/,'')
		let count = chalk.bold(chalk.red(`${symbols.error} 1 problem (1 error, 0 warnings)`))
		console.log(chalk.underline(title), '\n ', message, `\n\n${count}`, '\n')
		this.emit('end')
	},

	jsReporter(e) {
		console.log(e)
		this.emit('end')
	}
}
