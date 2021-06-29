const roleName = 'admin';
export default context => ([{
    to: `/`,
    name: `home`,
    title: `Home`,
    icon: `mdi-home`,
    inNav: false,
  },
  {
    to: `/dashboard/${roleName}/home`,
    name: `dashboard`,
    title: `Dashboard`,
    icon: `mdi-view-dashboard`,
    inNav: true,
  },
  {
    to: `/dashboard/${roleName}/restaurants`,
    name: `restaurants`,
    title: `Restaurants`,
    icon: `mdi-silverware-fork-knife`,
    inNav: true,
  },
  {
    to: `/dashboard/${roleName}/menus`,
    name: `Menus`,
    title: `Menus`,
    icon: `mdi-silverware`,
    inNav: true,
  },
  {
    to: `/dashboard/${roleName}/employees`,
    name: `employees`,
    title: `Employees`,
    icon: `mdi-account-multiple`,
    inNav: true,
  },
  {
    to: `/dashboard/${roleName}/tables`,
    name: `tables`,
    title: `Tables`,
    icon: `mdi-table`,
    inNav: true,
  },
]);
