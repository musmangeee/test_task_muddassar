<template>
	<div class="d-flex" style="width: 100%">
		<div class="d-flex flex-row px-2 pb-6" style="width: 100%">
			<div class="center-all-content">
				<v-btn
					small
					dense
					@click="imageEditorDialog = true"
					color="primary"
					outlined
					block
					>{{ btnText || "Upload New Image" }}</v-btn
				>
			</div>

			<template v-if="editedImage && editedImage.imageSrc">
				<div class="center-all-content">
					<div style="max-width: 150px">
						<v-img
							width="100%"
							height="100%"
							:src="editedImage.imageSrc"
						></v-img>
					</div>
				</div>
			</template>

			<template v-if="editedImage && editedImage.imageSrc">
				<div class="center-all-content" style="max-width: 50px">
					<v-btn color="error" icon @click="removeImage()">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
			</template>
		</div>

		<ImageEditor
			@close="imageEditorDialog = false"
			@done="imageEditDone"
			:imageEditorDialogSize="imageEditorDialogSize"
			:imageEditorDialog="imageEditorDialog"
			:imageHeight="imageHeight"
			:imageWidth="imageWidth"
			:imageFormat="'png'"
		></ImageEditor>
	</div>
</template>

<script>
	import ImageEditor from "@/components/general/ImageEditor"
	export default {
		components: { ImageEditor },
		props: {
			btnText: {
				required: false,
			},
			imageHeight: {
				required: true,
			},
			imageWidth: {
				required: true,
			},
			imageEditorDialogSize: {
				required: false,
				default: () => {
					return "720px"
				},
			},
		},
		data() {
			return {
				editedImage: null,
				imageEditorDialog: false,
			}
		},
		watch: {},
		methods: {
			imageEditDone(image) {
				this.editedImage = image
				this.$emit("done", image)
			},
			removeImage() {
				this.editedImage = null
				this.$emit("done", null)
			},
		},
	}
</script>

<style>
</style>
