<template>
	<DesktopCart
		v-if="
			$vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.mdAndDown && !isFull)
		"
		:parent="this"
	/>
	<MobileCart v-else :parent="this" />
</template>

<script>
	import { mapState } from "vuex"

	import DesktopCart from "@/components/layouts/1/desktop/Cart.vue"
	import MobileCart from "@/components/layouts/1/mobile/Cart.vue"

	export default {
		components: { DesktopCart, MobileCart },
		mounted() {},
		props: {
			isEditable: {
				required: true,
				type: Boolean,
				default: () => {
					return true
				},
			},
			isFull: {
				required: true,
				type: Boolean,
				default: () => {
					return true
				},
			},
		},
		async fetch() {},
		data: () => ({
			menu: {},
		}),
		computed: {
			...mapState({
				cartItems: (state) => {
					return state.cart.items
				},
				restaurant: (state) => {
					return state.restaurants.restaurant
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
			addItemToCart(item) {
				let itm = Object.assign({}, item)
				itm["extras"] = []
				this.$store.dispatch("cart/addItemToCart", itm)
			},
			removeCartItem(item) {
				this.$store.dispatch("cart/removeCartItem", item)
			},
			removeMenuItemExtraToCartItem(item, extra) {
				this.$store.dispatch("cart/removeMenuItemExtraToCartItem", {
					item,
					extra,
				})
			},
			itemExistsInCart(item) {
				let allItems = this.cartItems
				let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
				let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

				return addedItem
			},
		},
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
