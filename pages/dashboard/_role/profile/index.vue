<template>
	<v-card>
		<v-card-title>
			<div>Profile</div>
		</v-card-title>
	</v-card>
</template>

<script>
	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Profile",
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
