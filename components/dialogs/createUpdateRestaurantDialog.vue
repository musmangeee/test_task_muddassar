<template>
	<DialogBase
		:dialogWidth="800"
		:dialogModel="dialogModel"
		@closeDialog="(val) => closeDialog(val)"
	>
		<template v-slot:title
			>{{ selectedModel ? "Update" : "Create" }} Restaurant</template
		>
		<v-form
			id="registration-form"
			@submit.prevent
			v-model="isValidForm"
			ref="from"
		>
			<FormCreator :schema="form_structure" :model="form_data"></FormCreator>

			<v-card class="mt-0 mb-0 mx-2" outlined flat elevation="0">
				<v-card-title class="transparent-2">
					Social Links
					<v-spacer></v-spacer>
					<v-btn
						icon
						outlined
						@click="
							socialLinksForm
								? (socialLinksForm = false)
								: (socialLinksForm = true)
						"
						:color="socialLinksForm ? 'accent' : 'primary'"
					>
						<v-icon>
							{{ !socialLinksForm ? "mdi-menu-down" : "mdi-menu-up" }}
						</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text v-if="socialLinksForm">
					<FormCreator
						:schema="socialLinks_form_structure"
						:model="form_data"
					></FormCreator>
				</v-card-text>
			</v-card>
			<v-card class="mt-6 mb-0 mx-2" outlined flat elevation="0">
				<v-card-title class="transparent-2">
					Work Time
					<v-spacer></v-spacer>
					<v-btn
						icon
						outlined
						@click="
							workTimeForm ? (workTimeForm = false) : (workTimeForm = true)
						"
						:color="workTimeForm ? 'accent' : 'primary'"
					>
						<v-icon>
							{{ !workTimeForm ? "mdi-menu-down" : "mdi-menu-up" }}
						</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text v-if="workTimeForm">
					<FormCreator
						:schema="workTime_form_structure"
						:model="form_data"
					></FormCreator>
				</v-card-text>
			</v-card>

			<div class="d-flex mt-6">
				<ImageUploadBtn
					@done="(image) => (editedLogoImage = image)"
					:btnText="'Logo Image'"
					:imageWidth="128"
					:imageHeight="64"
				></ImageUploadBtn>
			</div>
			<div class="d-flex">
				<ImageUploadBtn
					@done="(image) => (editedBannerImage = image)"
					:imageEditorDialogSize="'1024px'"
					:btnText="'Home Banner Image'"
					:imageWidth="1024"
					:imageHeight="680"
				></ImageUploadBtn>
			</div>
		</v-form>

		<template v-slot:footer>
			<v-btn color="accent" outlined block @click="submit()">{{
				selectedModel ? "Update" : "Create"
			}}</v-btn>
		</template>
	</DialogBase>
</template>

<script>
	import { mapState } from "vuex"
	import {
		formFieldsBasicLayout,
		jsonToFormData,
		timeHoursList,
		weekdays,
	} from "~/helpers/functions.js"
	import {
		required,
		validUrl,
		validSocialUrl,
		minLen,
	} from "~/helpers/validationRules.js"
	import FormCreator from "~/components/global/FormCreator"
	import DialogBase from "@/components/dialogs/Base"
	import ImageUploadBtn from "@/components/btns/ImageUploadBtn"
	export default {
		components: { DialogBase, FormCreator, ImageUploadBtn },
		props: {
			dialogModel: { required: true, type: Boolean },
			selectedModel: { required: true, default: null },
		},
		data() {
			return {
				isValidForm: false,
				socialLinksForm: false,
				workTimeForm: false,
				editedLogoImage: null,
				editedBannerImage: null,
				form_data: {},
			}
		},
		mounted() {
			if (this.selectedModel) {
				this.form_data = Object.assign({}, this.selectedModel)
				if (
					this.form_data?.socials &&
					JSON.parse(this.form_data?.socials)?.facebook
				) {
					this.form_data["socialsLinks"] = [JSON.parse(this.form_data.socials)]
				} else {
					this.form_data["socialsLinks"] = [
						{ facebook: null, twitter: null, instagram: null, linkedin: null },
					]
				}
				if (this.form_data.workTimeJson) {
					this.form_data["workTimeJsonData"] = JSON.parse(
						this.form_data.workTimeJson
					)
				}
			} else {
				this.form_data["socialsLinks"] = [
					{ facebook: null, twitter: null, instagram: null, linkedin: null },
				]
			}
			this.form_data["orderToWaiterAssignType"] =
				this.form_data.orderToWaiterAssignType + ""

			if (!this.form_data?.workTimeJsonData?.sunday) {
				this.form_data["workTimeJsonData"] = {}
				weekdays.forEach((day) => {
					this.form_data["workTimeJsonData"][day] = [{ opening: "", closing: "" }]
				})
			}
		},
		computed: {
			...mapState({
				currencyList: (state) => {
					return state.currencies.list
				},
			}),
			form_structure() {
				return {
					orderToWaiterAssignType: {
						name: "orderToWaiterAssignType",
						type: "checkbox",
						falseValue: "1",
						trueValue: "0",
						label: `Automatically assign new order to a least loaded waiter: ${
							this.form_data.orderToWaiterAssignType == "0" ? "Yes" : "No"
						}`,
						...formFieldsBasicLayout,
						rules: [],
					},
					name: {
						name: "name",
						type: "text",
						label: "Name",
						...formFieldsBasicLayout,
						rules: [required("Name is required."), minLen(3)],
					},
					title: {
						name: "title",
						type: "text",
						label: "Title",
						...formFieldsBasicLayout,
						rules: [required("Title is required."), minLen(3)],
					},
					phoneNumber: {
						name: "phoneNumber",
						type: "text",
						label: "Phone",
						mask: "+## (##) ########",
						...formFieldsBasicLayout,
						rules: [minLen(17, "12 digits required.")],
					},
					address: {
						name: "address",
						type: "text",
						label: "Address",
						...formFieldsBasicLayout,
						rules: [],
					},
					website: {
						name: "website",
						type: "text",
						label: "Website Url",
						...formFieldsBasicLayout,
						rules: [validUrl("Must be a valid url")],
					},
					// logoImage: {
					// 	name: "logoImage",
					// 	type: "file",
					// 	label: "Logo",
					// 	showSize: true,
					// 	multiple: false,
					// 	accept: "image/*",
					// 	...formFieldsBasicLayout,
					// 	rules: [],
					// },
					currencyId: {
						name: "currencyId",
						label: "Currency",
						type: "select",
						itemText: "name",
						itemValue: "id",
						items: this.currencyList,
						multiple: false,
						...formFieldsBasicLayout,
						rules: [required("Default currency is required.")],
					},
					mapUrl: {
						name: "mapUrl",
						type: "textarea",
						label: "Map Url",
						rows: 2,
						...formFieldsBasicLayout,
						rules: [required("Google map url is required.")],
					},
					description: {
						name: "description",
						type: "textarea",
						label: "Description",
						...formFieldsBasicLayout,
						rules: [],
					},
				}
			},
			socialLinks_form_structure() {
				return {
					// socials: {
					// 	name: "socials",
					// 	type: "textarea",
					// 	label: "Socials",
					// 	rows: 2,
					// 	...formFieldsBasicLayout,
					// 	rules: [],
					// },
					socialsLinks: {
						type: "array",
						col: 12,
						schema: {
							facebook: {
								name: "facebook",
								label: "Facebook",
								type: "text",
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [validSocialUrl()],
							},
							twitter: {
								name: "twitter",
								label: "Twitter",
								type: "text",
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [validSocialUrl()],
							},
							instagram: {
								name: "instagram",
								label: "Instagram",
								type: "text",
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [validSocialUrl()],
							},
							linkedin: {
								name: "linkedin",
								label: "Linkedin",
								type: "text",
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [validSocialUrl()],
							},
						},
					},
				}
			},
			workTime_form_structure() {
				let structure = {
					workTimeJsonData: {},
				}

				let baseDayStructure = (day) => {
					return [
						{
							opening: {
								name: day,
								label: `${day.toUpperCase()} Opening`,
								type: "select",
								items: timeHoursList(),
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [],
							},
							closing: {
								name: day,
								label: `${day.toUpperCase()} Closing`,
								type: "select",
								items: timeHoursList(),
								...formFieldsBasicLayout,
								col: {
									cols: 12,
									sm: 12,
									md: 12,
									lg: 6,
									xl: 6,
								},
								rules: [],
							},
						},
					]
				}

				weekdays.forEach((day) => {
					structure.workTimeJsonData[day] = baseDayStructure(day)
				})
				return structure
			},
		},
		methods: {
			closeDialog(val = false) {
				this.$emit("closeDialog", val)
			},
			async submit() {
				this.$refs.from.validate()
				if (!this.isValidForm) return

				this.form_data["logoFile"] = this.editedLogoImage?.imageFile
					? this.editedLogoImage.imageFile
					: null
				this.form_data["LandingPhotoFile"] = this.editedBannerImage?.imageFile
					? this.editedBannerImage.imageFile
					: null

				this.form_data["socials"] = this.form_data?.socialsLinks?.length
					? JSON.stringify(this.form_data.socialsLinks[0])
					: null

				this.form_data["workTimeJson"] = this.form_data?.workTimeJsonData?.sunday
					? JSON.stringify(this.form_data.workTimeJsonData)
					: null

				this.form_data["orderToWaiterAssignType"] = Number.parseInt(
					this.form_data.orderToWaiterAssignType
				)

				let data = {
					restaurantId: this.selectedModel?.id,
					payload: jsonToFormData(this.form_data),
				}

				if (this.selectedModel) {
					return await this.$store
						.dispatch("restaurants/update", data)
						.then((res) => {
							if (res.status === 200) {
								this.$toast.success("Restaurant Updated...")
								this.$emit("created", res.data)
							}
						})
				}

				return await this.$store
					.dispatch("restaurants/create", data)
					.then((res) => {
						if (res.status === 201) {
							this.$toast.success("Restaurant Created...")
							this.$emit("created", res.data)
						}
					})
			},
		},
	}
</script>
