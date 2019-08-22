import { tap, expect } from '../ts/index';
import * as randomstring from 'randomstring';

const test1 = tap.test('my first test -> expect true to be true', async tools => {
  await tools.checkIterationLeak(async () => {
    const domain = randomstring.generate(1000);
  });
});

const outsideArray = [];

const test2 = tap.test('should throw', async tools => {
  const err = await tools.returnError(async () => {
    await tools.checkIterationLeak(async () => {
      outsideArray.push(randomstring.generate(1000));
    });
  });
  expect(err).to.be.undefined;
});

tap.start();
