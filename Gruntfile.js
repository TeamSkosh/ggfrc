module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "ggfrc/static/js/global.min.js": ["ggfrc/static/js/global.js"]
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
          "ggfrc/static/css/global.min.css": "ggfrc/static/scss/global.scss"
        }
      },
      foundation: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "ggfrc/static/css/foundation.min.custom.css": "ggfrc/static/scss/foundation-custom.scss"
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
        files: ["ggfrc/static/scss/global.scss"],
        tasks: ["sass:global", "autoprefixer"]
      },
      foundation_styles: {
        files: ["ggfrc/static/scss/_foundation-settings.scss", "ggfrc/static/foundation-custom.scss"],
        tasks: ["sass:foundation"]
      },
      js: {
        files: ["ggfrc/static/js/*.js"],
        tasks: ["uglify"]
      },
      svg: {
        files: ["ggfrc/static/svg/*.svg"],
        tasks: ["newer:svgstore"]
      },
      img: {
        files: ["ggfrc/static/img/*.png"],
        tasks: ["newer:imagemin:png"]
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
          "ggfrc/static/svg-defs.svg": ["ggfrc/static/svg/*.svg"]
        }
      }
    },

    imagemin: {
      png: {
        files: [{
          expand: true,
          cwd: "ggfrc/static/img/",
          src: ["*.png"],
          dest: "ggfrc/static/img/",
          ext: ".min.png"
        }]
      }
    },

    copy: {
      foundation_js: {
        files: [{
          expand: true,
          src: ["bower_components/foundation/js/foundation.min.js", "bower_components/foundation/js/vendor/fastclick.js"],
          dest: "ggfrc/static/js/",
          flatten: true,
          filter: "isFile"
        }]
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("styles", ["newer:sass:global", "newer:sass:foundation", "newer:autoprefixer"]);

  grunt.registerTask("js", ["newer:uglify", "newer:copy:foundation_js"]);

  grunt.registerTask("images", [
    "newer:svgstore",
    "newer:imagemin:png"
  ]);

  grunt.registerTask("build", [
    "sass:global",
    "sass:foundation",
    "newer:autoprefixer",
    "uglify",
    "newer:svgstore",
    "newer:imagemin:png",
    "newer:copy:foundation_js"
  ]);

  grunt.registerTask("default", [
    "sass:global",
    "sass:foundation",
    "autoprefixer",
    "uglify",
    "newer:svgstore",
    "newer:imagemin:png",
    "watch"
  ]);

};
