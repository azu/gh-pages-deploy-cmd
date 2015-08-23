#!/usr/bin/env node
var deploy = require("../lib/gh-pages-deploy");
var globs = process.argv[2];
deploy({
    globs: globs
}).catch(function (erorr) {
    console.error(error, erorr.stack);
    process.exit(1);
});