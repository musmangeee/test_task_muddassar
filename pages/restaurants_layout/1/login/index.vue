<template>
	<v-layout>
		<!-- main section -->
		<section class="main-1">
			<v-card flat title class="card-cont fill-height">
				<div class="image-cont">
					<div
						:style="`background-image: url(${require('@/static/src/images/bg/main-1.jpg')})`"
						class="image-1"
					></div>
				</div>
			</v-card>
		</section>

		<!-- menu section -->
		<SectionLogin></SectionLogin>

		<!-- footer section -->
		<SectionFooter></SectionFooter>
	</v-layout>
</template>

<script>
	import SectionLogin from "~/components/layouts/1/SectionLogin"
	import SectionFooter from "~/components/layouts/1/SectionFooter"

	export default {
		layout: "restaurant",
		head() {
			return {
				title: `Home - ${this.appName}`,
			}
		},
		components: { SectionLogin, SectionFooter },
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
	section.main-1 {
		height: 100%;
		max-height: 64px;
		min-height: 64px;
		.card-cont {
			background-color: black;
			* {
				color: white;
			}
		}
	}
</style>
