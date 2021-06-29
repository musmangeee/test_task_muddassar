<template>
	<v-app>
		<dashboard-core-app-bar />

		<dashboard-core-drawer />

		<v-main app>
			<v-container fluid align-stretch class="py-8 px-6">
				<div style="width: 100%">
					<nuxt />
				</div>
			</v-container>
		</v-main>
		<dashboard-core-footer />
		<idleController></idleController>
	</v-app>
</template>

<script>
	import DashboardCoreAppBar from "~/components/cms-core/AppBar"
	import DashboardCoreDrawer from "~/components/cms-core/Drawer"
	import DashboardCoreFooter from "~/components/cms-core/Footer"
	import idleController from "~/components/general/idleController"
	export default {
		// middleware: ["auth"],
		components: {
			DashboardCoreAppBar,
			DashboardCoreDrawer,
			DashboardCoreFooter,
			idleController,
		},
		data: () => ({
			expandOnHover: false,
		}),
		head() {
			return {
				script: [
					// {
					// 	type: "text/javascript",
					// 	src:
					// 		"https://www.paypal.com/sdk/js?client-id=AacObKcw0koI1sDtQB87gmWh5Y2qW7_VNaOcJ_CRTD9zPjy3xFa0SsXICmIHno-ukFsh-DZloUElZnCe&vault=true&intent=subscription",
					// 	body: false,
					// 	"data-sdk-integration-source": "button-factory",
					// },
				],
			}
		},
	}
</script>

<style lang="scss">
</style>
