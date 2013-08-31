module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: ["gruntfile.js", "index.js", "lib/**/*.js", "test/**/*.js"],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },
    spawn: {
      test: {
        command: "mocha",
        commandArgs: ["--reporter", "spec", "{0}"],
        directory: "./tests",
        pattern: "**/*.js"
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
        standalone: 'scarlet'
      }
    },
    mox: {
      documentationByCategoryTag: {
        sourceFiles: ['./lib/'],
        options: {
          name: "Scarlet",
          template: "category",
          outputFile: "doc/README.md"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mox");
  grunt.loadNpmTasks("grunt-spawn");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.loadTasks("./tasks");

  grunt.registerTask("doc", ["mox"]);
  grunt.registerTask("test", ["spawn:test"]);
  grunt.registerTask("default", ["jshint", "mox"]);
  grunt.registerTask("deploy", ["jshint","mox", "browserify", "release", "scarlet-bump"]);

};