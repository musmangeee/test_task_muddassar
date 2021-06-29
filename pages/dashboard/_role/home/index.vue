<template>
	<HomeComponent />
</template>

<script>
	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Home",
			}
		},
		components: {
			HomeComponent: () => import("~/components/pages/admin/homeComponent"),
		},
		mounted() {},
		data: () => ({}),
		computed: {},
		methods: {},
	}
</script>
