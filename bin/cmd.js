#!/usr/bin/env node
var deploy = require("../lib/gh-pages-deploy");
var globs = process.argv[2];
deploy(globs).on("error", function (error) {
    console.error(error, error.stack);
    process.exit(1);
});