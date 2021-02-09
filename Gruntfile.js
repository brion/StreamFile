module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
          sourceMap: false,
          presets: ['es2015']
      },
      lib: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'lib/'
          }
        ]
      }
    },
    copy: {
      test: {
        files: [
          {
            expand: true,
            cwd: 'test/qunit/',
            src: ['qunit.html', 'qunit-tests.js', 'test-audio.opus'],
            dest: 'dist/'
          }
        ]
      }
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            standalone: 'StreamFile'
          },
          plugin: [
            ['browserify-derequire']
          ]
        },
        files: {
          'dist/stream-file.js': ['lib/stream-file.js']
        }
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/stream-file.min.js': ['dist/stream-file.js']
        }
      }
    },
    compress: {
      dist: {
        files: {
          'dist/stream-file.min.js.gz': ['dist/stream-file.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', [
    'babel',
    'copy',
    'browserify',
    'uglify',
    'compress'
  ]);

};
