//used gulp modules
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	jshint = require('gulp-jshint'),
	cssbeauty = require('gulp-cssbeautify'),
	pug = require('gulp-pug')
	pugBeauty = require('gulp-pug-beautify'),
	babel = require('gulp-babel'),
	minify = require('gulp-minify'),
	changed = require('gulp-changed'),
	cache = require('gulp-cache'),
	critical = require('critical').stream,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	babelify = require('babelify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	svgmin = require('gulp-svgmin'),
	browserify = require('browserify'),
	clean = require('gulp-clean')

//paths config
var config = {
	srcPath: 'src',
	distPath: 'dist',

	src: {
		styles: 	'src/styles/**/**/*.scss',
		templates: 	'src/templates/**/*.pug',
		images: 	'src/images/**',
		fonts: 		'src/fonts/**',
		scripts: 	'src/js/*.js',
		libjs: 		'src/lib/js/*.js',
		libcss: 	'src/lib/css/*.scss',
		files: 		'src/files/**'
	},

	dist: {
		styles: 	'dist/assets/css',
		images: 	'dist/assets/images/',
		fonts: 		'dist/assets/fonts',
		scripts: 	'dist/assets/js',
		libjs: 		'dist/assets/js/lib',
		libcss: 	'dist/assets/css/lib',
		files: 		'dist/assets/files/'
	}
}

//TASKS SETUP//

gulp.task('babelify', function () {
    var bundler = browserify({
        entries: 'src/tmp/main.js',
        debug: true
    });
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(babel({
	        presets: ['es2015']
	    }))
        .pipe(gulp.dest('dist/assets/js'));
    return new Promise(function(resolve, reject) {
	    resolve();
  	});
});

gulp.task('clean', function () {
    return gulp.src('src/tmp')
        .pipe(clean({force: true}));
});

 //Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/', inline: true, css: ['dist/assets/css/main.css', 'dist/assets/css/media.css']}))
        .on('error', function(err) { log.error(err.message); })
        .pipe(gulp.dest('*.html'));
});

//compile scss to css (gulp styles)
gulp.task('styles', function() {
	return gulp.src(config.src.styles)
	.pipe(plumber())
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(cssbeauty())
	.pipe(gulp.dest(config.dist.styles)) //create beauty css file
	.pipe(notify({ message: 'Styles task complete!' }))
});

//compile lib (gulp lib - its just a css libs)
gulp.task('libcss', function() {
	return gulp.src(config.src.libcss)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest(config.dist.libcss)) //create beauty css file
	.pipe(notify({ message: 'Styles task complete!' }))
});

//build css
gulp.task('css', function () {
	return gulp.src([config.src.styles, config.src.libcss])
});

//compile pug to html (gulp templates)
gulp.task('templates', function() {
	return gulp.src(config.src.templates)
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(config.distPath))
	.pipe(notify({ message: 'Templates task complete!' }))
});

//compile images (gulp images)
gulp.task('images', function() {
	return gulp.src(config.src.images)
	.pipe(cache(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 10}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	])))
	.pipe(gulp.dest(config.dist.images))
	.pipe(notify({ message: 'Images task complete!' }))
});

//compile fonts (gulp fonts)
gulp.task('fonts', function() {
	return gulp.src(config.src.fonts)
	.pipe(gulp.dest(config.dist.fonts))
	.pipe(notify({ message: 'Fonts task complete!' }))
})

//compile scripts (gulp scripts)
gulp.task('scripts', function() {
  return gulp.src(config.src.scripts)
    .pipe(plumber())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe( jshint.reporter('default') )
    .pipe( gulp.dest( config.dist.scripts ) )
    .pipe( notify({ message: 'Scripts task complete!' }) );
});

//compile lib (gulp lib - its just a js libs)
gulp.task('libjs', function() {
	return gulp.src(config.src.libjs)
	.pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.min.js', '-min.js']
    }))
    .pipe(uglify())
	.pipe(gulp.dest(config.dist.libjs))
	.pipe(notify({ message: 'Libjs transfered!' }));
});

gulp.task('files', function() {
	return gulp.src(config.src.files)
	.pipe(gulp.dest(config.dist.files))
	.pipe(notify({ message: 'Files task complete!' }))
});

gulp.task('minjs', function () {
	return gulp.src(['dist/assets/js/main.js'])
	    .pipe(concat('main.js'))
	    .pipe(babel({
	        presets: ['env']
	    }))
	    .pipe(uglify())
	    .pipe(gulp.dest(config.dist.scripts));
});

gulp.task('concat', function () {
	return gulp.src(['src/lib/js/*.js', 'src/js/main.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('src/tmp'));
});

//watch changes
gulp.task('watch', function() {

	gulp.watch(config.src.styles, gulp.parallel('styles'));

	gulp.watch(config.src.templates, gulp.parallel('templates'));

	gulp.watch(config.src.images, gulp.parallel('images'));

	gulp.watch(config.src.fonts, gulp.parallel('fonts'));

	//gulp.watch(config.src.scripts, gulp.series('concat', 'babelify'));
	gulp.watch(config.src.scripts, gulp.parallel('scripts'));

	gulp.watch(config.src.libjs, gulp.parallel('libjs'));

	gulp.watch(config.src.libcss, gulp.parallel('libcss'));

	gulp.watch(config.src.files, gulp.parallel('files'));
});


// Обычная сборка
gulp.task('build', gulp.series('styles', 'templates', 'scripts', 'fonts', 'libcss', 'files', 'images', 'clean'));

// С минификацией
gulp.task('build-min', gulp.series(['templates', 'fonts', 'minjs', 'libcss', 'files', 'images', 'clean']));
