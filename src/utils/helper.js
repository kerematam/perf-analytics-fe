import sinon from 'sinon'

export const msg = {
  error: (err = 'Error') => {
    setTimeout(() => {
      // TODO: code proper alert component
      alert(err)
    }, 0)
  },
}

export const isTestEnv = () => process.env.NODE_ENV === 'test'

export const spy = {
  cleanerArr: [],
  resetHistory: function() {
    this.cleanerArr.forEach(fn => fn())
  },
  watch: function(fn) {
    const sandbox = sinon.createSandbox()
    sandbox.spy(fn)
    this.cleanerArr.push(sandbox.resetHistory)

    return fn
  },
}
