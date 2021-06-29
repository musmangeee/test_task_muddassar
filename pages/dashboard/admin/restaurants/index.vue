<template>
	<v-card width="100%">
		<v-card-title class="transparent-2 mb-3">
			Restaurants
			<v-spacer />
			<v-btn color="success" @click="showCreateUpdateRestaurantDialog()" icon>
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn @click="refresh()" icon>
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
		</v-card-title>
		<v-card-text>
			<v-row>
				<template v-for="(restaurant, index) in restaurantList">
					<v-col :key="index" :cols="colSize(6, 6, 12, 12)">
						<v-card class="text-capitalize" shaped elevation="1">
							<v-card-title>
								<h1>
									{{ restaurant.name }}
								</h1>
								<v-spacer></v-spacer>
								<div class="pa-2">
									<v-btn
										color="error"
										@click="deleteRestaurant(restaurant.id)"
										icon
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>
									<v-btn
										@click="showCreateUpdateRestaurantDialog(restaurant)"
										color="primary"
										icon
									>
										<v-icon>mdi-database-edit</v-icon>
									</v-btn>
								</div>
							</v-card-title>
							<v-card-text class="transparent-1">
								<v-row>
									<v-col v-if="restaurant.landingPhoto">
										<v-card flat outlined elevation="0">
											<div class="d-flex transparent-2 px-2">
												<div class="pt-2">Banner Image</div>
												<v-spacer></v-spacer>
												<v-btn
													@click="deleteBanner(restaurant)"
													color="error"
													icon
												>
													<v-icon>mdi-delete</v-icon>
												</v-btn>
											</div>
											<v-card-text class="center-all-content">
												<v-img
													contain
													max-width="200px"
													height="100px"
													:src="restaurant.landingPhoto"
												></v-img>
											</v-card-text>
										</v-card>
									</v-col>
									<v-col v-if="restaurant.logo">
										<v-card flat outlined elevation="0">
											<div class="d-flex transparent-2 px-2">
												<div class="pt-2">Logo Image</div>
												<v-spacer></v-spacer>
												<v-btn
													@click="deleteLogo(restaurant)"
													color="error"
													icon
												>
													<v-icon>mdi-delete</v-icon>
												</v-btn>
											</div>
											<v-card-text class="center-all-content">
												<v-img
													contain
													max-width="200px"
													height="100px"
													:src="restaurant.logo"
												></v-img>
											</v-card-text>
										</v-card>
									</v-col>
								</v-row>
							</v-card-text>
							<v-card-text>
								<p>
									<b>Description:</b>
									{{ restaurant.description || "N/A" }}
								</p>
							</v-card-text>
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-card-text>
		<createUpdateRestaurantDialog
			v-if="createUpdateRestaurantDialog"
			:dialogModel="createUpdateRestaurantDialog"
			:selectedModel="selectedRestaurant"
			@closeDialog="hideCreateUpdateRestaurantDialog()"
			@created="hideCreateUpdateRestaurantDialog()"
		/>
	</v-card>
</template>


<script>
	import { mapState } from "vuex"
	import { jsonToFormData } from "~/helpers/functions"
	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Restaurants",
			}
		},
		components: {
			createUpdateRestaurantDialog: () =>
				import("~/components/dialogs/createUpdateRestaurantDialog"),
		},
		async fetch() {
			const getRestaurants = await this.getRestaurants()
			const getCurrencies = await this.getCurrencies()
			return {
				getRestaurants,
				getCurrencies,
			}
		},
		data: () => ({
			createUpdateRestaurantDialog: false,
		}),
		computed: {
			...mapState({
				restaurantList: (state) => {
					return state.restaurants.list
				},
			}),
			selectedRestaurant: {
				get() {
					return this.$store.state.restaurants.selectedRestaurant
				},
				set(val) {
					this.$store.commit("restaurants/setSelectedRestaurant", val)
				},
			},
			// restaurantList() {
			// 	return { ...this.$store.state.restaurants.list }
			// },
		},
		methods: {
			refresh() {
				this.$nuxt.refresh()
			},
			async getRestaurants() {
				return await this.$store.dispatch("restaurants/getAll")
			},
			async getCurrencies() {
				return await this.$store.dispatch("currencies/getAll")
			},
			async deleteRestaurant(restaurantId) {
				if (!confirm("Are sure you want delete restaurant?")) return null
				return await this.$store.dispatch("restaurants/delete", { restaurantId })
			},
			async deleteLogo(formData) {
				if (!confirm("Are sure you want delete logo Image?")) return
				formData["deleteLogo"] = true

				let data = {
					restaurantId: formData.id,
					payload: jsonToFormData(formData),
				}

				return await this.$store
					.dispatch("restaurants/update", data)
					.then((res) => {
						if (res.status === 200) {
							this.$toast.success("Restaurant Logo deleted...")
							this.refresh()
						}
					})
			},
			async deleteBanner(formData) {
				if (!confirm("Are sure you want delete Banner Image?")) return
				formData["deleteLandingPhoto"] = true

				let data = {
					restaurantId: formData.id,
					payload: jsonToFormData(formData),
				}

				return await this.$store
					.dispatch("restaurants/update", data)
					.then((res) => {
						if (res.status === 200) {
							this.$toast.success("Restaurant Banner deleted...")
							this.refresh()
						}
					})
			},
			showCreateUpdateRestaurantDialog(selectedRestaurant = null) {
				this.createUpdateRestaurantDialog = true
				this.selectedRestaurant = selectedRestaurant
					? Object.assign({}, selectedRestaurant)
					: null
			},
			hideCreateUpdateRestaurantDialog() {
				this.createUpdateRestaurantDialog = false
				this.selectedRestaurant = null
			},
		},
	}
</script>
