<template>
	<v-navigation-drawer
		id="core-navigation-drawer"
		v-model="drawer"
		:dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
		:expand-on-hover="expandOnHover"
		:right="$vuetify.rtl"
		:src="barImage"
		mobile-breakpoint="960"
		app
		width="260"
		v-bind="$attrs"
	>
		<template v-slot:img="props">
			<v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
		</template>

		<v-list dense nav>
			<v-list-item>
				<!-- <img src="/src/images/logo.png" width="130px;" alt srcset />
        &nbsp;&nbsp; -->
				<v-list-item-content small dense>
					<v-list-item-title class="subtitle-1" v-text="appName" />
				</v-list-item-content>
			</v-list-item>
			<!-- <v-divider class="mb-1" /> -->
			<!-- <v-list-item nuxt :to="this.user_profile_path">
				<v-icon>mdi-account</v-icon>&nbsp;&nbsp;
				<v-list-item-content>
					<v-list-item-title class="subtitle-1 white--text"
						>Profile</v-list-item-title
					>
				</v-list-item-content>
			</v-list-item> -->
		</v-list>
		<v-divider class="mb-1" />

		<v-list expand nav>
			<template v-for="(item, i) in computedItems">
				<v-list-group v-if="item.children" :key="`group-${i}`" :item="item">
					<v-list-item>{{ item }}</v-list-item>
				</v-list-group>
				<v-list-item nuxt :to="item.to" exact v-else :key="`item-${i}`">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="text-uppercase">
						{{ item.title }}
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-list>

		<template v-slot:append>
			<v-divider />
			<v-btn block class="transparent" @click="$auth.logout()">Logout</v-btn>
		</template>
	</v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex"

export default {
	name: "DashboardCoreDrawer",

	props: {
		expandOnHover: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({}),

	computed: {
		...mapState(["barColor", "barImage"]),
		drawer: {
			get() {
				return this.$store.state.drawer
			},
			set(val) {
				this.$store.commit("SET_DRAWER", val)
			},
		},
		computedItems() {
			return this.items.map(this.mapItem)
		},
		profile() {
			return this.$auth.user
		},
		items() {
			return this.$navigations.admin.filter((nav) => nav.inNav)
		},
	},

	methods: {
		mapItem(item) {
			return {
				...item,
				children: item.children ? item.children.map(this.mapItem) : undefined,
				title: item.title,
			}
		},
	},
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
        margin-right: 24px
        margin-left: 12px !important

        +rtl()
        margin-left: 24px
        margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
        padding-left: 8px

        +rtl()
        padding-right: 8px

      .v-list-group__header
        +ltr()
        padding-right: 0

        +rtl()
        padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
          margin-right: 8px

          +rtl()
          margin-left: 8px
</style>
