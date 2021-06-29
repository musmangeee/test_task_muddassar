import Vue from "vue"
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    data() {
      return {
        defaultCurrencySign: "£",
        appName: "Restaurants Management",
        company: {
          name: "DigiDoe",
          url: "https://digidoe.com/",
          phone: "+44 (20) 3865 5467",
          email: "info@digidoe.com",
          logos: {
            black: "https://digidoe.com/images/digidoe-logo.svg",
            white: "https://digidoe.com/images/logo-white.svg",
          },
          socials: [
            {
              icon: "mdi-facebook",
              name: "facebook",
              link: "http://www.facebook.com/DigiDoe.Money",
            },
            {
              icon: "mdi-twitter",
              name: "twitter",
              link: "https://twitter.com/DigiDoe",
            },
            {
              icon: "mdi-instagram",
              name: "instagram",
              link: "https://www.instagram.com/digidoe.ltd/",
            },
          ],
        },
      }
    },
    computed: {
      user_home_url() {
        if (this.$store.$auth.loggedIn)
          return window.location.origin + this.user_home_path
        return "/"
      },
      user_home_path() {
        if (this.$store.$auth.loggedIn)
          return `/dashboard/${encodeURI(
            this.$store.$auth.user.role.value.toString().toLowerCase()
          )}/home`
        return "/"
      },
      user_profile_path() {
        if (this.$store.$auth.loggedIn)
          return `/dashboard/${encodeURI(
            this.$store.$auth.user.role.value.toString().toLowerCase()
          )}/profile`
        return "/"
      },
      user_contacts_path() {
        if (this.$store.$auth.loggedIn)
          return `/dashboard/${encodeURI(
            this.$store.$auth.user.role.value.toString().toLowerCase()
          )}/contacts`
        return "/"
      },
    },
    methods: {
      colSize(lgAndUp = 3, mdAndUp = 4, smAndUp = 6, smDown = 12) {
        let breakpoint = this.$vuetify.breakpoint
        return breakpoint.lgAndUp
          ? lgAndUp
          : breakpoint.mdAndUp
          ? mdAndUp
          : breakpoint.smAndUp
          ? smAndUp
          : smDown
      },
      formatePrice(price = 0) {
        return Number.parseFloat(price).toFixed(2)
      },
    },
  })
}
