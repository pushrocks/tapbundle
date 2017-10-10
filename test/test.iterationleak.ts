import { tap, expect } from '../ts/index'
import * as randomstring from 'randomstring'

let test1 = tap.test('my first test -> expect true to be true', async (tools) => {
  await tools.checkIterationLeak(async () => {
    let domain = randomstring.generate(1000)
  })
})

let outsideArray = []

let test2 = tap.test('should throw', async (tools) => {
  let err = await tools.returnError(async () => {
    await tools.checkIterationLeak(async () => {
      outsideArray.push(randomstring.generate(1000))
    })
  })
  expect(err).to.be.an.error()
})

tap.start()
