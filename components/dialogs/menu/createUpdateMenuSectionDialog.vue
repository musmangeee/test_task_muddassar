<template>
	<DialogBase
		:dialogWidth="800"
		:dialogModel="dialogModel"
		@closeDialog="(val) => closeDialog(val)"
	>
		<template v-slot:title
			>{{ selectedModel ? "Update" : "Create" }} Menu Section</template
		>
		<v-form v-model="isValidForm" @submit.prevent ref="from">
			<FormCreator :schema="form_structure" :model="form_data"></FormCreator>
		</v-form>

		<v-btn color="primary" outlined block @click="submit()">{{
			selectedModel ? "Update" : "Create"
		}}</v-btn>
	</DialogBase>
</template>

<script>
	import { mapState } from "vuex"
	import { required, validEmail, minLen } from "~/helpers/validationRules.js"
	import { formFieldsBasicLayout } from "~/helpers/functions.js"
	import FormCreator from "~/components/global/FormCreator"
	import DialogBase from "@/components/dialogs/Base"
	export default {
		components: { DialogBase, FormCreator },
		props: {
			dialogModel: { required: true, type: Boolean },
			selectedModel: { required: true, default: null },
			parent: { required: true, default: null },
		},
		data() {
			return {
				isValidForm: false,
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
				selectedMenu: (state) => {
					return state.menus.selectedMenu
				},
			}),

			form_structure() {
				return {
					name: {
						name: "name",
						type: "text",
						label: "Name",
						...formFieldsBasicLayout,
						rules: [required("Menu Section Name is required."), minLen(2)],
					},
					// description: {
					// 	name: "description",
					// 	type: "text",
					// 	label: "Description",
					// 	...formFieldsBasicLayout,
					// 	rules: [required("Menu description is required."), minLen(2)],
					// },
				}
			},
		},
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

				this.form_data["restaurantId"] = this.selectedRestaurant.id
				this.form_data["menuId"] = this.selectedMenu?.id

				let data = {
					restaurantId: this.selectedRestaurant.id,
					menuId: this.selectedMenu?.id,
					sectionId: this.selectedModel?.id,
					payload: this.form_data,
				}

				if (this.selectedModel) {
					return await this.$store
						.dispatch("menus/updateSection", data)
						.then((res) => {
							if (res.status === 200) {
								this.$toast.success("Menu Section Updated...")
								this.$emit("created", res.data)
							}
						})
				}

				return await this.$store
					.dispatch("menus/createSection", data)
					.then((res) => {
						if (res.status === 200) {
							this.$toast.success("Menu Section Created...")
							this.$emit("created", res.data)
						}
					})
			},
		},
	}
</script>
