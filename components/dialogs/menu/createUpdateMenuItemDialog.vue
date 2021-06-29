<template>
	<DialogBase
		:dialogWidth="800"
		:dialogModel="dialogModel"
		@closeDialog="(val) => closeDialog(val)"
	>
		<template v-slot:title>
			{{ selectedModel ? "Update" : "Create" }} Menu Item</template
		>
		<v-form v-model="isValidForm" @submit.prevent ref="from">
			<FormCreator
				:schema="form_structure"
				:model="form_data"
				@click="handleFormInputClick"
			></FormCreator>
			<ImageUploadBtn
				@done="(image) => (editedImage = image)"
				:imageHeight="170"
				:imageWidth="290"
			></ImageUploadBtn>
		</v-form>

		<v-btn color="accent" outlined block @click="submit()">{{
			selectedModel ? "Update" : "Create"
		}}</v-btn>
	</DialogBase>
</template>

<script>
	import { mapState } from "vuex"
	import {
		required,
		numberWith2DecimalPoints,
		minLen,
		maxLen,
	} from "~/helpers/validationRules.js"
	import {
		formFieldsBasicLayout,
		pluck,
		jsonToFormData,
		changeInputFormatToCurrency,
	} from "~/helpers/functions.js"
	import FormCreator from "~/components/global/FormCreator"
	import DialogBase from "@/components/dialogs/Base"
	import ImageUploadBtn from "@/components/btns/ImageUploadBtn"
	export default {
		components: { DialogBase, FormCreator, ImageUploadBtn },
		props: {
			dialogModel: { required: true, type: Boolean },
			selectedModel: { required: true, default: null },
			parent: { required: true, default: null },
		},
		data() {
			return {
				isValidForm: false,
				imageEditorDialog: false,
				editedImage: null,
				form_data: {},
			}
		},
		computed: {
			...mapState({
				selectedRestaurant: (state) => {
					return state.restaurants.selectedRestaurant
				},
				menuList: (state) => {
					return state.menus.list
				},
				sectionsList: (state) => {
					return state.menus.sectionsList
				},
				extrasList: (state) => {
					return state.menus.extrasList
				},
				selectedMenu: (state) => {
					return state.menus.selectedMenu
				},
			}),

			form_structure() {
				return {
					isFavourite: {
						name: "IsFavourite",
						type: "checkbox",
						falseValue: false,
						trueValue: true,
						label: `Is Favourite: ${this.form_data.isFavourite ? "Yes" : "No"}`,
						...formFieldsBasicLayout,
						rules: [],
					},
					name: {
						name: "name",
						type: "text",
						label: "Name",
						...formFieldsBasicLayout,
						rules: [required("Menu Item Name is required."), minLen(2)],
					},
					price: {
						name: "price",
						type: "text",
						ext: "number",
						label: "Price",
						prefix:
							this.selectedRestaurant?.currency?.symbol ||
							this.defaultCurrencySign,
						...formFieldsBasicLayout,
						// toCtrl: changeInputFormatToCurrency,
						rules: [
							required("Menu Item Price is required."),
							numberWith2DecimalPoints(),
						],
					},
					availableQuantity: {
						name: "availableQuantity",
						type: "number",
						label: "Available Quantity",
						prependInnerIcon: "mdi-weight",
						...formFieldsBasicLayout,
						rules: [],
					},
					sections: {
						name: "sections",
						label: "Sections",
						type: "select",
						itemText: "name",
						itemValue: "id",
						items: this.sectionsList,
						appendOuterIcon: "mdi-pencil",
						multiple: true,
						returnObject: true,
						...formFieldsBasicLayout,
						rules: [],
					},
					extras: {
						name: "extras",
						label: "Extras",
						type: "select",
						itemText: "name",
						itemValue: "id",
						items: this.extrasList,
						appendOuterIcon: "mdi-pencil",
						multiple: true,
						returnObject: true,
						...formFieldsBasicLayout,
						rules: [],
					},
					// imageFile: {
					// 	name: "imageFile",
					// 	type: "file",
					// 	label: "Image",
					// 	showSize: true,
					// 	multiple: false,
					// 	accept: "image/*",
					// 	...formFieldsBasicLayout,
					// 	rules: [],
					// },
					description: {
						name: "description",
						type: "text",
						label: "Description",
						...formFieldsBasicLayout,
						rules: [
							required("Menu description is required."),
							minLen(2),
							maxLen(75),
						],
					},
				}
			},
		},
		watch: {},
		mounted() {
			if (this.selectedModel) {
				this.form_data = Object.assign({}, this.selectedModel)
			}
		},
		methods: {
			closeDialog(val = false) {
				this.$emit("closeDialog", val)
			},
			async submit() {
				this.$refs.from.validate()
				if (!this.isValidForm) return

				let selectedModelSectionIds = this.selectedModel?.sections?.length
					? pluck("id", this.selectedModel.sections)
					: []
				let selectedModelExtraIds = this.selectedModel?.extras?.length
					? pluck("id", this.selectedModel.extras)
					: []

				this.form_data["restaurantId"] = this.selectedRestaurant.id
				this.form_data["menuId"] = this.selectedMenu?.id
				this.form_data["sections"] = this.form_data?.sections?.length
					? selectedModelSectionIds.length
						? pluck("id", this.form_data.sections)
						: pluck("id", this.form_data.sections)
					: []
				this.form_data["extras"] = this.form_data?.extras?.length
					? selectedModelExtraIds.length
						? pluck("id", this.form_data.extras)
						: pluck("id", this.form_data.extras)
					: []

				this.form_data["imageFile"] = this.editedImage?.imageFile
					? this.editedImage.imageFile
					: null

				let data = {
					restaurantId: this.selectedRestaurant.id,
					menuId: this.selectedMenu?.id,
					itemId: this.selectedModel?.id,
					payload: jsonToFormData(this.form_data),
				}

				// console.log(data)

				if (this.selectedModel) {
					return await this.$store
						.dispatch("menus/updateItem", data)
						.then((res) => {
							if (res.status === 200) {
								this.$toast.success("Menu Item Updated...")
								this.$emit("created", res.data)
							}
						})
						.catch(() => {
							this.closeDialog()
						})
				}

				return await this.$store
					.dispatch("menus/createItem", data)
					.then((res) => {
						if (res.status === 200) {
							this.$toast.success("Menu Item Created...")
							this.$emit("created", res.data)
						}
					})
					.catch(() => {
						this.closeDialog()
					})
			},
			handleFormInputClick({
				on,
				id,
				key,
				value,
				params,
				obj,
				data,
				schema,
				parent,
				index,
				event,
			}) {
				// console.log(on + "," + id + "," + key + "," + params.tag)
				if (
					on + "," + id + "," + key + "," + params.tag ==
					"click,form-base,sections,append-outer"
				) {
					this.parent.showCreateUpdateMenuSectionDialog()
				}
				if (
					on + "," + id + "," + key + "," + params.tag ==
					"click,form-base,extras,append-outer"
				) {
					this.parent.showCreateUpdateMenuExtraDialog()
				}
			},
		},
	}
</script>
