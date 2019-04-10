# @pushrocks/tapbundle
tap bundled for tapbuffer

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/tapbundle)
* [gitlab.com (source)](https://gitlab.com/pushrocks/tapbundle)
* [github.com (source mirror)](https://github.com/pushrocks/tapbundle)
* [docs (typedoc)](https://pushrocks.gitlab.io/tapbundle/)

## Status for master
[![build status](https://gitlab.com/pushrocks/tapbundle/badges/master/build.svg)](https://gitlab.com/pushrocks/tapbundle/commits/master)
[![coverage report](https://gitlab.com/pushrocks/tapbundle/badges/master/coverage.svg)](https://gitlab.com/pushrocks/tapbundle/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/tapbundle.svg)](https://www.npmjs.com/package/@pushrocks/tapbundle)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/tapbundle/badge.svg)](https://snyk.io/test/npm/@pushrocks/tapbundle)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

A few words on TypeScript

### Included in this package

- tap compatible testing framework written in TypeScript
- a collection of test tools
- **code** testing framework with typings

### Write your first tests

```javascript
import { tap, expect } from 'tapbundle'; // has typings in place

import * as myAwesomeModuleToTest from '../dist/index'; // '../dist/index' is the standard path for npmts modules

tap.test('my awesome description', async tools => {
  // tools are optional parameter
  tools.timeout(2000); // test will fail if it takes longer than 2000 millisenconds
});

let myTest2 = tap.test('my awesome test 2', async tools => {
  myAwsomeModuleToTest.doSomethingAsync(); // we don't wait here
  await tools.delayFor(3000); // yay! :) promise based timeouts :)
  console.log('This gets logged 3000 ms into the test');
});

tap.test('my awesome test 3', async tools => {
  expect(true).to.be.true; // will not throw
  await expect(tools.delayFor(2000)).to.eventually.be.fulfilled; // yay expect promises :)
  expect((await myTest2.promise).hrtMeasurement.milliSeconds > 1000).to.be.true; // access other tests metadata :)
});

let myTest4 = tap.testParallel('my awesome test 4', async tools => {
  await tools.delayFor(4000);
  console.log('logs to console after 4 seconds into this test');
});

tap.test('my awesome test 5', async () => {
  expect(myTest4.status).to.equal('pending'); // since this test will likely finish before myTest4.
});

tap.start(); // start the test, will automtically plan tests for you (so the tap parser knows when tests exit bofore they are finished)
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
