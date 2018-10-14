module.exports = function (grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Concatenation
    concat:{
      options: {
        separator: ';',
      },
      js: {
        src: ["public/assets/js/jquery.min.js",
              "public/assets/js/bootstrap/*.js",
              "public/assets/js/underscore.js",
              "public/assets/js/angular/angular.js",
              "public/assets/js/angular/angular-route.js",
              "public/assets/js/angular-material/angular-animate.min.js",
              "public/assets/js/angular-material/angular-aria.min.js",
              "public/assets/js/angular-material/angular-messages.min.js",
              "public/assets/js/angular-material/angular-material.min.js",
              "public/assets/js/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
              "public/assets/js/ngProgress.js",
              "public/assets/js/jsPdf/zlib.js",
              "public/assets/js/jsPdf/png.js",
              "public/assets/js/jsPdf/jsPdf.js",
              "public/assets/js/jsPdf/addimage.js",
              "public/assets/js/jsPdf/png_support.js",
              "public/assets/js/pubnub/pubnub.min.js",
              "public/assets/js/pubnub/webrtc.js",
              "public/assets/js/pubnub/rtc-controller.js",
              "public/components/app.modules.js",
              "public/components/main.js",
              "public/components/**/*.module.js",
              "public/components/**/*.controller.js",
              "public/components/**/*.service.js",
              "public/components/**/*.factory.js",
              "public/components/_conf/*.js"],
        dest: "public/assets/dist/app.js"
      }
  },

  /*
  ,
  njs: {
    src: ["bin/controllers/*.js",
          "bin/routes/*.js"],
    dest: "bin/dist/app.js"
  }
  */

  //css Minification
  cssmin: {
    options:{
      shorthandCompacting : false,
      roudingPrecision : -1
    },
    combine: {
      files: {
        "public/assets/dist/app.min.css": ["public/assets/angular-material/*.css",
                                           "public/assets/css/ngProgress.css",
                                           "public/assets/css/style.css"]
      }
    }
  },

  // Minification
  uglify: {
    options: {
      // the banner is inserted at the top of the output
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    js: {
      files: {
        'public/assets/dist/app.min.js' : ['<%= concat.js.dest %>']
      }
    }
  }
  /*
  ,
  unjs: {
    files: {
      'bin/dist/app.min.js' : ['<%= concat.njs.dest %>']
    }
  }
  */

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat:js','uglify:js','cssmin']);
};
