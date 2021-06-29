<template>
	<v-card width="100%">
		<v-card-title class="transparent-2 mb-3">
			Order
			<v-spacer />
			<v-btn @click="refresh" icon>
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
		</v-card-title>

		<v-card class="px-5 py-4">
			<!-- <v-row class="d-flex align-center">
				<v-col cols="5"> How many tables do yo want to add? </v-col>
				<v-col cols="1">
					<v-text-field type="number" v-model="count"></v-text-field>
				</v-col>
				<v-col cols="1">
					<v-btn color="primary" outlined block @click="submit"> Create </v-btn>
				</v-col>
			</v-row> -->
			<v-row>
				<template v-for="(order, index) in orders">
					<v-col :key="index" cols="6">
						<v-card class="text-capitalize" shaped elevation="1">
							<v-row>
								<v-col cols="8">
									<v-card-text class="pt-3 pb-0">
										Title: 
									</v-card-text>
									<v-card-text class="py-1">
										Capacity: 
									</v-card-text>
									<v-card-text class="py-1">
										Status:
									
									</v-card-text>
									<v-card-text class="pt-1 pb-0">
										Booking Time:
									
									</v-card-text>
									<v-card-text class="pt-1 pb-0" >
										Waiter: 
									</v-card-text>
								</v-col>
								<v-col cols="4">
									<vue-qr :text="6" :size="120"></vue-qr>
								</v-col>
							</v-row>
							<v-card-actions class="px-4 pt-0">
								<v-spacer></v-spacer>
								
							</v-card-actions>
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-card>
		<tableDialog
			v-if="tableDialog"
			:dialogModel="tableDialog"
			:selectedModel="selectedTable"
			:isWaiterOrder="isWaiterOrder"
			@closeDialog="hideTableDialog"
			@created="hideTableDialog"
		/>
	</v-card>
</template>


<script>
	import { mapState } from "vuex"
	import moment from "moment"
	import VueQr from "vue-qr"

	export default {
		layout: "cms",
        async asyncData({$axios}){
            //  let response=await $axios.$get('/api/restaurants/3/orders');
            //  console.log(response);
        },
		head() {
			return {
				title: "orders",
			}
		},
		components: {
            
			VueQr,
			tableDialog: () => import("~/components/dialogs/tableDialog"),
		},
		async fetch() {
			const getEmployees = await this.getEmployees()
			let getTables = await this.getTables(this.restaurantId)
			let getRestaurant = await this.getRestaurant(this.restaurantId)
			this.isWaiterOrder = getRestaurant.data.orderToWaiterAssignType
			console.log('this.isWaiterOrder >>>>>>>>', this.isWaiterOrder)

			return {
				getEmployees,
				getTables,
				getRestaurant,
			}
		},
		data: () => ({
			tableDialog: false,
			count: null,
			restaurantId: "a80865d0-d0d5-41d9-b9cc-699fa8acf3ae",
			isWaiterOrder: 0,
		}),
		computed: {
			
         	...mapState({
	 		 	orders: (state) => {
					

                    console.log( state.order.list);
                    return state.order.list;
				},
				
		  	}),
			selectedTable: {
				get() {
					return this.$store.state.tables.selectedTable
				},
				set(val) {
					this.$store.commit("tables/setSelectedTable", val)
				},
			},
		},
		methods: {
			refresh() {
				this.$nuxt.refresh()
			},
			dateFormat(value) {
				const date = new Date(value)
				return moment(date).format("DD MMMM YYYY")
			},
			async getTables(restaurantId) {
				return await this.$store.dispatch("tables/getAll", restaurantId)
			},
			async getRestaurant(restaurantId) {
				return await this.$store.dispatch("restaurants/get", { restaurantId })
			},
			async getEmployees() {
				let data = { restaurantId: "a80865d0-d0d5-41d9-b9cc-699fa8acf3ae" }
				if (data.restaurantId)
					return await this.$store.dispatch("employees/getAll", data)
			},
			getWaiter(id) {
				const waiter = this.employeeList.filter((item) => item.id === id)
				return waiter[0] && waiter[0].firstName + " " + waiter[0].lastName
			},
			async deleteTable(restaurantId, tableId) {
				if (!confirm("Are sure you want delete restaurant?")) return null
				return await this.$store.dispatch("tables/delete", {
					restaurantId,
					tableId,
				})
			},
			showTableDialog(selectedTable = null) {
				this.tableDialog = true
				this.selectedTable = selectedTable
					? Object.assign({}, selectedTable)
					: null
			},
			hideTableDialog() {
				this.tableDialog = false
				this.selectedTable = null
			},
			async submit() {
				const data = {
					restaurantId: this.restaurantId,
					payload: {
						restaurantId: this.restaurantId,
						count: Number(this.count),
					},
				}

				return await this.$store.dispatch("tables/create", data).then((res) => {
					console.log("create table res >>> ", res)
					if (res.status === 201) {
						this.$toast.success("Table Created...")
						this.$emit("created", res.data)
					}
				})
			},
		},
	}
</script>
