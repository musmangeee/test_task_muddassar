// https://nuxtjs.org/docs/2.x/deployment/deployment-pm2/

module.exports = {
  apps: [{
    name: 'restaurants-management',
    exec_mode: 'cluster',
    instances: 'max', // Or a number of instances
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start'
  }]
}
