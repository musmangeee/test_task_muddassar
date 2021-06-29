export default function ({
  store
}) {
  if (store.$auth.loggedIn) {
    store.$router.replace('/');
  }
}
