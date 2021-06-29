<template>
	<v-card width="100%">
		<v-card-title class="transparent-2 mb-3">
			Menus Management
			<v-spacer />
			<v-btn @click="refresh()" icon> <v-icon>mdi-refresh</v-icon> </v-btn>
		</v-card-title>

		<v-row class="pa-2" no-gutters>
			<v-col
				class="pa-2"
				:cols="selectedRestaurant ? colSize(6, 6, 12, 12) : 12"
			>
				<v-combobox
					v-model="selectedRestaurant"
					:items="restaurantList"
					item-text="name"
					item-value="id"
					label="Select Restaurant"
					outlined
					class="mx-2"
					clearable
					dense
					name="selectedRestaurant"
					hide-details
				></v-combobox>
			</v-col>
			<v-col
				class="pa-2"
				:cols="colSize(6, 6, 12, 12)"
				v-if="selectedRestaurant"
			>
				<v-combobox
					v-model="selectedMenu"
					:items="menuList"
					item-text="name"
					item-value="id"
					label="Select Menu"
					outlined
					class="mx-2"
					clearable
					dense
					name="selectedMenu"
					hide-details
				></v-combobox>
			</v-col>
		</v-row>
		<v-row class="pa-2" no-gutters v-if="selectedMenu">
			<v-col class="pa-2">
				<v-combobox
					v-model="selectedMenuSection"
					:items="sectionsList"
					item-text="name"
					item-value="id"
					label="Select Menu Section"
					outlined
					return-object
					class="mx-2"
					clearable
					dense
					name="selectedMenuSection"
					hide-details
				></v-combobox>
			</v-col>
			<v-col class="pa-2" cols="1">
				<v-btn
					color="success"
					@click="showCreateUpdateMenuSectionDialog()"
					icon
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<!-- Selected Section -->
		<v-row>
			<v-col>
				<template
					v-if="selectedRestaurant && selectedMenu && selectedMenuSection"
				>
					<v-card-title class="transparent-2">
						Selected Section
						<v-spacer></v-spacer>
						{{ selectedMenuSection.name }}
						<v-spacer></v-spacer>

						<v-btn
							color="error"
							@click="deleteMenuSection(selectedMenuSection.id)"
							icon
						>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
						<v-btn
							color="primary"
							@click="showCreateUpdateMenuSectionDialog(selectedMenuSection)"
							icon
						>
							<v-icon>mdi-database-edit</v-icon>
						</v-btn>
					</v-card-title>
				</template>
			</v-col>
		</v-row>

		<!-- menus -->
		<template v-if="selectedRestaurant && !selectedMenu">
			<v-card-title
				class="d-flex flex-row justify-space-between transparent-1 mb-3"
			>
				<div class="flex-grow-1">
					{{
						filteredMenuList.length > 1
							? `${filteredMenuList.length} Menus`
							: `${filteredMenuList.length} Menu`
					}}
				</div>
				<div class="flex-grow-1 d-flex justify-center"></div>
				<div class="flex-grow-1 d-flex justify-end">
					<v-btn color="success" @click="showCreateUpdateMenuDialog()" icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-row>
					<template v-for="(menu, index) in filteredMenuList">
						<v-col :key="index" :cols="colSize(6, 6, 12, 12)">
							<v-card
								@click="selectedMenu = menu"
								class="text-capitalize fill-height"
								elevation="1"
								shaped
							>
								<v-card-text>
									{{ menu.name }}
								</v-card-text>
								<v-card-text class="transparent-2">
									<v-row no-gutters>
										<v-col class="px-1 py-1" :cols="colSize(2, 2, 6, 12)">
											<v-btn
												color="success"
												@click="showCreateUpdateMenuSectionDialog()"
												icon
												small
												dense
											>
												<v-icon>mdi-pencil</v-icon>
											</v-btn>
											Sections:
										</v-col>
										<v-col
											class="px-1 py-1"
											v-for="(section, index) in menu.sections"
											:key="index"
											:cols="colSize(2, 4, 6, 12)"
										>
											<v-btn
												@click="showCreateUpdateMenuSectionDialog(section)"
												class="pa-0 ma-0"
												color="accent"
												rounded
												block
												dense
												small
												outlined
												elevation="0"
											>
												<small>
													{{
														section.name.length > 7
															? `${section.name.slice(0, 7)}...`
															: section.name
													}}
												</small>
											</v-btn>
										</v-col>
									</v-row>
									<v-row no-gutters>
										<v-col class="px-1 py-1" :cols="colSize(2, 2, 6, 12)">
											<v-btn
												color="success"
												@click="showCreateUpdateMenuExtraDialog()"
												icon
												small
												dense
											>
												<v-icon>mdi-pencil</v-icon>
											</v-btn>
											Extras:
										</v-col>
										<v-col
											class="px-1 py-1"
											v-for="(extra, index) in menu.extras"
											:key="index"
											:cols="colSize(2, 4, 6, 12)"
										>
											<v-btn
												@click="showCreateUpdateMenuExtraDialog(extra)"
												class="pa-0 ma-0"
												color="accent"
												rounded
												block
												dense
												small
												outlined
												elevation="0"
											>
												<small>
													{{
														extra.name.length > 7
															? `${extra.name.slice(0, 7)}...`
															: extra.name
													}}
												</small>
											</v-btn>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-actions class="px-4">
									<v-spacer></v-spacer>

									<v-btn color="error" @click="deleteMenu(menu.id)" icon>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<v-btn
										color="primary"
										@click="showCreateUpdateMenuDialog(menu)"
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

		<!-- sections -->
		<template v-if="false && selectedRestaurant && selectedMenu">
			<v-card-title
				class="d-flex flex-row justify-space-between transparent-1 mb-3"
			>
				<div class="flex-grow-1">
					{{
						sectionsList.length > 1
							? `${sectionsList.length} Sections`
							: `${sectionsList.length} Section`
					}}
				</div>
				<div class="flex-grow-1 d-flex justify-center"></div>
				<div class="flex-grow-1 d-flex justify-end">
					<v-btn
						color="success"
						@click="showCreateUpdateMenuSectionDialog()"
						icon
					>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-row>
					<template v-for="(section, index) in sectionsList">
						<v-col :key="index" :cols="colSize(6, 6, 12, 12)">
							<v-card class="text-capitalize" shaped elevation="1">
								<v-card-text>
									{{ section.name }}
								</v-card-text>
								<v-card-actions class="px-4">
									<v-spacer></v-spacer>

									<v-btn
										color="error"
										@click="deleteMenuSection(section.id)"
										icon
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<v-btn
										color="primary"
										@click="showCreateUpdateMenuSectionDialog(section)"
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

		<!-- items -->
		<template v-if="selectedRestaurant && selectedMenu">
			<v-card-title class="transparent-1 mb-3">
				<div>
					{{
						filteredItemsList.length > 1
							? `${filteredItemsList.length} Items`
							: `${filteredItemsList.length} Item`
					}}
				</div>
				<v-spacer></v-spacer>
				<div>
					<v-btn color="success" @click="showCreateUpdateMenuItemDialog()" icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-row>
					<template v-for="(item, index) in filteredItemsList">
						<v-col :key="index" :cols="colSize(6, 6, 12, 12)">
							<v-card class="text-capitalize fill-height" shaped elevation="1">
								<v-card-actions class="px-4">
									<v-icon :color="item.isFavourite ? 'accent' : 'grey'">
										mdi-star </v-icon
									>&nbsp;
									{{ item.name }}
									<v-spacer></v-spacer>
									Qty.{{ item.availableQuantity }}
									<v-spacer></v-spacer>
									{{ selectedRestaurant.currency.symbol
									}}{{ formatePrice(item.price) }}
								</v-card-actions>
								<v-card-text class="transparent-1">
									<v-row no-gutters>
										<v-col class="px-1 py-1" :cols="colSize(2, 2, 6, 12)">
											<v-btn
												color="success"
												@click="showCreateUpdateMenuSectionDialog()"
												icon
												small
												dense
											>
												<v-icon>mdi-pencil</v-icon>
											</v-btn>
											Sections:
										</v-col>
										<v-col
											class="px-1 py-1"
											v-for="(itemSection, index) in item.sections"
											:key="index"
											:cols="colSize(2, 2, 6, 12)"
										>
											<v-btn
												@click="showCreateUpdateMenuSectionDialog(itemSection)"
												class="pa-0 ma-0"
												color="accent"
												rounded
												block
												dense
												small
												outlined
												elevation="0"
											>
												<small>
													{{
														itemSection.name.length > 7
															? `${itemSection.name.slice(0, 7)}...`
															: itemSection.name
													}}
												</small>
											</v-btn>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-text class="transparent-2">
									<v-row no-gutters>
										<v-col class="px-1 py-1" :cols="colSize(2, 2, 6, 12)">
											<v-btn
												color="success"
												@click="showCreateUpdateMenuExtraDialog()"
												small
												dense
												icon
											>
												<v-icon>mdi-pencil</v-icon> </v-btn
											>Extras:
										</v-col>
										<v-col
											class="px-1 py-1"
											v-for="(itemExtra, index) in item.extras"
											:key="index"
											:cols="colSize(2, 2, 6, 12)"
										>
											<v-btn
												@click="showCreateUpdateMenuExtraDialog(itemExtra)"
												class="pa-0 ma-0"
												color="accent"
												rounded
												block
												dense
												small
												outlined
												elevation="0"
											>
												<small>
													{{
														itemExtra.name.length > 7
															? `${itemExtra.name.slice(0, 7)}...`
															: itemExtra.name
													}}
												</small>
											</v-btn>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-actions class="px-4">
									<v-spacer></v-spacer>

									<v-btn color="error" @click="deleteMenuItem(item.id)" icon>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<v-btn
										color="primary"
										@click="showCreateUpdateMenuItemDialog(item)"
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

		<!-- extras -->
		<template v-if="selectedRestaurant && selectedMenu">
			<v-card-title class="transparent-1 mb-3">
				<div>
					{{
						extrasList.length > 1
							? `${extrasList.length} Extras`
							: `${extrasList.length} Extra`
					}}
				</div>
				<v-spacer></v-spacer>
				<div>
					<v-btn
						color="success"
						@click="showCreateUpdateMenuExtraDialog()"
						icon
					>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-row>
					<template v-for="(extra, index) in extrasList">
						<v-col :key="index" :cols="colSize(6, 6, 12, 12)">
							<v-card class="text-capitalize" shaped elevation="1">
								<v-card-actions class="px-4">
									{{ extra.name }}
									<v-spacer></v-spacer>
									Qty. {{ extra.availableQuantity }}
									<v-spacer></v-spacer>
									{{ selectedRestaurant.currency.symbol
									}}{{ formatePrice(extra.price) }}
								</v-card-actions>
								<v-card-actions class="px-4">
									<v-spacer></v-spacer>

									<v-btn color="error" @click="deleteMenuExtra(extra.id)" icon>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<v-btn
										color="primary"
										@click="showCreateUpdateMenuExtraDialog(extra)"
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

		<createUpdateMenuDialog
			:parent="this"
			:selectedModel="selectedMenu"
			:dialogModel="createUpdateMenuDialog"
			@closeDialog="hideCreateUpdateMenuDialog()"
			@created="hideCreateUpdateMenuDialog()"
			v-if="createUpdateMenuDialog"
		/>

		<createUpdateMenuSectionDialog
			:parent="this"
			:selectedModel="selectedMenuSection"
			:dialogModel="createUpdateMenuSectionDialog"
			@closeDialog="hideCreateUpdateMenuSectionDialog()"
			@created="hideCreateUpdateMenuSectionDialog()"
			v-if="createUpdateMenuSectionDialog"
		/>

		<createUpdateMenuExtraDialog
			:parent="this"
			:selectedModel="selectedMenuExtra"
			:dialogModel="createUpdateMenuExtraDialog"
			@closeDialog="hideCreateUpdateMenuExtraDialog()"
			@created="hideCreateUpdateMenuExtraDialog()"
			v-if="createUpdateMenuExtraDialog"
		/>

		<createUpdateMenuItemDialog
			:parent="this"
			:selectedModel="selectedMenuItem"
			:dialogModel="createUpdateMenuItemDialog"
			@closeDialog="hideCreateUpdateMenuItemDialog()"
			@created="hideCreateUpdateMenuItemDialog()"
			v-if="createUpdateMenuItemDialog"
		/>
	</v-card>
</template>


<script>
	import createUpdateMenuDialog from "~/components/dialogs/menu/createUpdateMenuDialog"
	import createUpdateMenuSectionDialog from "~/components/dialogs/menu/createUpdateMenuSectionDialog"
	import createUpdateMenuItemDialog from "~/components/dialogs/menu/createUpdateMenuItemDialog"
	import createUpdateMenuExtraDialog from "~/components/dialogs/menu/createUpdateMenuExtraDialog"
	import { mapState } from "vuex"

	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Menus",
			}
		},
		components: {
			createUpdateMenuDialog,
			createUpdateMenuSectionDialog,
			createUpdateMenuItemDialog,
			createUpdateMenuExtraDialog,
		},
		async fetch() {
			let getRestaurants = await this.getRestaurants()
			let getMenus = await this.getMenus()
			let getAllSections = await this.getAllSections()
			let getAllItems = await this.getAllItems()
			let getAllExtras = await this.getAllExtras()
			return {
				getRestaurants,
				getMenus,
				getAllSections,
				getAllItems,
				getAllExtras,
			}
		},
		data: () => ({
			createUpdateMenuDialog: false,
			createUpdateMenuSectionDialog: false,
			createUpdateMenuItemDialog: false,
			createUpdateMenuExtraDialog: false,
		}),
		computed: {
			...mapState({
				restaurantList: (state) => {
					return state.restaurants.list
				},
				menuList: (state) => {
					return state.menus.list
				},
				sectionsList: (state) => {
					return state.menus.sectionsList
				},
				itemsList: (state) => {
					return state.menus.itemsList
				},
				extrasList: (state) => {
					return state.menus.extrasList
				},
			}),
			selectedMenu: {
				get() {
					return this.$store.state.menus.selectedMenu
				},
				set(val) {
					this.$store.commit("menus/setSelectedMenu", val)
				},
			},
			selectedMenuSection: {
				get() {
					return this.$store.state.menus.selectedMenuSection
				},
				set(val) {
					this.$store.commit("menus/setSelectedMenuSection", val)
				},
			},
			selectedMenuItem: {
				get() {
					return this.$store.state.menus.selectedMenuItem
				},
				set(val) {
					this.$store.commit("menus/setSelectedMenuItem", val)
				},
			},
			selectedMenuExtra: {
				get() {
					return this.$store.state.menus.selectedMenuExtra
				},
				set(val) {
					this.$store.commit("menus/setSelectedMenuExtra", val)
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
			filteredMenuList() {
				return this.getFilteredMenusList()
			},
			filteredItemsList() {
				return this.getFilteredMenuItemsList()
			},
		},
		watch: {
			selectedRestaurant(val) {
				this.refresh()
			},
			selectedMenu(val) {
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
			async getMenus() {
				let data = { restaurantId: this.selectedRestaurant?.id }
				if (this.selectedRestaurant?.id)
					return await this.$store.dispatch("menus/getAll", data)
			},
			async getAllSections() {
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
				}
				if (this.selectedRestaurant?.id && this.selectedMenu?.id)
					return await this.$store.dispatch("menus/getAllSections", data)
			},
			async getAllItems() {
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
				}
				if (this.selectedRestaurant?.id && this.selectedMenu?.id)
					return await this.$store.dispatch("menus/getAllItems", data)
			},
			async getAllExtras() {
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
				}
				if (this.selectedRestaurant?.id && this.selectedMenu?.id)
					return await this.$store.dispatch("menus/getAllExtras", data)
			},

			async deleteMenu(menuId) {
				if (!confirm("Are sure you want delete menu?")) return
				let data = { restaurantId: this.selectedRestaurant?.id, menuId }
				let res = await this.$store.dispatch("menus/delete", data)
				this.selectedMenu = null
				this.refresh()
				return res
			},
			async deleteMenuSection(sectionId) {
				if (!confirm("Are sure you want delete menu section?")) return
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
					sectionId,
				}
				let res = await this.$store.dispatch("menus/deleteSection", data)
				this.selectedMenuSection = null
				this.refresh()
				return res
			},
			async deleteMenuItem(itemId) {
				if (!confirm("Are sure you want delete menu Item?")) return
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
					itemId,
				}
				let res = await this.$store.dispatch("menus/deleteItem", data)
				this.selectedMenuItem = null
				this.refresh()
				return res
			},
			async deleteMenuExtra(extraId) {
				if (!confirm("Are sure you want delete menu Extra?")) return
				let data = {
					restaurantId: this.selectedRestaurant?.id,
					menuId: this.selectedMenu?.id,
					extraId,
				}
				let res = await this.$store.dispatch("menus/deleteExtra", data)
				this.selectedMenuExtra = null
				this.refresh()
				return res
			},

			showCreateUpdateMenuDialog(selectedMenu = null) {
				this.createUpdateMenuDialog = true
				this.selectedMenu = selectedMenu
				if (selectedMenu) {
					this.selectedMenu = Object.assign({}, selectedMenu)
				}
			},
			hideCreateUpdateMenuDialog() {
				this.createUpdateMenuDialog = false
				this.selectedMenu = null
			},

			showCreateUpdateMenuSectionDialog(selectedMenuSection = null) {
				this.createUpdateMenuSectionDialog = true
				this.selectedMenuSection = selectedMenuSection
				if (selectedMenuSection) {
					this.selectedMenuSection = Object.assign({}, selectedMenuSection)
				}
			},
			hideCreateUpdateMenuSectionDialog() {
				this.createUpdateMenuSectionDialog = false
				this.selectedMenuSection = null
			},

			showCreateUpdateMenuItemDialog(selectedMenuItem = null) {
				this.createUpdateMenuItemDialog = true
				this.selectedMenuItem = selectedMenuItem
				if (selectedMenuItem) {
					this.selectedMenuItem = Object.assign({}, selectedMenuItem)
				}
			},
			hideCreateUpdateMenuItemDialog() {
				this.createUpdateMenuItemDialog = false
				this.selectedMenuItem = null
			},

			showCreateUpdateMenuExtraDialog(selectedMenuExtra = null) {
				this.createUpdateMenuExtraDialog = true
				this.selectedMenuExtra = selectedMenuExtra
				if (selectedMenuExtra) {
					this.selectedMenuExtra = Object.assign({}, selectedMenuExtra)
				}
			},
			hideCreateUpdateMenuExtraDialog() {
				this.createUpdateMenuExtraDialog = false
				this.selectedMenuExtra = null
			},

			getFilteredMenusList() {
				let menus = this.menuList
				// if (this.selectedRestaurant)
				// 	menus = menus.filter(
				// 		(menu) => menu.restaurantId == this.selectedRestaurant.id
				// 	)

				return menus
			},
			getFilteredMenuItemsList() {
				let menuItems = this.itemsList
				if (this.selectedMenuSection)
					menuItems = menuItems.filter((menuItem) =>
						JSON.stringify(menuItem.sections).includes(
							this.selectedMenuSection.id
						)
					)

				return menuItems
			},
		},
	}
</script>
