module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "ggfrc/static/js/global.min.js": ["assets/js/*.js"]
        }
      }
    },

    sass: {
      options: {
        includePaths: ["bower_components/foundation/scss"]
      },
      global: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "ggfrc/static/css/global.min.css": "assets/scss/global.scss"
        }
      },
      foundation: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "ggfrc/static/css/foundation.min.custom.css": "assets/scss/foundation-custom.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "ggfrc/static/css/global.min.css"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      global_styles: {
        files: ["assets/scss/global.scss"],
        tasks: ["sass:global", "autoprefixer"]
      },
      foundation_styles: {
        files: ["assets/scss/_foundation-settings.scss", "foundation-custom.scss"],
        tasks: ["sass:foundation"]
      },
      js: {
        files: ["assets/js/*.js"],
        tasks: ["uglify"]
      },
      svg: {
        files: ["assets/svg/*.svg"],
        tasks: ["newer:svgstore"]
      },
      img: {
        files: ["assets/img/*.png"],
        tasks: ["newer:imagemin:png", "newer:favicon"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        symbol: {
          preserveAspectRatio: "xMidyMid meet",
          width: "100%"
        },
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "ggfrc/static/svg/svg-defs.svg": ["assets/svg/*.svg"]
        }
      }
    },

    imagemin: {
      png: {
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: ['*.png'],
          dest: 'ggfrc/static/img/'
        }]
      }
    },

    copy: {
      favicon: {
        files: [{
            expand: true,
            src: ["assets/img/*.ico"],
            dest: "ggfrc/static/img/",
            flatten: true,
            filter: "isFile"
        }]
      },
      foundation_js: {
        files: [{
          expand: true,
          src: ["bower_components/foundation/js/foundation.min.js", "bower_components/foundation/js/vendor/fastclick.js"],
          dest: "ggfrc/static/js/",
          flatten: true,
          filter: "isFile"
        }]
      }
    },

    shell: {
      flaskServe: {
        command: 'ggfrc runserver'
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["shell:flaskServe"]);

  grunt.registerTask("styles", ["newer:sass:global", "newer:sass:foundation", "newer:autoprefixer"]);

  grunt.registerTask("js", ["newer:uglify", "newer:copy:foundation_js"]);

  grunt.registerTask("images", [
    "newer:svgstore",
    "newer:imagemin:png",
    "newer:copy:favicon"
  ]);

  grunt.registerTask("build", [
    "sass:global",
    "sass:foundation",
    "newer:autoprefixer",
    "uglify",
    "newer:svgstore",
    "newer:imagemin:png",
    "newer:copy:favicon",
    "newer:copy:foundation_js"
  ]);

  grunt.registerTask("default", [
    "sass:global",
    "sass:foundation",
    "autoprefixer",
    "uglify",
    "newer:svgstore",
    "newer:imagemin:png",
    "newer:copy:favicon",
    "watch"
  ]);

};
