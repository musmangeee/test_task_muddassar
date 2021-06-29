<template>
	<v-dialog
		@click:outside="closeDialog(false)"
		:value="dialogModel"
		persistent
		:width="`${dialogWidth}px`"
	>
		<v-card flat elevation="0">
			<v-card-title class="transparent-2">
				<slot name="title"></slot>
				<v-spacer></v-spacer>
				<v-btn @click="closeDialog(false)" small icon class="error">
					<v-icon color="white">mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="py-0">
				<slot></slot>
			</v-card-text>
			<v-card-actions class="ma-0 transparent-2">
				<slot name="footer"></slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {
			dialogWidth: { required: false, type: Number, default: 700 },
			dialogModel: { required: true, type: Boolean },
		},
		data() {
			return {}
		},
		methods: {
			closeDialog(val = false) {
				this.$emit("closeDialog", val)
			},
		},
	}
</script>
