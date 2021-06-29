<template>
	<div class="cart-container">
		<div class="cart pa-3">
			<div class="cart-title py-2">
				<h1 class="display-1 font-weight-black">My Order</h1>
			</div>
			<div class="cart-items-cont py-2">
				<v-list color="transparent" three-line>
					<template v-for="(item, index) in parent.cartItems">
						<v-list-item class="px-0" :key="item.name">
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
											{{
												parent.restaurant && parent.restaurant.currency
													? parent.restaurant.currency.symbol
													: defaultCurrencySign
											}}{{ formatePrice(item.price) }}
											<small> /Portion </small>
										</b>
									</div>
									<v-spacer></v-spacer>

									<div class="py-2 px-2">
										{{
											parent.restaurant && parent.restaurant.currency
												? parent.restaurant.currency.symbol
												: defaultCurrencySign
										}}{{ formatePrice(parent.getCartItemTotal(item)) }}
									</div>

									<div class="d-flex flex-row">
										<v-btn
											v-if="parent.isEditable && parent.itemExistsInCart(item)"
											@click="parent.removeCartItem(item)"
											style="border-radius: 5px"
											small
											icon
											class="accent"
										>
											<v-icon color="white">mdi-minus</v-icon>
										</v-btn>
										<div class="pa-2">
											<small>
												<template v-if="!parent.isEditable"> QTY: </template>
												{{ item.quantity }}
											</small>
										</div>
										<v-btn
											v-if="parent.isEditable"
											@click="parent.addItemToCart(item)"
											style="border-radius: 5px"
											small
											icon
											class="accent"
										>
											<v-icon color="white">mdi-plus</v-icon>
										</v-btn>
									</div>
								</div>
								<v-row no-gutters v-if="item.extras">
									<v-col
										class="pa-1"
										v-for="(extra, i) in item.extras"
										:key="i"
									>
										<v-chip
											color="accent"
											class="white--text"
											@click:close="
												parent.removeMenuItemExtraToCartItem(item, extra)
											"
											small
											dense
											:close="parent.isEditable"
										>
											{{ extra.name }}
											&nbsp;{{
												parent.restaurant && parent.restaurant.currency
													? parent.restaurant.currency.symbol
													: defaultCurrencySign
											}}{{ formatePrice(extra.price) }}
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
					<div>
						<div class="d-flex d-row justify-space-between my-2">
							<div>
								<h3>Total</h3>
							</div>
							<div>
								{{
									parent.restaurant && parent.restaurant.currency
										? parent.restaurant.currency.symbol
										: defaultCurrencySign
								}}{{ formatePrice(parent.getCartItemsTotal) }}
							</div>
						</div>
						<v-btn
							v-if="parent.isEditable"
							:disabled="parent.getCartItemsTotal == 0"
							:to="{ name: 'restaurants_layout-1-login' }"
							nuxt
							color="accent"
							class="white--text"
							block
						>
							Checkout
						</v-btn>
					</div>
				</client-only>
			</div>
			<v-row v-if="!parent.isEditable">
				<v-col cols="12">
					<v-textarea
						rows="3"
						outlined
						label="Notes for chief"
						value=""
					></v-textarea>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		mounted() {},
		props: {
			parent: { required: true },
		},
		async fetch() {},
		data: () => ({
			menu: {},
		}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	.cart-container {
		.cart {
			position: sticky;
			display: flex;
			flex-direction: column;
			left: 0;
			top: 0;
			overflow: hidden;
			height: auto;
			max-height: 100vh;
			z-index: 9;
			.cart-title {
				height: auto;
			}
			.cart-items-cont {
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
