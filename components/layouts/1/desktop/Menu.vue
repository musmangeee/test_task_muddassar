<template>
	<v-row no-gutters>
		<v-col
			:cols="parent.isFull ? colSize(9, 9, 12, 12) : colSize(12, 12, 12, 12)"
		>
			<section class="main-2">
				<v-card
					flat
					title
					elevation="0"
					class="card-cont fill-height"
					:class="
						parent.isFull
							? 'px-6 py-6'
							: colSize('px-12 py-6', 'px-6 py-3', 'px-0 py-1', 'px-0 py-1')
					"
				>
					<div class="container full-height">
						<v-row no-gutters>
							<v-col class="mb-2" :cols="colSize(6, 6, 12, 12)">
								<h1
									class="font-weight-black"
									:class="
										colSize('display-1', 'display-1', 'display-1', 'title')
									"
								>
									Our Menu
								</h1>
							</v-col>
							<v-col class="mb-2" :cols="colSize(6, 6, 12, 12)">
								<v-text-field
									v-model="parent.searchText"
									prepend-inner-icon="mdi-magnify"
									placeholder="Search"
									outlined
									dense
									hide-details
									clearable
									color="accent"
									@keyup.esc="parent.searchText = null"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row class="mb-2">
							<v-col
								:cols="
									parent.isFull
										? colSize(12, 12, 12, 12)
										: colSize(10, 10, 12, 12)
								"
							>
								<v-tabs
									v-model="parent.menu.selectedSection"
									color="accent"
									show-arrows
									center-active
									grow
									left
									dense
									class="mx-0 px-0 tab-small-arrows"
								>
									<v-tab
										v-for="(section, index) in parent.menus.sections"
										:key="index"
										dense
									>
										<h4>
											{{ section.name }}
										</h4>
									</v-tab>
								</v-tabs>
								<v-divider></v-divider>
							</v-col>
							<v-col v-if="!parent.isFull" :cols="colSize(2, 2, 12, 12)">
								<v-btn
									:to="'/restaurants_layout/1/menu'"
									nuxt
									x-large
									outlined
									block
									class="special-nav"
								>
									<h4>All Menu</h4>
								</v-btn>
							</v-col>
						</v-row>
						<div class="d-flex d-row justify-space-between mb-4">
							<div>
								<h1>
									{{ parent.menus.sections[parent.menu.selectedSection].name }}
								</h1>
							</div>
							<div>
								<v-menu color="transparent" bottom :offset-y="true">
									<template v-slot:activator="{ on, attrs }">
										<v-btn text dark v-bind="attrs" v-on="on">
											{{ parent.menu.selectedFilter }}
											<v-icon> mdi-menu-down </v-icon>
										</v-btn>
									</template>

									<v-list>
										<v-list-item
											@click="parent.menu.selectedFilter = filter"
											v-for="(filter, index) in parent.menu.filters"
											:key="index"
										>
											<v-list-item-title>{{ filter }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
						</div>
						<v-row no-gutters>
							<v-col>
								<v-row>
									<template v-for="(menuItem, i) in parent.filteredMenuItems">
										<v-col
											:cols="
												parent.isFull
													? colSize(4, 4, 6, 12)
													: colSize(3, 4, 6, 12)
											"
											:key="i"
										>
											<v-card
												@click="
													parent.isMenuItemSelected(menuItem)
														? parent.unselectMenuItem()
														: parent.selectMenuItem(menuItem)
												"
												elevation="0"
												width="100%"
												class="transparent-1 fill-height"
											>
												<v-img
													width="100%"
													height="170px"
													aspect-ratio="1"
													:src="
														menuItem.image
															? menuItem.image
															: `https://via.placeholder.com/200x150.png?text=${menuItem.name}`
													"
													:lazy-src="
														menuItem.image
															? menuItem.image
															: `https://via.placeholder.com/20x15.png?text=${menuItem.name}`
													"
												/>
												<div class="my-0 px-2">
													<h1 class="subtitle-1 font-weight-bold">
														{{ menuItem.name }}
													</h1>
													<h2
														class="my-1 text-caption"
														style="min-height: 40px"
													>
														{{
															menuItem.description.length > 75
																? `${menuItem.description.slice(0, 75)}...`
																: menuItem.description
														}}
													</h2>
													<div class="d-flex flex-row justify-space-between">
														<div class="subtitle-1 mt-1 font-weight-bold">
															{{
																parent.restaurant && parent.restaurant.currency
																	? parent.restaurant.currency.symbol
																	: defaultCurrencySign
															}}{{ formatePrice(menuItem.price) }}
														</div>
														<div
															v-if="parent.menuItemAddableIntoCart(menuItem)"
															@click.stop=""
														>
															<v-btn
																v-if="parent.itemExistsInCart(menuItem)"
																@click="parent.removeCartItem(menuItem)"
																style="border-radius: 5px"
																small
																icon
																class="accent"
															>
																<v-icon color="white">mdi-minus</v-icon>
															</v-btn>
															{{
																parent.itemExistsInCart(menuItem)
																	? parent.itemExistsInCart(menuItem).quantity
																	: ""
															}}
															<v-btn
																@click="parent.addItemToCart(menuItem)"
																style="border-radius: 5px"
																small
																icon
																class="accent"
															>
																<v-icon color="white">mdi-plus</v-icon>
															</v-btn>
														</div>
														<div v-else>
															<v-chip outlined small dense color="accent"
																>Sold Out</v-chip
															>
														</div>
													</div>
												</div>
												<template
													v-if="menuItem.extras && menuItem.extras.length"
												>
													<v-expand-transition>
														<v-row
															v-show="parent.isMenuItemSelected(menuItem)"
															class="transparent-2 elevation-0"
															transition="scale-transition"
															no-gutters
															@click.stop=""
														>
															<v-col
																v-for="(
																	menuItemExtra, index
																) in menuItem.extras"
																:key="index"
																class="pa-1"
															>
																<v-chip
																	@click="
																		parent.addMenuItemExtraToCartItem(
																			menuItem,
																			menuItemExtra
																		)
																	"
																	color="accent"
																	class="white--text"
																	small
																	dense
																>
																	{{ menuItemExtra.name }}
																	{{
																		parent.restaurant &&
																		parent.restaurant.currency
																			? parent.restaurant.currency.symbol
																			: defaultCurrencySign
																	}}{{ formatePrice(menuItemExtra.price) }}
																	<v-icon color="white">mdi-plus</v-icon>
																</v-chip>
															</v-col>
														</v-row>
													</v-expand-transition>
												</template>
											</v-card>
										</v-col>
									</template>
								</v-row>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</section>
		</v-col>
		<v-col
			v-if="parent.isFull"
			:cols="parent.isFull ? colSize(3, 3, 12, 12) : colSize(12, 12, 12, 12)"
			fill-height
			class="transparent-3"
		>
			<SectionCart :isFull="parent.isFull" :isEditable="true"></SectionCart>
		</v-col>
	</v-row>
</template>

<script>
	import SectionCart from "@/components/layouts/1/SectionCart.vue"

	export default {
		components: { SectionCart },
		mounted() {},
		props: {
			parent: { required: true },
		},
		async fetch() {},
		data: () => ({}),
		computed: {},
		watch: {
			"parent.menu.selectedSection"(newVal, oldVal) {
				console.log(newVal)
				console.log(this.parent.menus.sections[newVal].items)
			},
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	section.main-2 {
		height: auto;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: black;
			}
		}
	}
</style>
