module.exports = function(grunt) {

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
        pattern: "tests/**/*.js",
        ignore: [
          "dummies/index.js",
          "dummies/named-function.js",
          "dummies/object-literal.js",
          "dummies/prototype-function.js",
          "dummies/unnamed-function.js",
          "builders/index.js",
          "builders/assertion-builder.js",
          "builders/builder-logger.js",
          "builders/interceptor-builder.js",
          "builders/scarlet-builder.js"
        ]
      }
    },
    release: {
      options: {
        bump: true, 
        file: "package.json", 
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
      tasks: ["jshint", "spawn:test"]
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

  grunt.registerTask("doc", ["mox"]);
  grunt.registerTask("test", ["spawn:test"]);
  grunt.registerTask("bddtest", ["spawn:bddtest"]);
  grunt.registerTask("unittest", ["spawn:unittest"]);
  grunt.registerTask("default", ["jshint", "mox"]);
  grunt.registerTask("deploy", ["jshint", "mox", "browserify", "release"]);

};