module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            serve: [
                'sass',
                'watch',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        },

        copy: {
            fontawesome: {
                files: [
                    {
                        expand: true,
                        src: [
                            "bower_components/fontawesome/css/font-awesome.min.css"
                        ],
                        dest: "css/",
                        flatten: true,
                        filter: "isFile"
                    },
                    {
                        expand: true,
                        src: [
                            "bower_components/fontawesome/fonts/fontawesome-webfont.*"
                        ],
                        dest: "fonts/",
                        flatten: true,
                        filter: "isFile"
                    }
                ]
            },
            fuselage: {
                files: [
                    {
                        expand: true,
                        src: [
                            "bower_components/fuselage/scss/fuselage.scss",
                            "bower_components/fuselage/scss/_settings.scss"
                        ],
                        dest: "_sass/",
                        flatten: true,
                        filter: "isFile"
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        src: [
                            "_site/css/main.min.css"
                        ],
                        dest: "css/",
                        flatten: true,
                        filter: "isFile"
                    },
                    {
                        expand: true,
                        src: [
                            "_site/css/examples/*.css"
                        ],
                        dest: "css/examples/",
                        flatten: true,
                        filter: "isFile"
                    }
                ]
            }
        },

        imagemin: {
            dynamic: {
                files : [{
                    expand: true,
                    cwd: 'img/',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: 'img/'
                }]
            }
        },

        sass: {
            options: {
                includePaths: ['bower_components/fuselage/scss/components'],
                outputStyle: 'compressed',
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        '_site/css/main.min.css': '_sass/main.scss'
                    },
                    {
                        expand: true,
                        cwd: '_sass',
                        src: ['examples/*.scss'],
                        dest: '_site/css',
                        ext: '.css'
                    }
                ]
            }
        },

        shell: {
            jekyllServe: {
                command: "jekyll serve --baseurl="
            },
            jekyllBuild: {
                command: "jekyll build --config _config-dev.yml"
            },
            jekyllPrepDeploy: {
                command: "jekyll build --config _config.yml"
            }
        },

        svgstore: {
            options: {
                prefix : "shape-",
                cleanup: false,
                symbol: {
                    width: "100%"
                },
                svg: {
                    style: "display: none;"
                }
            },
            default: {
                files: {
                    "img/svg/svg-defs.svg": ["img/svg/shapes/*.svg"]
                }
            }
        },

        watch: {
            images: {
                files: ['img/**/*.{gif,jpeg,jpg,png}'],
                tasks: ['newer:imagemin']
            },
            styles: {
                files: ['_sass/**/*.scss', '_sass/*.scss'],
                tasks: ['sass']
            },
            svg: {
              files: ['img/svg/*.svg'],
              tasks: ['newer:svgstore']
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask('serve', [
        'newer:copy:fontawesome',
        'newer:copy:fuselage',
        'newer:copy:styles',
        'newer:imagemin',
        'sass',
        'concurrent:serve'
    ]);

    grunt.registerTask('build', [
        'newer:copy:fontawesome',
        'newer:svgstore',
        'newer:imagemin',
        'newer:copy:fuselage',
        'newer:copy:styles',
        'shell:jekyllBuild',
        'sass',
    ]);

    grunt.registerTask('prep-deploy', [
        'newer:copy:fontawesome',
        'newer:svgstore',
        'newer:imagemin',
        'newer:copy:fuselage',
        'shell:jekyllPrepDeploy',
        'sass',
        'newer:copy:styles'
    ]);

    grunt.registerTask('default', ['build']);
}
