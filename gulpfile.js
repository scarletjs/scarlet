var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint','test']);

gulp.task('watch', function() {
    gulp.watch(['lib/**/*.js','tests/**/*.js'], ["catchErrorTest"]);
});

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js',
            './tests/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('catchErrorTest',function(){
    gulp.src(['tests/**/*.js','!/tests/spec/builders/**/*.js'])
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('test',["unitTest","bddTest"]);

gulp.task('unitTest',function(){
    gulp.src(['tests/unit/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('bddTest',function(){
    gulp.src(['tests/spec/**/*.js','!/tests/spec/builders/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
})