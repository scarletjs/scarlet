

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: ["gruntfile.js", "index.js", "lib/**/*.js","test/**/*.js"],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },
    release: {
      options: {
        bump: true, //default: true
        file: "package.json", //default: package.json
        add: true, 
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint"]
    },
    browserify: {
      basic: {
        src: ['./index.js'],
        dest: './dist/scarlet.js'
      },
      options: {
        standalone:'scarlet'
      }
    },
    mox: {
      documentationByCategoryTag: {
        sourceFiles : ['./lib/'],
        options: {
          name : "Scarlet",
          template:"category",
          outputFile : "doc/README.md",
          moxFile :"doc/mox.json"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mox");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("doc", ["mox"]);
  grunt.registerTask("default", ["jshint","mox"]);
  grunt.registerTask("deploy", ["mox","browserify","release", "scarlet-bump"]);

  grunt.registerTask("scarlet-bump", "A task for bumping release announcements to twitter", function(){

    var done = this.async();
    
    var fs = require("fs");
    require("string-format");
    var http = require("http");
    var prompt = require("prompt");

    var project = "scarlet";
    var package = fs.readFileSync("./package.json");
    var version = JSON.parse(package).version;

    console.log("Please enter the scarlet twitter password to bump the release annnouncement:");

    prompt.start();

    prompt.get(["password"], function(err, result){
      var req = http.get("http://www.scarletjs.com/release/bump?project={0}&version={1}&auth={2}".format(project, version, result.password), function(res) {
        console.log("Scarletjs.com: " + res.statusCode);
        console.log("Scarletjs.com: " + JSON.stringify(res.headers));
        done();
      });

    });

  });
};
