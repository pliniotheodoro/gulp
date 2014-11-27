
    var gulp = require('gulp'),
        less = require('gulp-less'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        cssmin = require('gulp-cssmin'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        browserSync = require('browser-sync');

    var filescss = "./assets/css/site/*.less",
        filesimages = "./assets/img/images/*";

    gulp.task('less', function () {
        gulp.src('./assets/css/site/**/*.{less, css}') 
        .pipe(less())
        .pipe(concat('concat.css'))
        .pipe(rename('style-min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./assets/css/site/'));
    });

    gulp.task ('images', function () {
        gulp.src('./assets/img/images/*') 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
         .pipe(gulp.dest('./assets/img/site/'));
        });

    gulp.task('browser-sync', function() {
        browserSync(["./assets/css/**/*.css", "./html/*.html"], {
        server: {
                baseDir: "./"
                }
            });
        });

    gulp.task('default', function() {
            
        gulp.run('less', 'images', 'browser-sync');

        gulp.watch(filescss, ['less']);

        gulp.watch(filesimages, ['images']);

    });


