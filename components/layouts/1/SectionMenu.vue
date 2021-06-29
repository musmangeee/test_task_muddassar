<template>
	<v-container fluid>
		<template
			v-if="
				$vuetify.breakpoint.mdAndUp ||
				($vuetify.breakpoint.mdAndDown && !isFull)
			"
		>
			<DesktopMenu :parent="this" />
		</template>
		<template v-else>
			<MobileMenu :parent="this" />
		</template>
	</v-container>
</template>

<script>
	import { mapState } from "vuex"
	import DesktopMenu from "@/components/layouts/1/desktop/Menu.vue"
	import MobileMenu from "@/components/layouts/1/mobile/Menu.vue"

	export default {
		components: { DesktopMenu, MobileMenu },
		mounted() {},
		props: {
			isFull: { required: false, type: Boolean, default: false },
		},
		async fetch() {},
		data: () => ({
			searchText: null,
			menu: {
				selectedItem: null,
				selectedSection: 0,
				selectedFilter: "Most Popular",
				filters: ["Most Popular", "Hot Offers"],
			},
		}),
		computed: {
			...mapState({
				menus: (state) => {
					return state.menus.menus && state.menus.menus.length
						? state.menus.menus[0]
						: []
				},
				menuItems: (state) => {
					return state.menus.menu.items
				},
				cartItems: (state) => {
					return state.cart.items
				},
				restaurant: (state) => {
					return state?.restaurants?.restaurant
				},
			}),
			filteredMenuItems() {
				let sectionItems = this.menus.sections[this.menu.selectedSection].items
				if (![null, ""].includes(this.searchText)) {
					sectionItems = sectionItems.filter((itm) => {
						if (!itm) {
							return false
						}

						let dataToFindIn = JSON.stringify([itm.name, itm.price]).toLowerCase()
						return dataToFindIn.includes(this.searchText.toLowerCase())
					})
				}
				return sectionItems
			},
		},
		methods: {
			menuItemAddableIntoCart(item) {
				if (Number.parseInt(item.availableQuantity) < 0) return true
				let itemInCart = this.itemExistsInCart(item)
				let isCartQuantityLessThenEqualAvailableQuantity = true

				// if (itemInCart) {
				// 	isCartQuantityLessThenEqualAvailableQuantity =
				// 		itemInCart.quantity < item.availableQuantity
				// }
				return (
					item?.availableQuantity &&
					Number.parseInt(item.availableQuantity) > 0 &&
					isCartQuantityLessThenEqualAvailableQuantity
				)
			},
			addItemToCart(item) {
				if (item?.extras?.length) this.selectMenuItem(item)
				let itm = Object.assign({}, item)
				itm["extras"] = []
				this.$store.dispatch("cart/addItemToCart", itm)

				if (this.isFull == false) this.$router.push("/restaurants_layout/1/menu")
			},
			addMenuItemExtraToCartItem(item, extra) {
				if (extra.availableQuantity < 1 || extra.availableQuantity < 0) {
					this.$toast.error("Item extra quantity not available...")
					return false
				}
				if (item?.extras?.length) this.selectMenuItem(item)
				let itm = Object.assign({}, item)
				itm["extras"] = []
				this.$store.dispatch("cart/addMenuItemExtraToCartItem", {
					item: itm,
					extra,
				})
			},
			removeMenuItemExtraToCartItem(item, extra) {
				this.$store.dispatch("cart/removeMenuItemExtraToCartItem", {
					item,
					extra,
				})
			},
			removeCartItem(item) {
				this.$store.dispatch("cart/removeCartItem", item)
			},
			itemExistsInCart(item) {
				let allItems = this.cartItems
				let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
				let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

				return addedItem
			},
			isMenuItemSelected(item) {
				return this.menu.selectedItem && this.menu.selectedItem.id == item.id
					? this.menu.selectedItem
					: null
			},
			selectMenuItem(item) {
				if (this.isMenuItemSelected(item)) this.unselectMenuItem()
				this.menu.selectedItem = Object.assign({}, item)
			},
			unselectMenuItem() {
				this.menu.selectedItem = null
			},
		},
	}
</script>

<style lang="scss" scoped>
</style>
