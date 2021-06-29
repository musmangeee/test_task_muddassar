<template>
	<DialogBase
		:dialogWidth="800"
		:dialogModel="dialogModel"
		@closeDialog="(val) => closeDialog(val)"
	>
		<template v-slot:title
			>{{ selectedModel ? "Update" : "Create" }} Table</template
		>
		<v-form
			id="table-form"
			@submit.prevent
			v-model="isValidForm"
			ref="from"
		>
			<FormCreator :schema="form_structure" :model="form_data"></FormCreator>

			<v-row class="pb-0 mt-0"	v-if="form_data.status === 2 || (form_data.status && form_data.status.id === 2)">
				<v-col class="px-2 mt-0 pt-0" :cols="colSize(4, 4, 4, 12)">
					<v-dialog
						v-model="bookDate.dialog"
						width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<div>
								<div style="text-align: left !important">
									Date
								</div>
								<v-btn
									@click="bookDate.dialog = true"
									v-bind="attrs"
									v-on="on"
									style="border: 1px solid gray"
									block
									text
								>
									{{ bookDate.value }}
								</v-btn>
							</div>
						</template>
						<v-date-picker
							@click:date="bookDate.dialog = false"
							v-model="bookDate.value"
							color="accent"
							:min='curDate'
						/>
						aaa
					</v-dialog>
				</v-col>
				<v-col class="px-2 mt-0 pt-0" :cols="colSize(4, 4, 4, 12)">
					<v-dialog
						v-model="bookTime.dialog"
						width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<div>
								<div style="text-align: left !important">
									Time
								</div>
								<v-btn
									@click="bookTime.dialog = true"
									v-bind="attrs"
									v-on="on"
									style="border: 1px solid gray"
									block
									text
								>
									{{ bookTime.value }}
								</v-btn>
							</div>
						</template>

						<v-time-picker
							@click:minute="bookTime.dialog = false"
							v-model="bookTime.value"
							color="accent"
							ampm-in-title
							format="ampm"
							scrollable
						></v-time-picker>
					</v-dialog>
				</v-col>
			</v-row>
			<v-row class="d-flex justify-center mt-1">
				<div
					class="qr-wrapper" 
					@mouseover="isHover = true"
					@mouseleave="isHover = false"
				>
					<vue-qr text="form_data.id" :size="350" class="qr-img" :callback="getImage" :text="restaurantId"></vue-qr>
					<a download="download" :href="downloadURI" class="qr-download" v-if="isHover">Download</a>

				</div>
			</v-row>
		</v-form>
		<v-btn color="primary" outlined block @click="submit()">
			Save
		</v-btn>
	</DialogBase>
</template>

<script>
	import { mapState } from "vuex"
	import { required, validEmail, minLen, maxLen } from "~/helpers/validationRules.js"
	import FormCreator from "~/components/global/FormCreator"
	import DialogBase from "@/components/dialogs/Base"
	import VueQr from 'vue-qr'
	import moment from "moment";
	import { statusList } from "@/constants"

	export default {
		components: { 
			DialogBase,
			FormCreator,
			VueQr
		},
		props: {
			dialogModel: { required: true, type: Boolean },
			selectedModel: { required: true, default: null },
			isWaiterOrder: { required: true, default: null },
		},
		data() {
			return {
				isValidForm: false,
				form_data: {
					title: null,
					capacity: null,
					status: null,
					bookingTime: null,
					count: null,
					employeeId: null,
				},
				send_data: {
					title: null,
					capacity: null,
					status: null,
					bookingTime: null,
					count: null,
					employeeId: null,
				},
				restaurantId: "a80865d0-d0d5-41d9-b9cc-699fa8acf3ae",
				bookDate: {
					dialog: false,
					value: "2021-06-01"
				},
				bookTime: {
					dialog: false,
					value: "00:00"
				},
				isHover: false,
				downloadURI: '',
				curDate: ''
			}
		},
		computed: {
			...mapState({
				employeeList: (state) => {
					let list  =  state.employees.list.filter((emp) => emp.role === "Waiter")
					// list.push({
					// 	adminId: null,
					// 	blocked: false,
					// 	firstName: "Not assigned",
					// 	id: null,
					// 	isDeleted: false,
					// 	lastName: null,
					// 	managerId: null,
					// 	restaurantId: null,
					// 	role: null,
					// })

					return list
				},
			}),
			form_structure() {
				return {
					title: {
						name: "title",
						type: "text",
						label: "title",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					},
					capacity: {
						name: "capacity",
						type: "number",
						label: "capacity",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
						rule: [required("Title is required."), maxLen(3)]
					},
					employeeId: {
						name: "employeeId",
						label: "Waiter",
						type: "select",
						itemText: "firstName",
						itemValue: "id",
						items: this.employeeList,
						multiple: false,
						hidden: !this.isWaiterOrder,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					},
					status: {
						name: "status",
						label: "Status",
						type: "select",
						itemText: "title",
						itemValue: "id",
						items: statusList,
						multiple: false,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					},
				}
			},
		},
	watch: {
		'bookTime.value'(newVal, oldVal) {
			console.log('bookTime:', newVal);
		},
	},
		mounted() {
			this.curDate = moment(new Date()).format('YYYY-MM-DD')
			if (this.selectedModel) {
				this.form_data = Object.assign({}, this.selectedModel)
				this.form_data.status = statusList.filter((item) => item.id === this.selectedModel.status + 1)[0]
				this.form_data.employeeId = this.employeeList.filter((item) => item.id === this.selectedModel.employeeId)[0]
				this.bookDate.value = this.selectedModel.bookingTime.substring(0, 4) === '0001' ? '2021-06-01' : this.selectedModel.bookingTime.substring(0, 10)
			}
		},
		methods: {
			getImage(v) {
				this.downloadURI = v
			},
			closeDialog(val = false) {
				this.$emit("closeDialog", val)
			},
			getTime(val) {
				return moment(val).hour() + ':' + moment(val).minute()
			},
			async getEmployees() {
				let data = { restaurantId: 'a80865d0-d0d5-41d9-b9cc-699fa8acf3ae' }
				if (data.restaurantId)
					return await this.$store.dispatch("employees/getAll", data)
			},
			async submit() {
				this.$refs.from.validate()
				if (!this.isValidForm) return
				this.form_data.bookingTime = this.bookDate.value + "T" + this.bookTime.value
				this.send_data = {
					id: this.form_data.id,
					title: this.form_data.title,
					capacity: this.form_data.capacity,
					status: typeof this.form_data.status === "object" ? this.form_data.status.id - 1 : this.form_data.status -1,
					bookingTime: this.bookDate.value + "T" + this.bookTime.value,
					count: this.form_data.capacity,
					employeeId: typeof this.form_data.employeeId === "object" ? this.form_data.employeeId.id : this.form_data.employeeId,
				}
				console.log('submit >>>> ', this.send_data)
				let data = {
					restaurantId: this.restaurantId,
					tableId: this.send_data.id,
					payload: this.send_data,
				}

				let data2 = {}

				if (this.send_data.employeeId == null) {
					data2 = {
						restaurantId: this.restaurantId,
						waiterId: this.selectedModel.employeeId,
						payload: []
					}
				} else {
					data2 = {
						restaurantId: this.restaurantId,
						waiterId: this.send_data.employeeId,
						payload: [this.send_data.id]
					}
				}

				this.$store.dispatch("tables/setWaiter", data2)

				return await this.$store
					.dispatch("tables/update", data)
					.then((res) => {
						if (res.status === 200) {
							this.$toast.success("Table Updated...")
							this.$emit("created", res.data)
						}
					})
			}
		},
	}
</script>

<style lang="scss">
	.qr-wrapper {
		position: relative;
		.qr-download {
			position: absolute;
			margin: auto;
			left: 0;
			right: 0;
			border-radius: 5px;
			top: 45%;
			background: #ff9800;
			width: fit-content;
			padding: 13px;
			color: white;
			font-size: 24px;
			cursor: pointer;
			text-decoration: none;
		}	
	}
</style>