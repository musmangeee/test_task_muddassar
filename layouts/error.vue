<template>
  <v-app dark>
    <v-row justify="center" fill-height>
      <v-col class="text-center" align-self="center" cols="6">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>{{ error.statusCode }} {{ otherError }}</h1>
        <br />
        <v-btn text @click="$router.back()"> Back </v-btn> |
        <v-btn text to="/"> Home </v-btn>
        <template v-if="$auth.loggedIn">
          | <v-btn text :to="user_home_path"> Dashboard </v-btn> |
          <v-btn text @click="$auth.logout()"> Logout </v-btn>
        </template>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
