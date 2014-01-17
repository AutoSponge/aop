module.exports = function ( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),
        jshint: {
            all: {
                options: {
                    reporter: require( "jshint-stylish" )
                },
                files: {
                    src: ["lib/**/*.js"]
                }
            }
        },
        nodeunit: {
            all: ["test/*_test.js"]
        },
        docco: {
            debug: {
                src: ["lib/**/*.js"],
                options: {
                    output: "doc"
                }
            }
        }
    } );

    require( "load-grunt-tasks" )( grunt );

    grunt.registerTask( "default", ["jshint", "nodeunit", "docco"] );

};