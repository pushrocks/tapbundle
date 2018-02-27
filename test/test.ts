import { tap, expect } from '../ts/index'

let test1 = tap.test('my first test -> expect true to be true', async () => {
  return expect(true).to.be.true
})

let test2 = tap.test('my second test', async (tools) => {
  await tools.delayFor(1000)
})

let test3 = tap.test('my third test -> test2 should take longer than test1 and endure at least 1000ms', async () => {
  expect((await test1).hrtMeasurement.milliSeconds < (await test2).hrtMeasurement.milliSeconds).to.be.true
  expect((await test2).hrtMeasurement.milliSeconds > 1000).to.be.true
})

let test4 = tap.skip.test('my 4th test -> should fail', async (tools) => {
  tools.allowFailure()
  expect(false).to.be.true
})

let test5 = tap.test('my 5th test -> should pass in about 500ms', async (tools) => {
  tools.timeout(1000)
  await tools.delayFor(500)
})

let test6 = tap.skip.test('my 6th test -> should fail after 1000ms', async (tools) => {
  tools.allowFailure()
  tools.timeout(1000)
  await tools.delayFor(2000)
})

tap.start()
