<template>
	<!-- https://github.com/SeregPie/VuetifyImageInput -->
	<v-dialog
		:max-width="imageEditorDialogSize"
		v-model="imageEditorDialogInner"
		v-if="imageEditorDialog"
		persistent
	>
		<v-card>
			<v-card-title class="transparent-2">
				Upload New Image
				<v-spacer></v-spacer>
				<v-btn color="error" icon @click="closeDialog()"
					><v-icon>mdi-close</v-icon></v-btn
				>
			</v-card-title>
			<v-card-text class="pa-2 center-all-content">
				Image Size Should be {{ imageWidth }} x {{ imageHeight }}
			</v-card-text>
			<v-card-text class="pa-4 center-all-content">
				<v-image-input
					v-model="editedImage"
					:imageQuality="1"
					:imageHeight="imageHeight"
					:imageWidth="imageWidth"
					:imageFormat="imageFormat"
					fullHeight
					fullWidth
					:imageMinScaling="'contain'"
					:clearable="true"
				/>
			</v-card-text>
			<v-card-actions class="transparent-2">
				<v-btn color="accent" block outlined @click="editDone()">Done</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import VImageInput from "vuetify-image-input"
	import { dataType64toFile } from "~/helpers/functions"
	export default {
		components: {
			VImageInput,
		},
		props: {
			imageEditorDialog: {
				required: true,
			},
			imageEditorDialogSize: {
				required: false,
				default: () => {
					return "720px"
				},
			},
			imageHeight: {
				required: true,
			},
			imageWidth: {
				required: true,
			},
			imageFormat: {
				required: true,
			},
		},
		data() {
			return {
				imageEditorDialogInner: false,
				editedImage: null,
			}
		},
		watch: {
			imageEditorDialog(value) {
				this.openDialog(value)
			},
		},
		mounted() {
			this.openDialog(this.imageEditorDialog)
		},
		methods: {
			closeDialog() {
				this.editedImage = null
				this.imageEditorDialogInner = false
				this.$emit("close", true)
			},
			openDialog(value) {
				this.imageEditorDialogInner = value
			},
			editDone() {
				let image = {
					imageSrc: this.editedImage,
					imageFile: dataType64toFile(this.editedImage),
				}
				this.$emit("done", image)
				this.closeDialog()
			},
		},
	}
</script>

