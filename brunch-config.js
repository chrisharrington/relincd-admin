module.exports.config = {
    files: {
        javascripts: {
            joinTo: {
                "js/app.js": /^app/,
                "js/vendor.js": /^(?!app)/
            },
            order: {
                before: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/underscore/underscore.js",
                    "bower_components/backbone/backbone.js",
                    "bower_components/marionette/lib/backbone.marionette.js",
                    "bower_components/bootstrap/dist/js/bootstrap.js"
                ]
            }
        },

        stylesheets: {
            joinTo: "css/app.css"
        },

        templates: {
            joinTo: "js/app.js"
        }
    },
    plugins: {
        react: {
            autoIncludeCommentBlock: true,
            harmony: true
        },
        reactTags: {
            verbose: true
        }
    },
    server: {
        path: "server.js",
        port: 3333,
        run: true
    }
};