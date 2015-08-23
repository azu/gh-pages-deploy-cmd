var path = require("path");
var ghParse = require('parse-github-url');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var ObjectAssign = require("object-assign");
if (process.env.GIT_ORIGIN) {
    options.remoteUrl = process.env.GIT_ORIGIN;
}
var defaultOptions = {
    remoteUrl: remoteURLWithToken(process.env.GH_TOKEN)
};

function remoteURLWithToken(token) {
    if (token == null) {
        return "https://github.com/" + getSlug() + ".git"
    }
    return "https://" + token + "@github.com/" + getSlug() + ".git"
}
function getSlug() {
    // Travis CI
    // http://docs.travis-ci.com/user/environment-variables/
    if (process.env.TRAVIS_REPO_SLUG) {
        return process.env.TRAVIS_REPO_SLUG;
    }
    try {
        var pkg = require(path.join(process.cwd(), "package.json"));
        var gh = ghParse(pkg.repository.url);
        if (gh.repopath) {
            return gh.repopath;
        }
    } catch (error) {
        console.error(error);
    }
    throw new Error("Not found git repository.url");
}
function deploy(options) {
    var ghPagesOptions = ObjectAssign({}, defaultOptions, options);
    var globPattern = options.globs || ['./**/*'];
    return gulp.src(globPattern)
        .pipe(ghPages(ghPagesOptions));
}

