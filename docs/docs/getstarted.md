# Get Started

## TypeScript
Use TypeScript for best in class instellisense.

A few words on TypeScript

## Included in this package

* tap compatible testing framework written in TypeScript
* a collection of test tools
* **code** testing framework with typings


## Write your first tests
``` javascript
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
