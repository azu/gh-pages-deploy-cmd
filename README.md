# gh-pages-deploy-cmd [![Build Status](https://travis-ci.org/azu/gh-pages-deploy-cmd.svg?branch=master)](https://travis-ci.org/azu/gh-pages-deploy-cmd)

This npm modules help to deploy to gh-pages.

## Installation

    npm install -D gh-pages-deploy-cmd

## Usage

1. add "gh-pages-deploy-cmd" to npm run-script.

```
  "scripts": {
    "deploy": "gh-pages-deploy-cmd 'dist/**/*'"
  },
```

2. add `GH_TOKEN` to .travis.yml

```sh
gem install travis
travis encrypt GH_TOKEN=<your github personal token> --add
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT