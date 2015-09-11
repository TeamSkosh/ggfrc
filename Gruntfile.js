module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "static/js/global.min.js": ["static/js/global.js"]
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
          "static/css/global.min.css": "static/scss/global.scss"
        }
      },
      foundation: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "static/css/foundation.min.custom.css": "static/scss/foundation-custom.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "static/css/global.min.css"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      global_styles: {
        files: ["static/scss/global.scss"],
        tasks: ["sass:global", "autoprefixer"]
      },
      foundation_styles: {
        files: ["static/scss/_foundation-settings.scss", "static/foundation-custom.scss"],
        tasks: ["sass:foundation"]
      },
      js: {
        files: ["static/js/*.js"],
        tasks: ["uglify"]
      },
      svg: {
        files: ["static/svg/*.svg"],
        tasks: ["newer:svgstore"]
      },
      img: {
        files: ["static/img/*.png"],
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
          "static/svg/svg-defs.svg": ["static/svg/shapes/*.svg"]
        }
      }
    },

    imagemin: {
      png: {
        files: [{
          expand: true,
          cwd: "static/img/",
          src: ["*.png"],
          dest: "static/img/",
          ext: ".min.png"
        }]
      }
    },

    copy: {
      foundation_js: {
        files: [{
          expand: true,
          src: ["bower_components/foundation/js/foundation.min.js", "bower_components/foundation/js/vendor/fastclick.js"],
          dest: "static/js/",
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
