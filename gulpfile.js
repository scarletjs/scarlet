var gulp = require("gulp");
var bump = require("gulp-bump");
var gutil = require("gulp-util");
var mocha = require("gulp-mocha");
var jshint = require("gulp-jshint");
var rename = require('gulp-rename');
var browserify = require("gulp-browserify");

gulp.task("default", ["lint","test"]);

gulp.task("release",["lint","test","browserify","bump"]);

gulp.task("browserify", function() {
    gulp.src("./index.js", { read: false} )
        .pipe(browserify({
            standalone: "scarlet"
        }))
        .pipe(gulp.dest("./pub/scarlet.js/"))
});

gulp.task("bump", function(){
  gulp.src("./package.json")
  .pipe(bump())
  .pipe(gulp.dest("./"));
});

gulp.task("watch", function() {
    gulp.watch(["lib/**/*.js","tests/**/*.js"], ["catchErrorTest"]);
});

gulp.task("lint", function() {
  gulp.src(["./lib/**/*.js",
            "./tests/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("catchErrorTest",function(){
    gulp.src(["tests/**/*.js","!/tests/spec/builders/**/*.js"])
        .pipe(mocha({ reporter: "list" }))
        .on("error", gutil.log);
});

gulp.task("test",["unitTest","bddTest"]);

gulp.task("unitTest",function(){
    gulp.src(["tests/unit/**/*.js"])
        .pipe(mocha({ reporter: "spec" }));
});

gulp.task("bddTest",function(){
    gulp.src(["tests/spec/**/*.js","!/tests/spec/builders/**/*.js"])
        .pipe(mocha({ reporter: "spec" }));
})