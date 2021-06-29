import admin from "~/navigations/admin";

export default (context, inject) => {
  // Initialize API factories
  const navigations = {
    admin: admin(context),
  };

  // Inject $api
  inject("navigations", navigations);
};
