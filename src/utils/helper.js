export const msg = {
  error: (err = 'Error') => {
    setTimeout(() => {
      // TODO: code proper alert component
      alert(err)
    }, 0)
  },
}
