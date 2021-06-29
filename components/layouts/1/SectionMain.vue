<template>
	<section
		class="main-1"
		:class="colSize('desktop', 'desktop', 'mobile', 'mobile')"
	>
		<v-card flat title class="card-cont fill-height">
			<div class="image-cont">
				<div
					:style="
						restaurant.landingPhoto
							? `background-image: url(${restaurant.landingPhoto})`
							: `background-image: url(${require('@/static/src/images/bg/main-1.jpg')})`
					"
					class="image-1"
				></div>
			</div>

			<div class="container fill-height justify-center align-center">
				<v-card color="transparent all-text-center mt-12" max-width="720px">
					<div class="pa-2">
						<div class="mb-5 title _accent--text">{{ restaurant.title }}</div>
						<h1 class="display-2 mb-6">{{ restaurant.name }}</h1>

						<v-divider class="divider-1 mb-6"></v-divider>

						<h4 class="mb-4">
							{{ restaurant.description }}
						</h4>

						<div class="d-flex flex-row justify-center mt-10">
							<div class="px-2">
								<v-btn
									:to="links.find((lnk) => lnk.name == 'booking').to"
									nuxt
									block
									large
									text
									class="special-nav"
									>Booking</v-btn
								>
							</div>
							<div class="px-2">
								<v-btn
									:to="links.find((lnk) => lnk.name == 'order-online').to"
									nuxt
									block
									large
									color="orange"
									>Order Online</v-btn
								>
							</div>
						</div>
					</div>
				</v-card>
			</div>
		</v-card>
	</section>
</template>

<script>
	import { mapState } from "vuex"

	export default {
		components: {},
		mounted() {},
		async fetch() {},
		data: () => ({}),
		computed: {
			...mapState({
				restaurant: (state) => {
					return state.restaurants.restaurant
				},
				links: (state) => {
					return state.restaurants.restaurant.navLinks
				},
			}),
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	section.main-1.desktop {
		height: 100%;
		max-height: 100vh;
		min-height: 450px;
		.card-cont {
			background-color: black;
			* {
				color: white;
			}
		}
	}

	section.main-1.mobile {
		height: auto;
		min-height: 450px;
		.card-cont {
			background-color: black;
			* {
				color: white;
			}
		}
	}
</style>
