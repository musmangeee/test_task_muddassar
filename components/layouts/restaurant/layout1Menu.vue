<template>
	<v-row no-gutters>
		<v-col :cols="isFull ? colSize(9, 9, 12, 12) : colSize(12, 12, 12, 12)">
			<section class="main-2">
				<v-card
					flat
					title
					elevation="0"
					class="card-cont fill-height py-6"
					:class="isFull ? 'px-6 ' : 'px-12'"
				>
					<div class="container full-height">
						<div class="d-flex d-row justify-space-between mb-4">
							<div>
								<h1 class="display-1 font-weight-black">Our Menu</h1>
							</div>
							<div>
								<v-text-field
									prepend-inner-icon="mdi-magnify"
									placeholder="Search"
									outlined
									dense
									hide-details
								></v-text-field>
							</div>
						</div>
						<v-row class="mb-2">
							<v-col
								:cols="
									isFull ? colSize(12, 12, 12, 12) : colSize(10, 10, 12, 12)
								"
							>
								<v-tabs
									v-model="menu.selectedSection"
									color="accent"
									show-arrows
									grow
									left
								>
									<v-tab v-for="item in menu.sections" :key="item">
										<h4>
											{{ item }}
										</h4>
									</v-tab>
								</v-tabs>
								<v-divider></v-divider>
							</v-col>
							<v-col v-if="!isFull" :cols="colSize(2, 2, 12, 12)">
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
									{{ menu.sections[menu.selectedSection] }}
								</h1>
							</div>
							<div>
								<v-menu color="transparent" bottom :offset-y="true">
									<template v-slot:activator="{ on, attrs }">
										<v-btn text dark v-bind="attrs" v-on="on">
											{{ menu.selectedFilter }}
											<v-icon> mdi-menu-down </v-icon>
										</v-btn>
									</template>

									<v-list>
										<v-list-item
											@click="menu.selectedFilter = item"
											v-for="(item, index) in menu.filters"
											:key="index"
										>
											<v-list-item-title>{{ item }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
						</div>
						<v-row no-gutters>
							<v-col>
								<v-tabs-items v-model="menu.selectedSection">
									<v-tab-item v-for="item in menu.sections" :key="item.name">
										<v-row>
											<template v-for="(menuItem, i) in menuItems">
												<v-col
													:cols="
														isFull ? colSize(4, 4, 6, 12) : colSize(3, 4, 6, 12)
													"
													:key="i"
												>
													<v-card
														elevation="0"
														width="100%"
														color="transparent-1"
													>
														<v-img
															width="100%"
															height="170px"
															aspect-ratio="1"
															:src="`https://picsum.photos/id/${
																i + 1 * 37 + 10
															}/200/150`"
															:lazy-src="`https://picsum.photos/id/${
																i + 1 * 37 + 10
															}/10/6`"
															@click="addItemToCart(menuItem)"
														/>
														<div class="my-0">
															<h1
																class="subtitle-1 font-weight-bold"
																@click="addItemToCart(menuItem)"
															>
																{{ menuItem.name }}
															</h1>
															<h2
																class="my-1 text-caption"
																@click="addItemToCart(menuItem)"
															>
																Lorem ipsum dolor sit amet consectetur
																adipisicing elit. Aliquid nam officia expedita.
															</h2>
															<div
																class="d-flex flex-row justify-space-between"
															>
																<div class="subtitle-1 mt-1 font-weight-bold">
																	€{{ formatePrice(menuItem.price) }}
																</div>
																<div>
																	<v-btn
																		v-if="itemExistsInCart(menuItem)"
																		@click="removeCartItem(menuItem)"
																		style="border-radius: 5px"
																		small
																		icon
																		class="accent"
																	>
																		<v-icon color="white">mdi-minus</v-icon>
																	</v-btn>
																	{{
																		itemExistsInCart(menuItem)
																			? itemExistsInCart(menuItem).quantity
																			: ""
																	}}
																	<v-btn
																		@click="addItemToCart(menuItem)"
																		style="border-radius: 5px"
																		small
																		icon
																		class="accent"
																	>
																		<v-icon color="white">mdi-plus</v-icon>
																	</v-btn>
																</div>
															</div>
														</div>
													</v-card>
												</v-col>
											</template>
										</v-row>
									</v-tab-item>
								</v-tabs-items>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</section>
		</v-col>
		<v-col
			v-if="isFull"
			:cols="isFull ? colSize(3, 3, 12, 12) : colSize(12, 12, 12, 12)"
			fill-height
			class="cart-container transparent-3"
		>
			<div class="cart pa-3">
				<div class="cart-title py-2">
					<h1 class="display-1 font-weight-black">My Order</h1>
				</div>
				<div class="cart-items-cont py-2">
					<v-list color="transparent" three-line>
						<template v-for="(item, index) in cartItems">
							<v-list-item :key="item.name">
								<!-- <v-list-item-avatar>
										<v-img :src="item.avatar"></v-img>
									</v-list-item-avatar> -->

								<v-list-item-content>
									<v-list-item-title class="py-1 mb-2">
										<b>{{ item.name }}</b>
									</v-list-item-title>
									<div class="d-flex flex-row">
										<div class="py-2">
											<b>
												£{{ formatePrice(item.price) }}
												<small> /Portion </small>
											</b>
										</div>
										<v-spacer></v-spacer>
										<div class="d-flex flex-row">
											<v-btn
												v-if="itemExistsInCart(item)"
												@click="removeCartItem(item)"
												style="border-radius: 5px"
												small
												icon
												class="accent"
											>
												<v-icon color="white">mdi-minus</v-icon>
											</v-btn>
											<v-btn style="border-radius: 5px" small icon>
												{{ item.quantity }}
											</v-btn>
											<v-btn
												@click="addItemToCart(item)"
												style="border-radius: 5px"
												small
												icon
												class="accent"
											>
												<v-icon color="white">mdi-plus</v-icon>
											</v-btn>
										</div>
										<div class="py-2 px-2">£{{ getCartItemTotal(item) }}</div>
									</div>
									<v-row v-if="item.extras">
										<v-col>
											<v-chip
												color="accent"
												class="white--text"
												v-for="(extra, i) in item.extras"
												:key="i"
												small
												dense
												close
											>
												{{ extra.name }}
												&nbsp;£{{ formatePrice(extra.price) }}
											</v-chip>
										</v-col>
									</v-row>
								</v-list-item-content>
							</v-list-item>

							<v-divider :key="index" :inset="false"></v-divider>
						</template>
					</v-list>
				</div>
				<div class="cart-footer py-2">
					<client-only>
						<div style="d-flex d-column pa-6">
							<div class="d-flex d-row justify-space-between">
								<div>
									<h3>Total</h3>
								</div>
								<div>£{{ getCartItemsTotal }}</div>
							</div>
							<v-btn
								color="accent"
								class="white--text"
								block
								@click="sendToAndroid()"
							>
								Checkout
							</v-btn>
						</div>
					</client-only>
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script>
	import { mapState } from "vuex"

	export default {
		components: {},
		mounted() {},
		props: {
			isFull: { required: false, type: Boolean, default: false },
		},
		async fetch() {},
		data: () => ({
			menu: {
				selectedSection: 0,
				selectedFilter: "Most Popular",
				sections: ["Burger", "Pizza", "Salad", "Drink", "Grill", "Dessert"],
				filters: ["Most Popular", "Hot Offers"],
			},
		}),
		computed: {
			...mapState({
				menuItems: (state) => {
					return state.menus.menu.items
				},
				cartItems: (state) => {
					return state.cart.items
				},
			}),
			getCartItemsTotal() {
				let cartItems = this.cartItems

				let cartTotal = cartItems.reduce((total, item) => {
					let extrasTotal = 0
					if (item?.extras?.length)
						extrasTotal = item.extras.reduce((total, extra) => {
							return total + Math.round(extra.price)
						}, 0)
					return total + Math.round(item.quantity * item.price) + extrasTotal
				}, 0)

				return cartTotal
			},
		},
		methods: {
			getCartItemTotal(item) {
				let total = item.quantity * item.price
				let extrasTotal = 0
				if (item?.extras?.length)
					extrasTotal = item.extras.reduce((total, extra) => {
						return total + Math.round(extra.price)
					}, 0)
				return total + extrasTotal
			},
			itemExistsInCart(item) {
				let allItems = this.cartItems
				let addedItemIndex = allItems.findIndex((itm) => itm.name == item.name)
				let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

				return addedItem
			},
			addItemToCart(item) {
				this.$store.dispatch("cart/addItemToCart", item)
				const userAgent = navigator.userAgent.toLowerCase()
				const isAndroid = userAgent.indexOf("android") > -1

				if (isAndroid) {
					Android.addCart(JSON.stringify(this.cartItems))
				} else {
					console.log("addCart, Not Android >>> ", JSON.stringify(this.cartItems)) // remove later
				}
			},
			removeCartItem(item) {
				this.$store.dispatch("cart/removeCartItem", item)
				const userAgent = navigator.userAgent.toLowerCase()
				const isAndroid = userAgent.indexOf("android") > -1

				if (isAndroid) {
					Android.removeCart(JSON.stringify(this.cartItems))
				} else {
					console.log(
						"removeCart, Not Android >>> ",
						JSON.stringify(this.cartItems)
					) // remove later
				}
			},
			sendToAndroid() {
				const userAgent = navigator.userAgent.toLowerCase()
				const isAndroid = userAgent.indexOf("android") > -1
				console.log("isAndroid>>>> ", isAndroid)
				if (isAndroid) {
					Android.checkout(JSON.stringify(this.cartItems))
				} else {
					console.log(
						"checkout, Not Android >>> ",
						JSON.stringify(this.cartItems)
					) // remove later
				}
			},
		},
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

	.cart-container {
		.cart {
			position: sticky;
			display: flex;
			flex-direction: column;
			left: 0;
			top: 0;
			overflow: hidden;
			height: 100vh;
			z-index: 9;
			.cart-title {
				width: 100%;
				height: auto;
			}
			.cart-items-cont {
				height: 100%;
				max-height: calc(100vh - 120px);
				overflow-y: auto;
				overflow-x: hidden;
			}
			.cart-footer {
				height: auto;
			}
		}
	}
</style>
