module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/*.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controller: {
                src: 'client/scripts/controllers/*.js',
                dest: 'server/public/assets/scripts/controllers.min.js'
            },
            factories: {
                src: 'client/scripts/factories/*.js',
                dest: "server/public/assets/scripts/data.min.js"
            },
            directives: {
                src: 'client/scripts/directives/*.js',
                dest: "server/public/assets/scripts/directives.min.js"
            }

        },
        copy: {
            angularMaterial: {
                expand: true,
                cwd: 'node_modules/angular-material',
                src: [
                    "angular-material.min.css",
                    "angular-material.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            angularAnimate: {
                expand: true,
                cwd: 'node_modules/angular-animate',
                src: [
                    "angular-animate.min.js",
                    "angular-animate.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularAria: {
                expand: true,
                cwd: 'node_modules/angular-aria',
                src: [
                    "angular-aria.min.js",
                    "angular-aria.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angular: {
                expand: true,
                cwd: 'node_modules/angular',
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules/angular-route',
                src: [
                    "angular-route.min.js",
                    "angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularMessages: {
                expand: true,
                cwd: 'node_modules/angular-messages',
                src: [
                    "angular-messages.min.js",
                    "angular-messages.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            fontAwesome: {
                expand: true,
                cwd: 'node_modules/',
                src: [
                    "font-awesome/*/*"
                ],
                "dest": "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "*",
                    "*/*"
                ],
                "dest": "server/public/assets/views/"
            },
            style: {
                expand: true,
                cwd: 'client/styles/',
                src: [
                    "style.css"
                ],
                "dest": "server/public/assets/styles/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};