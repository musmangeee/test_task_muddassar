export default function ({
  store,
  params
}) {
  if (store.$auth.loggedIn == false) {
    store.$router.replace('/login');
  }
  // console.log(window.location.href.split('/')[4], encodeURI(store.$auth.user.role.toString().toLowerCase()));
  if (window.location.href.split('/')[4] != encodeURI(store.$auth.user.role.value.toString().toLowerCase())) {
    window.location.replace(`/dashboard/${encodeURI(store.$auth.user.role.value.toString().toLowerCase())}/home`);
  }
}
