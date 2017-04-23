import { tap, expect } from '../dist/index'

tap.test('my first test', async () => {
  return expect(true).to.be.true
})

tap.start()
