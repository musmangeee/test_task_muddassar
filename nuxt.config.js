// import colors from 'vuetify/es5/util/colors'
export default {
  ssr: process.env.ssr,

  target: "server",

  generate: {
    subFolders: false,
    fallback: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // serverMiddleware: ["~/server-middleware/get-restaurant-details"],

  router: {
    mode: process.env.routerMode,
    // middleware: ['auth'],
    base: process.env.routerBase,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    friendlyErrors: true,
    followSymlinks: true,
    vendor: ["vuetify"],
    publicPath: process.env.buildPublicPath, //https://nbthub.com/awais/restaurants-management/'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "orange",
    failedColor: "red",
    rtl: false,
    height: "3px",
    // continuous: false,
  },

  loadingIndicator: {
    name: "circle",
    color: "black",
    background: "white",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Restaurants Management",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/mixins/index.js",
    "~/plugins/vuetify.js",
    {
      src: "~/plugins/uuid.js",
      mode: "client",
    },
    "~/plugins/api.js",
    "~/plugins/navigations.js",
    "~/plugins/vidle.js",
    "~/plugins/qr.js",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // With options
    // ['@nuxtjs/vuetify', {
    //   /* module options */
    // }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // '@nuxtjs/proxy',

    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    "@nuxtjs/auth-next",

    "@nuxtjs/toast",

    [
      "@nuxtjs/dotenv",
      {
        systemvars: true,
        filename: ".env",
      },
    ],

    // ['nuxt-gmaps', {
    //   key: '<API-Key>',
    //   //you can use libraries: ['places']
    // }]
  ],

  // render: {
  //   bundleRenderer: {
  //     runInNewContext: true,
  //   },
  // },

  //Global Env Configurations
  publicRuntimeConfig: {
    DevEnv: process.env.DevEnv,
    ApiBaseUrl: process.env.ApiBaseUrl,
  },
  privateRuntimeConfig: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  //Global Vue configs
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    debug: process.env.DevEnv == "dev" ? true : false,
    baseURL: process.env.ApiBaseUrl,
    proxy: false,
    credentials: false,
    retry: {
      retries: 2,
    },
    headers: {
      common: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    },
  },

  proxy: {
    // '/api/': process.env.ApiBaseUrl
  },

  // https://www.digitalocean.com/community/tutorials/implementing-authentication-in-nuxtjs-app
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  // vuetify: {
  //   treeShake: false,
  //   // optionsPath: './vuetify.options.js',
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: false,
  //     themes: {
  //       dark: {
  //         primary: "#4ead11",
  //         accent: colors.grey.darken3,
  //         secondary: "#dabd3d",
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       },
  //       light: {
  //         primary: "#4ead11",
  //         accent: "#CFDB11",
  //         secondary: "#dabd3d",
  //         success: "#2ABD3C",
  //         info: "#219CF3",
  //         warning: "#FB8C00",
  //         error: "#D13434"
  //       }
  //     }
  //   },
  // },

  auth: {
    // strategies: {
    //   'laravelSanctum': {
    //     provider: 'laravel/sanctum',
    //     url: process.env.DevEnv == 'dev' ? 'http://localhost:8000' : 'https://peddle.aicexperts.com/peddle-backend/public',
    //   }
    // },
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   callback: '/login',
    //   home: ''
    // }
  },

  toast: {
    position: "bottom-center",
    className: ["site-toaster"],
    easing: "easeOutElastic",
    icon: "bell",
    iconPack: "mdi",
    duration: 2000,
    delay: 0,
    keepOnHover: true,
    animatable: true,
    reversed: false,
    register: [
      // Register custom toasts
      {
        name: "error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },
}
