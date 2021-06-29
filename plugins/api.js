import auth from "~/api/auth"
import restaurants from "~/api/restaurants"
import employees from "~/api/employees"
import menus from "~/api/menus"
import currencies from "~/api/currencies"
import tables from "~/api/tables";


export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: auth(context.$axios),
    restaurants: restaurants(context.$axios),
    employees: employees(context.$axios),
    menus: menus(context.$axios),
    tables: tables(context.$axios),
    currencies: currencies(context.$axios),
  };

  // Inject $api
  inject("api", factories)
}
