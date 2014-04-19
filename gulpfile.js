var gulp = require("gulp");
var git = require("gulp-git");
var mox = require("gulp-mox");
var bump = require("gulp-bump");
var gutil = require("gulp-util");
var mocha = require("gulp-mocha");
var jshint = require("gulp-jshint");
var rename = require("gulp-rename");
var browserify = require("gulp-browserify");

gulp.task("default", ["lint","test"]);

gulp.task("release",["lint","test","browserify","documentation"]);

gulp.task("watch", function() {
    gulp.watch(["lib/**/*.js","tests/**/*.js"], ["catchErrorTest"]);
});

gulp.task("lint", function() {
  gulp.src(["./lib/**/*.js",
            "./tests/**/*.js"])
            .pipe(jshint())
            .pipe(jshint.reporter("default"))
            .pipe(jshint.reporter('fail'));
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
});

gulp.task("documentation",function(){
    gulp.src(["lib/scarlet.js","lib/interceptors/**/*.js"])
                .pipe(mox())
                .pipe(gulp.dest("./docs/markdown/"));
});

gulp.task("browserify", function() {
    gulp.src("./index.js", { read: false} )
                .pipe(browserify({
                    standalone: "scarlet"
                }))
                .pipe(gulp.dest("./pub/scarlet.js/"))
});

gulp.task("bump", function(){
    return gulp.src("./package.json")
                .pipe(bump())
                .pipe(gulp.dest("./"));
});


gulp.task("tag",["bump"] ,function () {
    var version = require("./package.json").version;
    gutil.log('Tagging:'+version);

    gulp.src("./")
        .pipe(git.commit(version));

    git.tag(version, version);
    git.push("origin","master",{args:"--tags"});
});

