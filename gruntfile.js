module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'index.js', 'lib/**/*.js','test/**/*.js'],
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
        file: 'package.json', //default: package.json
        add: true, 
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
