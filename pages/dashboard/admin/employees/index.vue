<template>
	<v-card width="100%">
		<v-card-title class="transparent-2 mb-3">
			Employees Management
			<v-spacer />
			<v-btn @click="refresh()" icon> <v-icon>mdi-refresh</v-icon> </v-btn>
		</v-card-title>

		<div class="px-2 d-flex flex-row justify-space-between">
			<div class="px-2 py-2 flex-grow-1">
				<v-combobox
					v-model="selectedRestaurant"
					:items="restaurantList"
					item-text="name"
					item-value="id"
					label="Select Restaurant"
					outlined
					clearable
					dense
					name="selectedRestaurant"
					hide-details
				></v-combobox>
			</div>
			<div v-if="selectedRestaurant" class="px-2 py-2 flex-grow-1">
				<v-combobox
					v-model="selectedRole"
					:items="roleList"
					item-text="name"
					item-value="name"
					label="Select Employee Role"
					return-object
					outlined
					clearable
					name="selectedRole"
					dense
					hide-details
				></v-combobox>
			</div>
			<div
				v-if="selectedRole && ['Manager'].includes(selectedRole.name)"
				class="px-2 py-2 flex-grow-1"
			>
				<v-combobox
					v-model="selectedAdmin"
					:items="adminList"
					item-text="firstName"
					item-value="id"
					label="Select Admin"
					outlined
					clearable
					dense
					name="selectedAdmin"
					hide-details
				></v-combobox>
			</div>
			<div
				v-if="selectedRole && ['Waiter', 'Chief'].includes(selectedRole.name)"
				class="px-2 py-2 flex-grow-1"
			>
				<v-combobox
					v-model="selectedManager"
					:items="managerList"
					item-text="firstName"
					item-value="id"
					label="Select Manager"
					outlined
					clearable
					dense
					name="selectedManager"
					hide-details
				></v-combobox>
			</div>
		</div>

		<template v-if="selectedRestaurant">
			<v-card-title
				class="d-flex flex-row justify-space-between transparent-1 mb-3"
			>
				<div class="flex-grow-1">
					{{
						filteredEmployeeList.length > 1
							? `${filteredEmployeeList.length} ${
									selectedRole ? selectedRole.name + "s" : "Employees"
							  }`
							: `${filteredEmployeeList.length} ${
									selectedRole ? selectedRole.name : "Employee"
							  }`
					}}
				</div>
				<div class="flex-grow-1 d-flex justify-center"></div>
				<div class="flex-grow-1 d-flex justify-end">
					<v-btn color="success" @click="showCreateUpdateEmployeeDialog()" icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-row>
					<template v-for="(employee, index) in filteredEmployeeList">
						<v-col :key="index" cols="6">
							<v-card class="text-capitalize" shaped elevation="1">
								<v-card-text>
									{{ employee.firstName }}
									{{ employee.lastName }}
								</v-card-text>
								<v-card-actions class="px-4">
									{{ employee.role }}
									<v-spacer></v-spacer>
									<div v-if="['Manager'].includes(employee.role)">
										<v-btn
											color="orange"
											@click="demoteToChief(employee.id)"
											icon
										>
											<v-icon>mdi-arrow-down</v-icon>
										</v-btn>
										<v-btn
											color="red"
											@click="demoteToWaiter(employee.id)"
											icon
										>
											<v-icon>mdi-arrow-down</v-icon>
										</v-btn>
									</div>
									<div v-if="['Chief', 'Waiter'].includes(employee.role)">
										<v-btn
											color="green"
											@click="
												employee.role == 'Waiter'
													? promoteWaiter(employee.id)
													: promoteChief(employee.id)
											"
											icon
										>
											<v-icon>mdi-arrow-up</v-icon>
										</v-btn>
									</div>
									<v-btn
										icon
										:title="
											employee.blocked ? 'Click To Active' : 'Click To Block'
										"
										:color="employee.blocked ? 'blue' : 'green'"
										@click="
											employee.blocked
												? activeEmployee(employee.id)
												: blockEmployee(employee.id)
										"
									>
										<v-icon>{{
											employee.blocked
												? "mdi-toggle-switch-off"
												: "mdi-toggle-switch"
										}}</v-icon>
									</v-btn>

									<v-btn
										color="error"
										v-if="employee.isDeleted == false"
										@click="deleteEmployee(employee.id)"
										icon
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<v-btn
										color="primary"
										@click="showCreateUpdateEmployeeDialog(employee)"
										icon
									>
										<v-icon>mdi-database-edit</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-card-text>
		</template>

		<createUpdateEmployeeDialog
			:parent="this"
			:selectedModel="selectedEmployee"
			:dialogModel="createUpdateEmployeeDialog"
			@closeDialog="hideCreateUpdateEmployeeDialog()"
			@created="hideCreateUpdateEmployeeDialog()"
			v-if="createUpdateEmployeeDialog"
		/>
	</v-card>
</template>


<script>
	import { mapState } from "vuex"
	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Employees",
			}
		},
		components: {
			createUpdateEmployeeDialog: () =>
				import("~/components/dialogs/createUpdateEmployeeDialog"),
		},
		async fetch() {
			let getRestaurants = await this.getRestaurants()
			let getEmployees = await this.getEmployees()
			return {
				getRestaurants,
				getEmployees,
			}
		},
		data: () => ({
			createUpdateEmployeeDialog: false,
		}),
		computed: {
			...mapState({
				employeeList: (state) => {
					return state.employees.list
				},
				roleList: (state) => {
					return state.employees.roleList
				},
				restaurantList: (state) => {
					return state.restaurants.list
				},
			}),
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
			selectedEmployee: {
				get() {
					return this.$store.state.employees.selectedEmployee
				},
				set(val) {
					this.$store.commit("employees/setSelectedEmployee", val)
				},
			},
			selectedRole: {
				get() {
					return this.$store.state.employees.selectedRole
				},
				set(val) {
					this.$store.commit("employees/setSelectedRole", val)
				},
			},
			selectedRestaurant: {
				get() {
					return this.$store.state.restaurants.selectedRestaurant
				},
				set(val) {
					this.$store.commit("restaurants/setSelectedRestaurant", val)
				},
			},
			adminList() {
				return this.employeeList.filter((emp) => emp.role == "Admin")
			},
			managerList() {
				return this.employeeList.filter((emp) => emp.role == "Manager")
			},
			waiterList() {
				return this.employeeList.filter((emp) => emp.role == "Waiter")
			},
			chiefList() {
				return this.employeeList.filter((emp) => emp.role == "Chief")
			},
			filteredEmployeeList() {
				return this.getFilteredEmployeesList()
			},
			currentEmployeesListRole() {
				if (this.selectedManager) return "Chiefs & Waiters"
				else if (this.selectedAdmin) return "Managers"
				else if (this.selectedRestaurant) return "Admins"
				else return "None"
			},
			currentEmployeesListRoleName() {
				return this.currentEmployeesListRole.replace(/s/g, "").split(" & ")
			},
		},
		watch: {
			selectedRestaurant(val) {
				this.refresh()
			},
		},
		methods: {
			refresh() {
				this.$nuxt.refresh()
			},
			async getRestaurants() {
				return await this.$store.dispatch("restaurants/getAll")
			},
			async getEmployees() {
				let data = { restaurantId: this.selectedRestaurant?.id }
				if (data.restaurantId)
					return await this.$store.dispatch("employees/getAll", data)
			},
			async deleteEmployee(employeeId) {
				if (!confirm("Are sure you want delete employee account?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/delete", data)
			},
			async activeEmployee(employeeId) {
				if (!confirm("Are sure you want active employee account?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/active", data)
			},
			async blockEmployee(employeeId) {
				if (!confirm("Are sure you want block employee account?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/block", data)
			},
			async promoteWaiter(employeeId) {
				if (!confirm("Are sure you want to promote waiter?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/promoteWaiter", data)
			},
			async promoteChief(employeeId) {
				if (!confirm("Are sure you want to promote chief?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/promoteChief", data)
			},
			async demoteToWaiter(employeeId) {
				if (!confirm("Are sure you want to demote manager to waiter?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/demoteToWaiter", data)
			},
			async demoteToChief(employeeId) {
				if (!confirm("Are sure you want to demote manager to chief?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, employeeId }
				return await this.$store.dispatch("employees/demoteToChief", data)
			},
			showCreateUpdateEmployeeDialog(selectedEmployee = null) {
				this.createUpdateEmployeeDialog = true
				this.selectedEmployee = selectedEmployee
				this.selectedRole = null
				this.selectedAdmin = null
				this.selectedManager = null

				if (selectedEmployee) {
					this.selectedEmployee = Object.assign({}, selectedEmployee)
					this.selectedRole = this.roleList.find(
						(role) => role.name == selectedEmployee.role
					)

					if (
						["waiter", "chief"].includes(
							this.selectedRole.name.toString().toLowerCase()
						)
					) {
						this.selectedManager = this.employeeList.find(
							(emp) => emp.id == selectedEmployee.managerId
						)
					}

					if (
						["manager"].includes(this.selectedRole.name.toString().toLowerCase())
					) {
						this.selectedAdmin = this.employeeList.find(
							(emp) => emp.id == selectedEmployee.adminId
						)
					}
				}
			},
			hideCreateUpdateEmployeeDialog() {
				this.createUpdateEmployeeDialog = false
				this.selectedEmployee = null
				this.selectedRole = null
				this.selectedAdmin = null
				this.selectedManager = null
			},
			getFilteredEmployeesList() {
				let employees = this.employeeList
				if (this.selectedRestaurant)
					employees = employees.filter(
						(employee) => employee.restaurantId == this.selectedRestaurant.id
					)
				if (this.selectedAdmin)
					employees = employees.filter(
						(employee) => employee.adminId == this.selectedAdmin.id
					)
				if (this.selectedManager)
					employees = employees.filter(
						(employee) => employee.managerId == this.selectedManager.id
					)
				if (this.selectedRole)
					employees = employees.filter(
						(employee) => employee.role == this.selectedRole.name
					)

				return employees
			},
		},
	}
</script>
