import { tap, expect } from '../ts/index';

const test1 = tap.test('my first test -> expect true to be true', async () => {
  return expect(true).to.be.true;
});

const test2 = tap.test('my second test', async tools => {
  await tools.delayFor(1000);
});

const test3 = tap.test(
  'my third test -> test2 should take longer than test1 and endure at least 1000ms',
  async () => {
    expect((await test1).hrtMeasurement.milliSeconds < (await test2).hrtMeasurement.milliSeconds).to
      .be.true;
    expect((await test2).hrtMeasurement.milliSeconds > 1000).to.be.true;
  }
);

const test4 = tap.skip.test('my 4th test -> should fail', async tools => {
  tools.allowFailure();
  expect(false).to.be.true;
});

const test5 = tap.test('my 5th test -> should pass in about 500ms', async tools => {
  tools.timeout(1000);
  await tools.delayFor(500);
});

const test6 = tap.skip.test('my 6th test -> should fail after 1000ms', async tools => {
  tools.allowFailure();
  tools.timeout(1000);
  await tools.delayFor(2000);
});

tap.start();
