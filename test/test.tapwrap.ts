import { tap, expect } from '../dist/index'

let tapwrap = tap.wrap(async () => {
  tap.test('should do something', async () => {
    console.log('test1')
  })
  tap.start()
})

tapwrap.run()
