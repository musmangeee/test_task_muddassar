<template>
	<v-card width="100%">
		<v-card-title class="transparent-2 mb-3">
			Home
			<v-spacer />
			<v-btn @click="refresh()" icon> <v-icon>mdi-refresh</v-icon> </v-btn>
		</v-card-title>
		<v-card-text> </v-card-text>
	</v-card>
</template>

<script>
// import { mapState } from "vuex"

export default {
	components: {},
	mounted() {},
	async fetch() {
		return await this.getDashboard()
	},
	data: () => ({}),
	computed: {
		// ...mapState({
		// 	restaurantList: (state) => {
		// 		return state.restaurant.list
		// 	},
		// }),
	},
	methods: {
		refresh() {
			this.$nuxt.refresh()
		},
		async getDashboard() {
			// return await this.$store.dispatch("restaurant/get")
		},
	},
}
</script>
