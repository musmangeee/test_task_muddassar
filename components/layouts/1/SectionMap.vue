<template>
	<section v-if="restaurant.mapUrl" class="main-4">
		<v-card flat title class="card-cont fill-height pa-0 overflow-hidden">
			<iframe
				:src="restaurant.mapUrl"
				width="100%"
				height="450"
				style="border: 0"
				class="pa-0"
				allowfullscreen="false"
				loading="lazy"
			></iframe>
		</v-card>
	</section>
	<section v-else class="main-4">
		<v-card flat title class="card-cont fill-height pa-12 overflow-hidden">
			<v-card-title class="transparent-1">
				<v-spacer></v-spacer>
				Google Map Url Not available
				<v-spacer></v-spacer>
			</v-card-title>
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
	section.main-4 {
		height: auto;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: black;
			}
		}
	}
</style>
