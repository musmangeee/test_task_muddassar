<template>
	<v-row no-gutters>
		<v-col :cols="12">
			<section class="main-2">
				<v-card flat title elevation="0" class="card-cont fill-height">
					<div class="full-height">
						<div class="d-flex d-row justify-space-between mb-4">
							<v-text-field
								v-model="parent.searchText"
								prepend-inner-icon="mdi-magnify"
								placeholder="Search"
								block
								rounded
								round
								color="accent"
								outlined
								dense
								clearable
								hide-details
								@keyup.esc="searchText = null"
							></v-text-field>
						</div>
						<!-- <v-divider></v-divider> -->
						<div class="d-flex d-row justify-space-between mb-4">
							<div>
								<h3>
									{{ parent.menus.sections[parent.menu.selectedSection].name }}
								</h3>
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
							<v-col class="tabs-list-cont" :cols="colSize(12, 12, 2, 4)">
								<v-tabs
									v-model="parent.menu.selectedSection"
									color="accent"
									show-arrows
									vertical
									grow
								>
									<v-tab
										v-for="(section, index) in parent.menus.sections"
										:key="index"
										dense
									>
										<div class="caption">
											{{ section.name }}
										</div>
									</v-tab>
								</v-tabs>
							</v-col>
							<v-col :cols="colSize(12, 12, 10, 8)">
								<div class="items-list-cont">
									<v-list dense three-line>
										<template v-for="(menuItem, i) in parent.filteredMenuItems">
											<v-list-item
												dense
												@click="
													parent.isMenuItemSelected(menuItem)
														? parent.unselectMenuItem()
														: parent.selectMenuItem(menuItem)
												"
												:key="i"
											>
												<v-list-item-avatar
													class="pa-0 ma-2 center-all-content"
													:size="$vuetify.breakpoint.smAndUp ? 60 : 50"
												>
													<v-img
														width="100%"
														height="100%"
														:alt="`${menuItem.name}`"
														:lazy-src="`https://via.placeholder.com/20x15.png?text=${menuItem.name}`"
														:src="
															menuItem.image
																? menuItem.image
																: `https://via.placeholder.com/200x150.png?text=${menuItem.name}`
														"
													></v-img>
												</v-list-item-avatar>

												<v-list-item-content>
													<v-list-item-title>{{
														menuItem.name
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														menuItem.description
													}}</v-list-item-subtitle>
													<div class="my-0 px-2">
														<div class="d-flex flex-row justify-space-between">
															<div class="subtitle-1 mt-1 font-weight-bold">
																{{
																	parent.restaurant &&
																	parent.restaurant.currency
																		? parent.restaurant.currency.symbol
																		: defaultCurrencySign
																}}{{ formatePrice(menuItem.price) }}
															</div>
														</div>
													</div>
												</v-list-item-content>

												<v-list-item-icon>
													<template
														v-if="parent.menuItemAddableIntoCart(menuItem)"
														@click.stop=""
													>
														<div
															class="d-flex"
															:class="
																$vuetify.breakpoint.smAndUp
																	? 'flex-row'
																	: 'flex-column-reverse justify-end mt-n4'
															"
															@click.stop=""
														>
															<div>
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
															</div>
															<div class="text-center px-2 my-1">
																{{
																	parent.itemExistsInCart(menuItem)
																		? parent.itemExistsInCart(menuItem).quantity
																		: ""
																}}
															</div>
															<div>
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
														</div>
													</template>
													<div v-else>
														<div class="pa-1 accent caption rounded">
															<small class="white--text">
																Sold <br />
																Out
															</small>
														</div>
													</div>
												</v-list-item-icon>
											</v-list-item>
											<div
												class="mt-2"
												:key="i + 'extra'"
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
															v-for="(menuItemExtra, index) in menuItem.extras"
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
																small
																dense
																rounded
															>
																<div
																	class="caption white--text font-weight-thin"
																>
																	{{ menuItemExtra.name }}
																	{{
																		parent.restaurant &&
																		parent.restaurant.currency
																			? parent.restaurant.currency.symbol
																			: defaultCurrencySign
																	}}{{ formatePrice(menuItemExtra.price) }}
																	<v-icon small color="white">mdi-plus</v-icon>
																</div>
															</v-chip>
														</v-col>
													</v-row>
												</v-expand-transition>
											</div>
											<v-divider
												:class="'mb-2 mt-1'"
												:key="i + 'div'"
												:inset="true"
											></v-divider>
										</template>
									</v-list>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</section>
		</v-col>
		<v-bottom-navigation fixed v-if="parent.cartItems.length && false">
		</v-bottom-navigation>
		<v-col :cols="12" fill-height class="transparent-3">
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
	.items-list-cont {
		height: auto;
		max-height: 80vh;
		overflow-y: auto;
		.v-list-item {
			padding: 0 2px 0 2px;
		}
	}

	.tabs-list-cont {
		.v-tabs {
			.v-tab {
				padding: 4px;
			}
		}
	}
</style>
