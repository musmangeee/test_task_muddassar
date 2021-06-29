<template>
	<v-container>
		<v-row no-gutters>
			<v-col :cols="colSize(8, 8, 12, 12)">
				<section class="main-2">
					<v-card
						flat
						title
						elevation="0"
						class="card-cont fill-height py-6"
						:class="'px-6 '"
					>
						<div class="container full-height">
							<div class="d-flex d-row justify-space-between mb-4">
								<div>
									<h1 class="title font-weight-bold">
										Log in/Signup using mobile phone
									</h1>
								</div>
							</div>
							<v-row no-gutters>
								<v-col>
									<client-only>
										<v-form
											id="login-signup-form"
											@submit.prevent
											v-model="loginOrSignup.deliveryForm.isValid"
											ref="from"
										>
											<FormCreator
												:schema="loginOrSignupFormStructure"
												:model="loginOrSignup.deliveryForm.data"
												@click="handleFormInputClick"
											>
												<template #slot-item-key-termsText="{ id, index, obj }">
													<div
														v-bind="obj.schema"
														v-html="obj.schema.text"
													></div>
												</template>
											</FormCreator>
										</v-form>
									</client-only>
								</v-col>
							</v-row>
						</div>
						<div class="container full-height">
							<v-row no-gutters>
								<v-col>
									<v-row>
										<v-col :cols="colSize(4, 6, 12, 12)">
											<div class="mt-2">
												<v-btn
													nuxt
													:to="{ name: 'restaurants_layout-1-check-out' }"
													color="accent"
													outlined
													x-large
													block
													>Next</v-btn
												>
											</div>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</div>
					</v-card>
				</section>
			</v-col>
			<v-col class="white" :cols="colSize(4, 4, 12, 12)">
				<div class="center-all-content flex-column">
					<vue-qr
						:text="'login'"
						:size="250"
						style="width: 100%; max-width: 250px"
					></vue-qr>

					<div class="text-center" style="width: 100%; max-width: 250px">
						Please scan the QR code using DigiDoe application
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState } from "vuex"
	import {
		formFieldsBasicLayout,
		timeHoursList,
		jsonToFormData,
	} from "~/helpers/functions.js"
	import {
		required,
		validUrl,
		minLen,
		maxLen,
	} from "~/helpers/validationRules.js"
	import VueQr from "vue-qr"
	import FormCreator from "~/components/global/FormCreator"
	import SectionCart from "@/components/layouts/1/SectionCart.vue"

	export default {
		components: { SectionCart, FormCreator, VueQr },
		mounted() {},
		props: {},
		async fetch() {},
		data: () => ({
			loginOrSignup: {
				deliveryForm: {
					is_selected: false,
					isValid: false,
					data: {},
				},
			},
		}),
		computed: {
			...mapState({
				restaurant: (state) => {
					return state.restaurants.restaurant
				},
				cartItems: (state) => {
					return state.cart.items
				},
			}),
			loginOrSignupFormStructure() {
				return {
					name: {
						name: "name",
						type: "text",
						label: "Your Name",
						placeholder: "Enter Your Name",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 12,
							xl: 12,
						},
						rules: [required("Your Name is required."), minLen(3)],
					},
					mobileNumber: {
						name: "mobileNumber",
						type: "text",
						label: "Mobile Number",
						placeholder: "Enter Mobile Number",
						mask: "+## (##) ########",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 8,
							xl: 8,
						},
						rules: [
							required("Mobile Number is required."),
							minLen(17, "12 digits required."),
						],
					},
					sendSmsBtn: {
						name: "sendSmsBtn",
						type: "btn",
						label: "Send",
						block: this.colSize(false, false, false, true),
						color: "accent",
						class: this.colSize(
							"float-right mr-2",
							"float-right mr-2 mb-4 mt-n2",
							"float-right mr-2 mb-4 mt-n2",
							"mb-4  mt-n2"
						),
						minWidth: "200px",
						xLarge: true,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 4,
							xl: 4,
						},
					},
					pinNumber: {
						name: "pinNumber",
						type: "text",
						label: "We will send you 4 digit PIN verify your mobile number",
						placeholder: "Enter Pin Number",
						mask: "####",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 8,
							xl: 8,
						},
						rules: [],
					},
					termsText: {
						name: "termsText",
						type: "card",
						class: "px-2 caption",
						text: `By entering your phone number you agree to <a class="black--text text-decoration-underline" href="#" target="_blank" rel="noopener noreferrer">Terms and conditions</a>`,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 12,
							xl: 12,
						},
					},
					rememberMe: {
						name: "rememberMe",
						type: "checkbox",
						label: "Remember Me",
						color: "accent",
						...formFieldsBasicLayout,
						class: "mt-6 px-2",
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 12,
							xl: 12,
						},
						rules: [],
					},
				}
			},
		},
		methods: {
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
					"click,form-base,sendSmsBtn,button"
				) {
					console.log("Send Sms...")
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/variables.scss";

	section.main-2 {
		height: auto;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: black;
			}
		}
	}

	.v-expansion-panel:before {
		box-shadow: none;
	}
	.v-expansion-panels {
		.v-expansion-panel {
			margin-top: 5px;
			border-radius: 8px 8px 0 0;
			box-shadow: none;
			border: 1px solid rgb(206, 206, 206);
		}
		.active-panel {
			background-color: white;
			border: 1px solid $accent;
		}
	}
</style>
