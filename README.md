# Inactivity Pruner

[![Release Badge]][Release]
[![David Badge]][David]

[![Travis Badge]][Travis]
[![AppVeyor Badge]][Appveyor]
[![CC Coverage Badge]][CC Coverage]
[![CC Score Badge]][CC Score]
[![CC Issues Badge]][CC Issues]

Prune inactive [Kitsu.io][KITSU] users you're following

![](https://fat.gfycat.com/SentimentalComfortableGrackle.gif)

## Usage

### Requirements

- [git] `>2.0.0`
- [node] `>8.0.0`
- [yarn] `>1.0.0` (optional)

### Install & Run

1. Download source code:

    ```bash
    git clone https://github.com/wopian/kitsu-inactivity-pruner.git
    cd kitsu-inactivity-pruner
    ```

1. Install dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

1. Rename `config.template.js` to `config.js` and add your username/password

    ```javascript
    export const env = {
      USERNAME: 'josh',
      PASSWORD: 'hunter2',
      CLIENT_ID: '',
      CLIENT_SECRET: ''
    }
    ```

1. Run the script:

    ```bash
    yarn start
    # or
    npm start
    ```

## Releases

See [CHANGELOG]

## License

All code released under the [MIT] license

[Kitsu]:https://kitsu.io
[git]:https://git-scm.com
[node]:https://nodejs.org
[yarn]:https://yarnpkg.com

[CHANGELOG]:CHANGELOG.md
[MIT]:LICENSE.md

[Release]:https://github.com/wopian/kitsu-inactivity-pruner/releases
[Release Badge]:https://img.shields.io/github/release/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[Travis]:https://travis-ci.org/wopian/kitsu-inactivity-pruner
[Travis Badge]:https://img.shields.io/travis/wopian/kitsu-inactivity-pruner/master.svg?style=flat-square&label=linux%20%26%20macOS
[CC Coverage]:https://codeclimate.com/github/wopian/kitsu-inactivity-pruner/coverage
[CC Coverage Badge]:https://img.shields.io/codeclimate/coverage/github/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[CC Score]:https://codeclimate.com/github/wopian/kitsu-inactivity-pruner
[CC Score Badge]:https://img.shields.io/codeclimate/github/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[CC Issues]:https://codeclimate.com/github/wopian/kitsu-inactivity-pruner/issues
[CC Issues Badge]:https://img.shields.io/codeclimate/issues/github/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[David]:https://david-dm.org/wopian/kitsu-inactivity-pruner
[David Badge]:https://img.shields.io/david/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[AppVeyor]:https://ci.appveyor.com/project/wopian/kitsu-inactivity-pruner
[AppVeyor Badge]:https://img.shields.io/appveyor/ci/wopian/kitsu-inactivity-pruner/master.svg?style=flat-square&label=windows
