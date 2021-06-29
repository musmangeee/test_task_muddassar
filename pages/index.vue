<template>
	<v-layout>
		<section class="main-1">
			<v-card flat title class="card-cont fill-height">
				<div class="container fill-height justify-center align-center">
					<v-card color="transparent all-text-center" max-width="720px">
						<div class="d-flex flex-row justify-center">
							<div v-for="link in links" :key="link.title" class="pa-2">
								<nuxt-link :to="link.to">
									<v-btn block large text class="special-nav">{{
										link.title
									}}</v-btn>
								</nuxt-link>
							</div>
						</div>
					</v-card>
				</div>
			</v-card>
		</section>
	</v-layout>
</template>

<script>
	export default {
		layout: "default",
		head() {
			return {
				title: `Home - ${this.appName}`,
			}
		},
		props: {},
		components: {},
		mounted() {},
		asyncData: () => ({
			links: [
				{
					to: "/restaurants_layout/1",
					title: "Restaurant Layout",
				},
				{
					to: "/login",
					title: "Auth",
				},
				{
					to: "/dashboard/admin/home",
					title: "Admin Dashboard",
				},
			],
		}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	.layout {
		flex-wrap: wrap;
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
	section.main-1 {
		height: 100%;
		max-height: 100vh;
		min-height: 450px;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: rgb(0, 0, 0);
			}
		}
	}
</style>
