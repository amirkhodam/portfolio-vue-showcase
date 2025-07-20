export default function auth({ next }) {
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) return next()
  else {
    return next({ name: 'forbidden' })
  }
}
