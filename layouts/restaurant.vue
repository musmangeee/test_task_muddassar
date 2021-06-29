<template>
	<v-app class="layout-restaurant">
		<v-app-bar absolute flat class="transparent" style="z-index: 2">
			<div class="container py-0 fill-height overflow-hidden">
				<!-- <v-icon> mdi-image </v-icon> -->
				<nuxt-link :to="links.find((lnk) => (lnk.name = 'home')).to">
					<v-img
						v-if="restaurant.logo"
						class="pa-0 ma-n1"
						contain
						height="64px"
						:src="restaurant.logo"
					></v-img>
					<h1 v-else class="text-decoration-none">
						{{ restaurant.name.toUpperCase() }}
					</h1>
				</nuxt-link>

				<v-spacer></v-spacer>

				<template v-if="$vuetify.breakpoint.mdAndUp">
					<v-btn
						:class="
							$route.fullPath == $router.resolve(link.to).href
								? `${link.class} active-nav transparent-2`
								: `${link.class}`
						"
						v-for="link in links"
						:to="link.to"
						:key="link.name"
						class="mx-1 nav-btn"
						nuxt
						exact
						text
					>
						{{ link.title }}
					</v-btn>
				</template>

				<v-app-bar-nav-icon
					v-if="!$vuetify.breakpoint.mdAndUp"
					@click="drawer = !drawer"
				></v-app-bar-nav-icon>
			</div>
		</v-app-bar>

		<v-navigation-drawer
			v-if="!$vuetify.breakpoint.mdAndUp"
			v-model="drawer"
			app
			right
		>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title">
						{{ restaurant.name }}
					</v-list-item-title>
					<v-list-item-subtitle class="accent--text">
						{{ restaurant.tagLine }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense nav>
				<v-list-item
					:to="link.to"
					v-for="link in links"
					:key="link.name"
					exact
					link
				>
					<!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

					<v-list-item-content>
						<v-list-item-title>
							{{ link.title }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<Nuxt keep-alive />
	</v-app>
</template>
<script>
	import { mapState } from "vuex"
	export default {
		middleware: [],
		computed: {
			...mapState({
				links: (state) => {
					return state.restaurants.restaurant.navLinks
				},
			}),
			restaurant: {
				set(val) {
					this.$store.state.restaurants.restaurant = val
				},
				get() {
					return this.$store.state.restaurants.restaurant
				},
			},
			drawer: {
				set(val) {
					this.$store.commit("restaurants/setRestaurantNavDrawer", val)
				},
				get() {
					return this.$store.state.restaurants.restaurant.navDrawer
				},
			},
		},
		data: () => ({}),
		methods: {},
	}
</script>
<style lang="scss">
	.layout-restaurant {
		header {
			&,
			* {
				color: #fff !important;
			}
		}

		section {
			width: 100%;
			background-color: transparent;
			.card-cont {
				height: 100%;
				width: 100%;
				z-index: 1;
				overflow: hidden;
				border-radius: 0 !important;
				* {
					z-index: 1;
					// border-radius: 0 !important;
				}
			}
			&,
			* {
				text-decoration: none;
			}
		}

		.card-cont {
			.image-cont {
				position: absolute;
				width: 100% !important;
				height: 100% !important;
				min-height: 100%;
				z-index: -1;
				* {
					position: absolute;
					width: 100%;
					height: 100%;
					filter: blur(3px) grayscale(50%);
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}
			.image-cont {
				.image-1 {
				}
			}
		}
	}
</style>
