# Inactivity Pruner

[![release badge]][release]
[![travis badge]][travis]
[![david badge]][david]
[![david dev badge]][david dev]
[![donate badge]][donate]

Prune inactive [Kitsu.io] users you're following

![][demo]

## Usage

### Requirements

- [git] `>= 2.0.0`
- [node] `>= 10.0.0`
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

1. Rename `config.template.mjs` to `config.mjs` and add your username/password

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
[release badge]:https://flat.badgen.net/github/release/wopian/kitsu-inactivity-pruner

[david]:https://david-dm.org/wopian/kitsu-inactivity-pruner
[david badge]:https://flat.badgen.net/david/dep/wopian/kitsu-inactivity-pruner

[david dev]:https://david-dm.org/wopian/kitsu-inactivity-pruner?type=dev
[david dev badge]:https://flat.badgen.net/david/dev/wopian/kitsu-inactivity-pruner

[travis]:https://travis-ci.org/wopian/kitsu-inactivity-pruner
[travis badge]:https://flat.badgen.net/travis/wopian/kitsu-inactivity-pruner

[donate]:https://paypal.me/wopian
[donate badge]:https://flat.badgen.net/badge/support%20me%20on/paypal.me/pink
