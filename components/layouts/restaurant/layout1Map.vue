<template>
	<section class="main-4">
		<v-card flat title class="card-cont fill-height pa-0 overflow-hidden">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13876.186622547455!2d73.13796390205148!3d29.602329950517024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6a4c15626970d6ab!2sTop%20Dixie%20Chicken!5e0!3m2!1sen!2s!4v1620296155259!5m2!1sen!2s"
				width="100%"
				height="450"
				style="border: 0"
				class="pa-0"
				allowfullscreen="false"
				loading="lazy"
			></iframe>
		</v-card>
	</section>
</template>

<script>
	// import { mapState } from "vuex"

	export default {
		components: {},
		mounted() {},
		async fetch() {},
		data: () => ({}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	section.main-4 {
		height: auto;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: black;
			}
		}
	}
</style>
