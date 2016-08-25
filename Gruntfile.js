module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {seperator: ';'},
      client: { src: ['public/client/**/*.js'],
                dest: 'public/dist/client.concat.js'},
      libs: { src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'], 
             dest: 'public/dist/lib.concat.js'}
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      client: { src: ['public/client/**/*.js'],
                dest: 'public/dist/client.min.js'},
      libs: { src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'], 
             dest: 'public/dist/lib.min.js'}
    },

    eslint: {
      target: [
        'server.js', 'server-config.js', 'app/**/*.js'
      ]
    },

    cssmin: {
      minify: {
        src: 'public/*.css',
        dest: 'public/dist/styles.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      console.log('hi');
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
