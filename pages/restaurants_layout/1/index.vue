<template>
	<v-layout>
		<!-- main section -->
		<SectionMain></SectionMain>

		<!-- menu section -->
		<SectionMenu></SectionMenu>

		<!-- book table section -->
		<SectionBookATable></SectionBookATable>

		<!-- map section -->
		<SectionMap></SectionMap>

		<!-- footer section -->
		<SectionFooter></SectionFooter>
	</v-layout>
</template>

<script>
	import SectionMain from "~/components/layouts/1/SectionMain"
	import SectionMenu from "~/components/layouts/1/SectionMenu"
	import SectionBookATable from "~/components/layouts/1/SectionBookATable"
	import SectionFooter from "~/components/layouts/1/SectionFooter"
	import SectionMap from "~/components/layouts/1/SectionMap"
	export default {
		layout: "restaurant",
		head() {
			return {
				title: `Home - ${this.appName}`,
			}
		},
		components: {
			SectionFooter,
			SectionMap,
			SectionBookATable,
			SectionMenu,
			SectionMain,
		},
		mounted() {},
		asyncData: () => ({}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	.layout {
		flex-wrap: wrap;
	}
</style>
