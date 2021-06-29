<template>
	<section class="main-5 mt-n2">
		<v-card color="darker1" flat title class="card-cont fill-height px-12 py-6">
			<div class="container full-height">
				<v-row no-gutters>
					<v-col :cols="colSize(3, 6, 6, 12)">
						<v-card elevation="0" width="100%" class="py-2" color="transparent">
							<h1 class="display-1">{{ restaurant.name.toUpperCase() }}</h1>
							<div class="py-2">
								<template v-for="(social, index) in restaurant.socials">
									<a
										:key="index"
										target="_blank"
										:href="social.link"
										rel="noopener noreferrer"
										class="mr-2"
										style="text-decoration: none"
									>
										<v-icon>
											{{ social.icon }}
										</v-icon>
									</a>
								</template>
							</div>
						</v-card>
					</v-col>
					<v-col :cols="colSize(5, 6, 6, 12)">
						<v-card class="py-2" elevation="0" width="100%" color="transparent">
							<p>
								<v-icon>mdi-phone-outline</v-icon> {{ restaurant.phoneNumber }}
							</p>
							<p>
								<v-icon>mdi-map-marker-outline</v-icon>
								{{ restaurant.address }}
							</p>
						</v-card>
					</v-col>
					<v-col :cols="colSize(2, 6, 6, 12)">
						<v-card class="py-2" elevation="0" width="100%" color="transparent">
							<a href="#">
								<p>About us</p>
							</a>
							<a href="#">
								<p>Menu</p>
							</a>
						</v-card>
					</v-col>
					<v-col :cols="colSize(2, 6, 6, 12)">
						<v-card class="py-2" elevation="0" width="100%" color="transparent">
							<a
								style="text-decoration: none"
								href="https://digidoe.com/privacy-policy.html"
							>
								<p>Privacy Policy</p>
							</a>
							<a href="#">
								<p>Download</p>
							</a>
						</v-card>
					</v-col>
				</v-row>
				<v-divider color="white"></v-divider>
				<v-row no-gutters>
					<v-col class="d-flex justify-center">
						<a :href="company.url">
							<div class="d-flex flex-row mt-4">
								<div class="pt-2 px-2">Powered by</div>
								<v-img contain width="130px" :src="company.logos.white"></v-img>
							</div>
						</a>
					</v-col>
				</v-row>
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
			}),
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	section.main-5 {
		height: auto;
		.card-cont {
			background-color: rgb(68, 68, 68);
			* {
				color: rgb(255, 255, 255);
			}
		}
	}
</style>
