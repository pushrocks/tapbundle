# tapbundle
tap bundled for tapbuffer

## Availabililty
[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/tapbundle)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/tapbundle)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/tapbundle)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/tapbundle/)

## Status for master
[![build status](https://GitLab.com/pushrocks/tapbundle/badges/master/build.svg)](https://GitLab.com/pushrocks/tapbundle/commits/master)
[![coverage report](https://GitLab.com/pushrocks/tapbundle/badges/master/coverage.svg)](https://GitLab.com/pushrocks/tapbundle/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/tapbundle.svg)](https://www.npmjs.com/package/tapbundle)
[![Dependency Status](https://david-dm.org/pushrocks/tapbundle.svg)](https://david-dm.org/pushrocks/tapbundle)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/tapbundle/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/tapbundle/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/tapbundle/badges/code.svg)](https://www.bithound.io/github/pushrocks/tapbundle)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Use TypeScript for best in class instellisense.

This package includes

* tap compatible testing framework written in TypeScript
* npm package chai (through smartchai)
* npm package chai-as-promised (through smartchai)
* npm package chai-string (through smartchai)
* npm package @types/chai (through smartchai)
* npm package @types/chai-as-promised (through smartchai)
* npm package @types/chai-string (through smartchai)

It also implements its own tap testing engine, that is fully typed.

In other words: This package is fully typed :)


### Get started with writing your first test file.
```javascript
import {tap, expect} from 'tapbundle' // has typings in place

import * as myAwesomeModuleToTest from '../dist/index' // '../dist/index' is the standard path for npmts modules

tap.test('my awesome description', async (tools) => { // tools are optional parameter
  tools.timeout(2000) // test will fail if it takes longer than 2000 millisenconds
})

let myTest2 = tap.test('my awesome test 2', async (tools) => {
  myAwsomeModuleToTest.doSomethingAsync() // we don't wait here
  await tools.delayFor(3000) // yay! :) promise based timeouts :)
  console.log('This gets logged 3000 ms into the test')
})

tap.test('my awesome test 3', async (tools) => {
  expect(true).to.be.true // will not throw
  await expect(tools.delayFor(2000)).to.eventually.be.fulfilled // yay expect promises :)
  expect((await myTest2.promise).hrtMeasurement.milliSeconds > 1000).to.be.true // access other tests metadata :)
})

let myTest4 = tap.testParallel('my awesome test 4', async (tools) => {
  await tools.delayFor(4000)
  console.log('logs to console after 4 seconds into this test')
})

tap.test('my awesome test 5', async () => {
  expect(myTest4.status).to.equal('pending') // since this test will likely finish before myTest4.
})

tap.start() // start the test, will automtically plan tests for you (so the tap parser knows when tests exit bofore they are finished)

```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
