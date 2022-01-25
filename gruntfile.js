// Gruntfile.js
module.exports = grunt => {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    package: grunt.file.readJSON('package.json'),
    // Create project's folders
    dirs: {
      dest: 'dest',
      css: 'styles/css',
      scss: 'styles/scss',
      scripts: 'scripts'
    },

    // MINIFY SCRIPT FILES
    uglify: {
      my_target: {
        files: {
          '<%= dirs.dest %>/main.min.js': ['<%= dirs.scripts %>/libs/*.js']
        }
      }
    },
    // MINIFY CSS-LIBRARIES FILES
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      my_target: {
        files: [
          {
            '<%= dirs.dest %>/stylelibs.min.css': ['<%= dirs.css %>/**/*.css']
          }
        ]
      }
    },
    // COMPILE SASS TO CSS AND MINIFY CSS
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          lineNumbers: true
        },
        files: {
          '<%= dirs.dest %>/style.min.css': '<%= dirs.scss %>/style.scss'
        }
      }
    },
    // WATCH CHANGE
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      sass: {
        files: '<%= dirs.sass %>/**/**/*.scss',
        tasks: ['sass']
      }
      // cssmin: {
      //     files: "<%= dirs.css %>/**/*.css",
      //     tasks: ['cssmin']
      // },
      // uglify: {
      //     files: ['<%= dirs.js %>/*.js'],
      //     tasks: ['uglify']
      // },
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= dirs.dest %>/style.min.css',
            '*.html',
            '<%= dirs.css %>/*.css',
            '<%= dirs.scripts %>/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './',
          online: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', ['browserSync', 'watch']);
};
