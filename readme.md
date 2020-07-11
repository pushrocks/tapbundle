# @pushrocks/tapbundle
tap bundled for tapbuffer

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/tapbundle)
* [gitlab.com (source)](https://gitlab.com/pushrocks/tapbundle)
* [github.com (source mirror)](https://github.com/pushrocks/tapbundle)
* [docs (typedoc)](https://pushrocks.gitlab.io/tapbundle/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/pushrocks/tapbundle/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/pushrocks/tapbundle/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@pushrocks/tapbundle)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/pushrocks/tapbundle)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@pushrocks/tapbundle)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@pushrocks/tapbundle)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@pushrocks/tapbundle)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

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

tap.test('my awesome description', async (tools) => {
  // tools are optional parameter
  tools.timeout(2000); // test will fail if it takes longer than 2000 millisenconds
});

let myTest2 = tap.test('my awesome test 2', async (tools) => {
  myAwsomeModuleToTest.doSomethingAsync(); // we don't wait here
  await tools.delayFor(3000); // yay! :) promise based timeouts :)
  console.log('This gets logged 3000 ms into the test');
});

tap.test('my awesome test 3', async (tools) => {
  expect(true).to.be.true; // will not throw
  await expect(tools.delayFor(2000)).to.eventually.be.fulfilled; // yay expect promises :)
  expect((await myTest2.promise).hrtMeasurement.milliSeconds > 1000).to.be.true; // access other tests metadata :)
});

let myTest4 = tap.testParallel('my awesome test 4', async (tools) => {
  await tools.delayFor(4000);
  console.log('logs to console after 4 seconds into this test');
});

tap.test('my awesome test 5', async () => {
  expect(myTest4.status).to.equal('pending'); // since this test will likely finish before myTest4.
});

tap.start(); // start the test, will automtically plan tests for you (so the tap parser knows when tests exit bofore they are finished)
```

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
