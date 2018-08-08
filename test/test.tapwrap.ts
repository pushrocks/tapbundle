import { tap, expect } from '../ts/index';

let tapwrap = tap.wrap(async () => {
  tap.test('should do something', async () => {
    console.log('test1');
  });
  tap.start();
});

tapwrap.run();
