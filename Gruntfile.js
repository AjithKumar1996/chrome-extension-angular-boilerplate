/*jshint camelcase: false*/
// Generated on 2014-03-13 using generator-chrome-extension 0.2.5
'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        // FIXME Refactor connect task
        connect: {
            options: {
                hostname: 'localhost',

            },
            keepalive: {
                options: {
                    port: 9001,
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9000,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        sass: {
            dev: {
                files: {
                    '<%= yeoman.app %>/css/popup.css': '<%= yeoman.app %>/css/popup.scss'
                }
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/css/popup.css': '<%= yeoman.app %>/css/popup.scss'
                }
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: [
                        '**/*.js'
                    ],
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },
        // FIXME Refactor mocha_phantomjs task
        mocha_phantomjs: {
            all: {
                options: {
                    view: "1440x900",
                    run: true,
                    log: true,
                    logErrors: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        // FIXME Refactor mocha task
        mocha: {
            all: {
                options: {
                    run: true,
                    log: true,
                    logErrors: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        // FIXME Refactor useminPrepare task
        useminPrepare: {
            html: [
                '<%= yeoman.app %>/popup.html',
                '<%= yeoman.app %>/background.html'
            ],
            options: {
                dest: '<%= yeoman.dist %>'
            },
        },
        // FIXME Refactor uglify task
        uglify: {
          selector: {
                src: [
                    "<%= yeoman.app %>/bower_components/jquery/dist/jquery.min.js",
                    "<%= yeoman.app %>/scripts/contentscript.js"
                ],
                dest: '<%= yeoman.dist %>/contentscript.js'
          }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        // FIXME Refactor imagemin task
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        // FIXME Refactor cssmin task
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/popup.css': [
                        '<%= yeoman.app %>/css/popup.css'
                    ]
                }
            }
        },
        // Minify html files
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        // FIXME Refactor copy task
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'fonts/**/*',
                        'images/{,*/}*.{webp,gif}',
                        '_locales/{,*/}*.json'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                },{
                    expand: false,
                    src: [
                        '<%= yeoman.app %>/manifest-dist.json'
                    ],
                    dest: '<%= yeoman.dist %>/manifest.json',
                }]
            }
        },
        wiredep: {
            app: {
                src: [
                    '<%= yeoman.app %>/popup.html',
                    '<%= yeoman.app %>/background.html'
                ],
                ignorePath: /\.\.\//
            },
        },
        ngdocs: {
            all: ["<%= yeoman.app %>/scripts/**/*.js"]
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            docs: {
                files: "<%= yeoman.app %>/scripts/**/*.js",
                tasks: ["ngdocs"]
            },
            bower: {
                files: 'bower.json',
                task: ['wiredep']
            }
        },
        concurrent: {
            dist: [
                'sass',
                'ngdocs',
                // 'imagemin',
                // 'htmlmin',
                // 'cssmin'
            ]
        },
        // FIXME Refactor chrome manifest task
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: false,
                    background: {
                        target: 'background.html'
                    }
                },
                src: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>'
            }
        },
        // FIXME Refactor compress task
        compress: {
            dist: {
                options: {
                    archive: 'package/Extension.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });

    // TODO Implement testing
    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        // 'chromeManifest:dist',
        'sass:dev',
        'ngAnnotate',
        'wiredep',
        // 'useminPrepare',
        'concurrent:dist',
        // 'concat',
        // 'uglify',
        // 'copy:all',
        // 'usemin',
        // 'uglify:selector'
        // 'compress'
    ]);

    grunt.registerTask('default', [
        // 'jshint',
        // 'test',
        'build',
        'watch'
    ]);
};
