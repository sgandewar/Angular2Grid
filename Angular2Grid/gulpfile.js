/// <binding BeforeBuild='default' />

var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    path = require('path');

//** For local dev purpose**//

//gulp.task('watch', function () {
//    gulp.watch('./*.less', ['less']);
//});

gulp.task('Compileless', function () {
    return gulp.src('./assets/styles/StyleSheet.less')
    .pipe(less(({
        strictMath: 'on',
        paths: [path.join(__dirname, 'less', 'includes')]
    })).on('error', function (err) {
        console.log(err);
    }))
    //.pipe(cssmin().on('error', function (err) {
    //    console.log(err);
    //}))
    .pipe(rename('Site.min.css'))
    .pipe(gulp.dest('./wwwroot/'));
});


//** Defafult Task**//
gulp.task('default', ['Compileless']);