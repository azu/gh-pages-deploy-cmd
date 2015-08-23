var path = require("path");
var ghParse = require('parse-github-url');
var gulp = require('gulp');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var plumber = require('gulp-plumber');
var excludeGitignore = require('gulp-exclude-gitignore');
var existSync = require("exists-sync");
var ObjectAssign = require("object-assign");
var gitConfig = require("./git-config");
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
function ignore(gitignorePath) {
    var ignoreFilePath = path.join(process.cwd(), '.gitignore');
    if (existSync(ignoreFilePath)) {
        return excludeGitignore(gitignorePath)
    } else {
        return gutil.noop();
    }
}

function deploy(globs, options) {
    var ghPagesOptions = ObjectAssign({}, defaultOptions, options);
    var globPattern = globs || (process.cwd() + '/**/*');
    return gitConfig.resolveGitName().then(function(){
        return gitConfig.resolveGitEmail()
    }).then(function () {
        return new Promise(function (resolve, reject) {
            gulp.src(globPattern)
                .on("error", reject)
                .on("end", resolve)
                .pipe(plumber())
                .pipe(ignore())
                .pipe(ghPages(ghPagesOptions));
        });
    });
}

module.exports = deploy;