<template>
	<DialogBase
		:dialogWidth="800"
		:dialogModel="dialogModel"
		@closeDialog="(val) => closeDialog(val)"
	>
		<template v-slot:title
			>{{ selectedModel ? "Update" : "Create" }}
			{{ selectedRole ? selectedRole.name : "Employee" }}</template
		>
		<div
			v-if="selectedRestaurant"
			class="d-flex flex-column justify-space-between"
		>
			<div class="px-2 py-0 flex-grow-1">
				<v-combobox
					v-model="selectedRole"
					:items="roleList"
					item-text="name"
					item-value="name"
					label="Select Employee Role"
					return-object
					outlined
					clearable
					:disabled="!!selectedModel"
					name="selectedRole"
				></v-combobox>
			</div>
			<div
				v-if="selectedRole && ['Manager'].includes(selectedRole.name)"
				class="px-2 py-0 flex-grow-1"
			>
				<v-combobox
					v-model="selectedAdmin"
					:items="adminList"
					item-text="firstName"
					item-value="id"
					label="Select Admin"
					outlined
					clearable
					:disabled="!!selectedModel"
					name="selectedAdmin"
				></v-combobox>
			</div>
			<div
				v-if="selectedRole && ['Waiter', 'Chief'].includes(selectedRole.name)"
				class="px-2 py-0 flex-grow-1"
			>
				<v-combobox
					v-model="selectedManager"
					:items="managerList"
					item-text="firstName"
					item-value="id"
					label="Select Manager"
					outlined
					clearable
					:disabled="!!selectedModel"
					name="selectedManager"
				></v-combobox>
			</div>
		</div>
		<v-form
			v-model="isValidForm"
			v-if="
				selectedRole &&
				((['Manager'].includes(selectedRole.name) && !!selectedAdmin) ||
					(['Waiter', 'Chief'].includes(selectedRole.name) &&
						!!selectedManager) ||
					['Admin'].includes(selectedRole.name))
			"
			@submit.prevent
			ref="from"
		>
			<FormCreator :schema="form_structure" :model="form_data"></FormCreator>
		</v-form>
		<v-btn color="primary" outlined block @click="submit()">{{
			selectedModel ? "Update" : "Create"
		}}</v-btn>
	</DialogBase>
</template>

<script>
	import { mapState } from "vuex"
	import { required, validEmail, minLen } from "~/helpers/validationRules.js"
	import { formFieldsBasicLayout } from "~/helpers/functions.js"
	import FormCreator from "~/components/global/FormCreator"
	import DialogBase from "@/components/dialogs/Base"
	export default {
		components: { DialogBase, FormCreator },
		props: {
			dialogModel: { required: true, type: Boolean },
			selectedModel: { required: true, default: null },
			parent: { required: true, default: null },
		},
		data() {
			return {
				isValidForm: false,
				form_data: {},
			}
		},
		computed: {
			...mapState({
				employeeList: (state) => {
					return state.employees.list
				},
				roleList: (state) => {
					return state.employees.roleList
				},
				selectedRestaurant: (state) => {
					return state.restaurants.selectedRestaurant
				},
			}),
			selectedRole: {
				get() {
					return this.$store.state.employees.selectedRole
				},
				set(val) {
					this.$store.commit("employees/setSelectedRole", val)
				},
			},
			selectedAdmin: {
				get() {
					return this.$store.state.employees.selectedAdmin
				},
				set(val) {
					this.$store.commit("employees/setSelectedAdmin", val)
				},
			},
			selectedManager: {
				get() {
					return this.$store.state.employees.selectedManager
				},
				set(val) {
					this.$store.commit("employees/setSelectedManager", val)
				},
			},
			adminList() {
				return this.employeeList.filter((emp) => emp.role == "Admin")
			},
			managerList() {
				return this.employeeList.filter((emp) => emp.role == "Manager")
			},
			form_structure() {
				return {
					firstName: {
						name: "firstName",
						type: "text",
						label: "First Name",
						...formFieldsBasicLayout,
						rules: [required("First Name is required."), minLen(2)],
					},
					lastName: {
						name: "lastName",
						type: "text",
						label: "Last Name",
						...formFieldsBasicLayout,
						rules: [required("Last Name is required."), minLen(2)],
					},
					// phoneNumber: {
					// 	name: "phoneNumber",
					// 	type: "text",
					// 	label: "Phone",
					// 	clearable: true,
					// 	mask: "###-###-####",
					// 	col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					// 	rules: [minLen(12)],
					// },
					// role: {
					// 	name: "role",
					// 	type: "radio",
					// 	label: "Account Type",
					// 	clearable: true,
					// 	itemText: "name",
					// 	itemValue: "name",
					// 	returnObject: true,
					// 	row: true,
					// 	options: this.$store.state.employees.roleList,
					// 	col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					// 	rules: [required("Account Type is required.")],
					// },
				}
			},
		},
		mounted() {
			if (this.selectedModel) {
				this.form_data = Object.assign({}, this.selectedModel)
			}
		},
		methods: {
			closeDialog(val = false) {
				this.$emit("closeDialog", val)
			},
			async submit() {
				this.$refs.from.validate()
				if (!this.isValidForm) return

				this.form_data["restaurantId"] = this.selectedRestaurant.id
				this.form_data["adminId"] = this.selectedAdmin?.id
				this.form_data["managerId"] = this.selectedManager?.id

				let data = {
					restaurantId: this.selectedRestaurant.id,
					employeeId: this.selectedModel?.id,
					adminId: this.selectedAdmin?.id,
					managerId: this.selectedManager?.id,
					payload: this.form_data,
					role: this.selectedRole?.link,
				}

				if (this.selectedModel) {
					return await this.$store
						.dispatch("employees/update", data)
						.then((res) => {
							if (res.status === 200) {
								this.$toast.success("Employee Updated...")
								this.$emit("created", res.data)
							}
						})
				}

				return await this.$store
					.dispatch("employees/create", data)
					.then((res) => {
						if (res.status === 201) {
							this.$toast.success("Employee Created...")
							this.$emit("created", res.data)
						}
					})
			},
		},
	}
</script>
