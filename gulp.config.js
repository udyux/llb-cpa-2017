const path = require('path')
const fs = require('fs-extra')
const copy = require('recursive-copy')

// config
const config = {
  build: './dist',

  server: {
    proxy: false,
    port: 8080,
    sync: true
  },

	markup: {
		src: '*.html',
		options: {
			collapseWhitespace: true,
			conservativeCollapse: true,
			collapseBooleanAttributes: true
		}
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
    const buildPath = path.resolve(__dirname, config.build)

    config.build = {
      dir: buildPath,
      js: path.resolve(buildPath, config.js.dest),
      sass: path.resolve(buildPath, config.sass.dest)
    }

    config.js.dest = path.resolve(__dirname, config.js.dest)
		config.sass.dest = path.resolve(__dirname, config.sass.dest)

    Object.keys(config.watch).forEach(key => {
      config.watch[key] = config.watch[key].replace(/^\.\//, '')
    })

    let bsConfig = {
			port: config.server.port,
			ui: { port: config.server.port + 1 }
		}

    if (!config.server.sync) bsConfig.ghostMode = false

    if (config.server.proxy) bsConfig.proxy = config.server.proxy
    else bsConfig.server = './'

    config.browserSync = bsConfig

		return config
	},

	sassReporter(e) {
		let title = `${e.relativePath}:${e.line}`
		let message = e.messageOriginal.replace(/\s{4}/,'')
		let count = chalk.bold(chalk.red(`${symbols.error} 1 problem (1 error, 0 warnings)`))
		console.log(chalk.underline(title), '\n ', message, `\n\n${count}`, '\n')
		this.emit('end')
	},

	jsReporter(e) {
    let msg = (e.loc.file)
			? `\n[JS Error] ${e.loc.file}: ${e.message} (${e.loc.line}:${e.loc.column})\n`
			: `\n[JS Error] ${e.message}\n`

		console.log(msg)
		this.emit('end')
	},

	copyAssets() {
		const src = path.resolve(__dirname)
		const dest = path.resolve(__dirname, config.build)

		let opts = {
			overwrite: true,
			filter: [
				config.markup.src,
				'assets/**/*'
			]
		}

		return fs.emptyDir(dest)
			.then(() => copy(src, dest, opts))
			.then(() => {
				console.log('copy success')
				process.exit(0)
			})
			.catch(err => {
				console.log(err)
				process.exit(1)
			})
	},
}
