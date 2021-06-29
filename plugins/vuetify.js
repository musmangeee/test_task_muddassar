/* eslint-disable no-debugger, no-console */

import Vue from "vue"
import colors from "vuetify/es5/util/colors"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import "@mdi/font/css/materialdesignicons.css"
import "~/assets/helpers.scss"

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: "mdi",
    values: {},
  },
  rtl: false,
  theme: {
    dark: false,
    default: "light",
    disable: false,
    themes: {
      light: {
        darker1: "#323232",
        primary: "#1976D2",
        secondary: "#424242",
        accent: colors.orange.base,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
      dark: {
        darker1: "#323232",
        primary: "#2196F3",
        secondary: "#424242",
        accent: colors.orange.base,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },
}

export default (ctx) => {
  const vuetify = new Vuetify(opts)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
