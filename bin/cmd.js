#!/usr/bin/env node
var deploy = require("../lib/gh-pages-deploy");
var globs = process.argv[2];
deploy(globs).catch(function (error) {
    console.error(error, error.stack);
    process.exit(1);
});