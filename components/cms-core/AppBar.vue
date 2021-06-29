<template>
	<v-app-bar id="app-bar" height="75" absolute inset app flat>
		<v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
			<v-icon>mdi-dots-vertical</v-icon>
		</v-btn>

		<!-- <v-toolbar-title
      class="hidden-sm-and-down font-weight-light title text-uppercase"
      v-text="$route.name"
		/>-->

		<v-toolbar-title
			class="hidden-sm-and-down font-weight-light title text-uppercase"
			>{{
				$auth.loggedIn ? $auth.user.role.name : ""
			}}
			Dashboard</v-toolbar-title
		>

		<v-spacer />
		<!--
		<v-text-field
			:label="'Search'"
			color="secondary"
			hide-details
			outlined
			dense
			style="max-width: 200px"
		>
			<template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
				<v-btn class="mt-n2" elevation="1" fab small>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</template>
		</v-text-field> -->

		<v-menu
			bottom
			left
			offset-y
			origin="top right"
			transition="scale-transition"
		>
			<template v-slot:activator="{ attrs, on }">
				<v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
					<!-- <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
					</v-badge>-->
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-list class="pa-2">
				<!-- <v-list-item :to="user_profile_path">
					<v-list-item-avatar>
						<v-icon>mdi-account</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>Profile</v-list-item-title>
					</v-list-item-content>
				</v-list-item> -->
				<v-list-item :to="user_home_path">
					<v-list-item-avatar>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="$auth.logout()">
					<v-list-item-avatar>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
// Components

// Utilities
import { mapState, mapMutations } from "vuex"

export default {
	name: "DashboardCoreAppBar",

	components: {},

	props: {
		value: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		notifications: [
			"Mike John Responded to your email",
			"You have 5 new tasks",
			"You're now friends with Andrew",
			"Another Notification",
			"Another one",
		],
	}),

	computed: {
		...mapState(["drawer"]),
	},

	methods: {
		...mapMutations({
			setDrawer: "SET_DRAWER",
		}),
	},
}
</script>
