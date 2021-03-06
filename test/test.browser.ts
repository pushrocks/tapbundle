import { tap, expect, webhelpers } from '../ts/index';

tap.preTask('custompretask', async () => {
  console.log('this is a pretask');
});

tap.test('should have access to webhelpers', async () => {
  const myElement = await webhelpers.fixture(webhelpers.html`<div></div>`);
  expect(myElement).to.be.instanceOf(HTMLElement);
  console.log(myElement);
});

const test1 = tap.test('my first test -> expect true to be true', async () => {
  return expect(true).to.be.true;
});

const test2 = tap.test('my second test', async (tools) => {
  await tools.delayFor(50);
});

const test3 = tap.test(
  'my third test -> test2 should take longer than test1 and endure at least 1000ms',
  async () => {
    expect((await test1).hrtMeasurement.milliSeconds < (await test2).hrtMeasurement.milliSeconds).to
      .be.true;
    expect((await test2).hrtMeasurement.milliSeconds > 10).to.be.true;
  }
);

const test4 = tap.skip.test('my 4th test -> should fail', async (tools) => {
  tools.allowFailure();
  expect(false).to.be.true;
});

const test5 = tap.test('my 5th test -> should pass in about 500ms', async (tools) => {
  tools.timeout(1000);
  await tools.delayFor(500);
});

const test6 = tap.skip.test('my 6th test -> should fail after 1000ms', async (tools) => {
  tools.allowFailure();
  tools.timeout(1000);
  await tools.delayFor(100);
});

tap.start();
