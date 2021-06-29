// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  items: [],
})

export const mutations = {
  setCartItems(state, payload) {
    state.items = payload
  },
  setCartItemPush(state, payload) {
    state.items.push(payload)
  },
  setCartItemAdd(state, { index, item }) {
    state.items[index] = item
  },
  setCartItemRemove(state, payload) {
    state.items.splice(payload, 1)
  },
  setCartItemExtraPush(state, { itemIndex, extra }) {
    state.items[itemIndex].extras.push(extra)
  },
  setCartItemExtraRemove(state, { itemIndex, itemExtraIndex }) {
    state.items[itemIndex].extras.splice(itemExtraIndex, 1)
  },
}

export const getters = {
  getCartItems: (state) => state.items,
}

export const actions = {
  async addItemToCart({ commit, getters }, item) {
    let allItems = getters.getCartItems
    let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
    let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

    if (
      item.availableQuantity == 0 ||
      (Number.parseInt(item.availableQuantity) > 0 &&
        addedItem &&
        addedItem.quantity >= item.availableQuantity)
    ) {
      this.$toast.error("No more quantity available...")
      return false
    }

    if (addedItem) {
      let itm = Object.assign({}, addedItem)
      itm["quantity"] = addedItem.quantity + 1
      commit("setCartItemRemove", addedItemIndex)
      commit("setCartItemPush", itm)
    } else {
      let itm = Object.assign({}, item)
      itm["quantity"] = 1
      commit("setCartItemPush", itm)
    }

    this.$toast.success("Item added to the cart...")
  },
  async removeCartItem({ commit, getters }, item) {
    let allItems = getters.getCartItems
    let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
    let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

    if (addedItem && addedItem.quantity > 1) {
      let itm = Object.assign({}, addedItem)
      itm["quantity"] = addedItem.quantity - 1
      commit("setCartItemRemove", addedItemIndex)
      commit("setCartItemPush", itm)
    }

    if (addedItem && addedItem.quantity == 1) {
      let itm = Object.assign({}, addedItem)
      itm["quantity"] = addedItem.quantity - 1
      commit("setCartItemRemove", addedItemIndex)
    }

    this.$toast.error("Item removed from the cart...")
  },
  async addMenuItemExtraToCartItem({ commit, getters }, { item, extra }) {
    let allItems = getters.getCartItems
    let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
    let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

    if (addedItem) {
      let addedExtraIndex = addedItem.extras.findIndex(
        (ext) => ext.id == extra.id
      )
      let addedExtra =
        addedExtraIndex != -1
          ? Object.assign({}, addedItem.extras[addedExtraIndex])
          : null

      if (addedExtra) {
      } else {
        commit("setCartItemExtraPush", { itemIndex: addedItemIndex, extra })
        this.$toast.success("Item extra added to the cart...")
      }
    }
  },
  async removeMenuItemExtraToCartItem({ commit, getters }, { item, extra }) {
    let allItems = getters.getCartItems
    let addedItemIndex = allItems.findIndex((itm) => itm.id == item.id)
    let addedItem = addedItemIndex != -1 ? allItems[addedItemIndex] : null

    if (addedItem) {
      let addedExtraIndex = addedItem.extras.findIndex(
        (ext) => ext.id == extra.id
      )
      let addedExtra =
        addedExtraIndex != -1
          ? Object.assign({}, addedItem.extras[addedExtraIndex])
          : null

      if (addedExtra) {
        commit("setCartItemExtraRemove", {
          itemIndex: addedItemIndex,
          itemExtraIndex: addedExtraIndex,
        })
        this.$toast.error("Item extra removed from the cart...")
      } else {
      }
    }
  },
}
