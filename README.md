# Inactivity Pruner

[![release badge]][release]
[![david badge]][david]
[![donate badge]][donate]

[![travis badge]][travis]
[![appveyor badge]][appveyor]
[![cc maintainability badge]][cc maintainability]
[![david dev badge]][david dev]

Prune inactive [Kitsu.io] users you're following

![][demo]

## Usage

### Requirements

- [git] `>= 2.0.0`
- [node] `>= 8.0.0`
- [yarn] `>= 1.0.0` (optional)

### Install & Run

1. Download source code:

    ```bash
    git clone https://github.com/wopian/kitsu-inactivity-pruner.git
    cd kitsu-inactivity-pruner
    ```

1. Install dependencies:

    ```bash
    yarn
    # or
    npm install
    ```

1. Rename `config.template.js` to `config.js` and add your username/password

    ```javascript
    export const config = {
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

[Kitsu.io]:https://kitsu.io
[demo]:https://thumbs.gfycat.com/SentimentalComfortableGrackle-max-14mb.gif
[git]:https://git-scm.com
[node]:https://nodejs.org
[yarn]:https://yarnpkg.com

[CHANGELOG]:CHANGELOG.md
[MIT]:LICENSE.md

[release]:https://github.com/wopian/kitsu-inactivity-pruner/releases
[release badge]:https://img.shields.io/github/release/wopian/kitsu-inactivity-pruner.svg?style=flat-square

[david]:https://david-dm.org/wopian/kitsu-inactivity-pruner
[david badge]:https://img.shields.io/david/wopian/kitsu-inactivity-pruner.svg?style=flat-square
[david dev]:https://david-dm.org/wopian/kitsu-inactivity-pruner?type=dev
[david dev badge]:https://img.shields.io/david/dev/wopian/kitsu-inactivity-pruner.svg?style=flat-square

[travis]:https://travis-ci.org/wopian/kitsu-inactivity-pruner
[travis badge]:https://img.shields.io/travis/wopian/kitsu-inactivity-pruner/master.svg?style=flat-square&label=linux%20%26%20macOS

[appveyor]:https://ci.appveyor.com/project/wopian/kitsu-inactivity-pruner
[appveyor badge]:https://img.shields.io/appveyor/ci/wopian/kitsu-inactivity-pruner/master.svg?style=flat-square&label=windows

[cc maintainability]:https://codeclimate.com/github/wopian/kitsu-inactivity-pruner
[cc maintainability badge]:https://img.shields.io/codeclimate/maintainability/wopian/kitsu-inactivity-pruner.svg?style=flat-square

[donate]:https://www.patreon.com/wopian
[donate badge]:https://img.shields.io/badge/patreon-donate-ff69b4.svg?style=flat-square
