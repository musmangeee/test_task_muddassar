<template>
	<v-app
		style="
			background-image: url('./src/images/bg-registration-form-2.jpg');
			background-size: 100% 100%;
		"
	>
		<v-row class="ma-0" justify="center" align="center" fill-height>
			<v-col cols="12">
				<v-container fluid>
					<div class="d-flex justify-center flex-row">
						<nuxt></nuxt>
					</div>
				</v-container>
			</v-col>
			<v-col cols="12" class="text-center">
				Copyright © {{ appName }}
				{{ new Date().getFullYear() }}
			</v-col>
		</v-row>
	</v-app>
</template>

<script>
export default {
	components: {},
	middleware: ["guest"],
	data: () => ({}),
}
</script>
