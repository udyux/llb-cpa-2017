const gulp = require('gulp')
const sass = require('gulp-sass')
const cssnano = require('cssnano')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const plumber = require('gulp-plumber')
const babel = require('rollup-plugin-babel')
const rollup = require('gulp-better-rollup')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const customMedia = require('postcss-custom-media')
const browserSync = require('browser-sync').create()
const cjsResolve = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const utils = require('./gulp.config')
const config = utils.config

// sass
gulp.task('sass:dev', () => {
	return gulp.src(config.sass.src)
		.pipe(plumber(utils.sassReporter))
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass.options))
		.pipe(postcss([
			customMedia(),
			autoprefixer(config.sass.autoprefixer),
			cssnano()
		]))
		.pipe(sourcemaps.write())
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.sass.dest))
		.pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('sass', () => {
	return gulp.src(config.sass.src)
		.pipe(sass(config.sass.options))
		.pipe(postcss([
			customMedia(),
			autoprefixer(config.sass.autoprefixer),
			cssnano()
		]))
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.sass.dest))
})

// js
gulp.task('js:dev', () => {
	return gulp.src(config.js.src)
		.pipe(plumber(utils.jsReporter))
		.pipe(sourcemaps.init())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(rollup({
			plugins: [
				cjsResolve(),
				nodeResolve(),
				babel(config.js.babel)
			]
		}, 'iife'))
		.pipe(sourcemaps.write())
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.js.dest))
})

gulp.task('js', () => {
	return gulp.src(config.js.src)
		.pipe(rollup({
			plugins: [
				cjsResolve(),
				nodeResolve(),
				babel(config.js.babel)
			]
		}, 'iife'))
		.pipe(uglify())
		.pipe(gulp.dest(config.js.dest))
})

// watch
gulp.task('watch', ['sass:dev', 'js:dev'], () => {
	gulp.watch(config.watch.sass, ['sass:dev'])
	gulp.watch(config.watch.js, ['js:dev'])
})

// browser sync
gulp.task('dev', ['watch'], () => {
	browserSync.init(utils.bsConfig)
	gulp.watch(`${config.js.dest}/*.js`).on('change', browserSync.reload)
	gulp.watch(config.watch.markup).on('change', browserSync.reload)
})

// build
gulp.task('build', ['sass', 'js'])
