<template>
	<v-container fluid>
		<v-row no-gutters>
			<v-col :cols="colSize(9, 9, 12, 12)">
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
									<h1 class="title font-weight-bold">Check Out</h1>
								</div>
							</div>
							<v-row no-gutters>
								<v-col>
									<v-expansion-panels active-class="active-panel">
										<v-expansion-panel
											@click="checkOutPanels.selectedPanel = 'delivery'"
											:class="
												checkOutPanels.selectedPanel == 'delivery'
													? 'active-panel'
													: ''
											"
											:key="'delivery'"
										>
											<v-expansion-panel-header>
												<template v-slot="{}">
													<div class="d-flex">
														<div>
															<v-icon
																v-if="
																	checkOutPanels.selectedPanel != 'delivery'
																"
																color="grey"
															>
																mdi-radiobox-blank
															</v-icon>
															<v-icon v-else color="accent">
																mdi-radiobox-marked
															</v-icon>
														</div>

														<div class="ml-2 mt-1">Delivery</div>
													</div>
												</template>
												<template v-slot:actions> &nbsp;</template>
											</v-expansion-panel-header>
											<v-expansion-panel-content>
												<client-only>
													<v-form
														id="check-out-form"
														@submit.prevent
														v-model="checkOutPanels.deliveryForm.isValid"
														ref="from"
													>
														<FormCreator
															:schema="deliveryFormStructure"
															:model="checkOutPanels.deliveryForm.data"
														></FormCreator>
													</v-form>
												</client-only>
											</v-expansion-panel-content>
										</v-expansion-panel>
										<v-expansion-panel
											@click="checkOutPanels.selectedPanel = 'collection'"
											:class="
												checkOutPanels.selectedPanel == 'collection'
													? 'active-panel'
													: ''
											"
											:key="'collection'"
										>
											<v-expansion-panel-header>
												<template v-slot="{}">
													<div class="d-flex">
														<div>
															<v-icon
																v-if="
																	checkOutPanels.selectedPanel != 'collection'
																"
																color="grey"
															>
																mdi-radiobox-blank
															</v-icon>
															<v-icon v-else color="accent">
																mdi-radiobox-marked
															</v-icon>
														</div>

														<div class="ml-2 mt-1">
															Collection from {{ restaurant.name }}
														</div>
													</div>
												</template>
												<template v-slot:actions> &nbsp;</template>
											</v-expansion-panel-header>
											<v-expansion-panel-content>
												<client-only>
													<v-form
														id="check-out-form"
														@submit.prevent
														v-model="checkOutPanels.collectionForm.isValid"
														ref="from"
													>
														<FormCreator
															:schema="collectionFormStructure"
															:model="checkOutPanels.collectionForm.data"
														></FormCreator>
													</v-form>
												</client-only>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>
								</v-col>
							</v-row>
						</div>
						<div class="container full-height">
							<div class="d-flex d-row justify-space-between mb-4">
								<div>
									<h1 class="title font-weight-bold">Payment Methods</h1>
								</div>
							</div>
							<v-row no-gutters>
								<v-col>
									<v-expansion-panels active-class="active-panel">
										<v-expansion-panel
											@click="paymentPanels.selectedPanel = 'DigiDoe'"
											:class="
												paymentPanels.selectedPanel == 'DigiDoe'
													? 'active-panel'
													: ''
											"
											:key="'DigiDoe'"
										>
											<v-expansion-panel-header>
												<template v-slot="{}">
													<div class="d-flex">
														<div>
															<v-icon
																v-if="paymentPanels.selectedPanel != 'DigiDoe'"
																color="grey"
															>
																mdi-radiobox-blank
															</v-icon>
															<v-icon v-else color="accent">
																mdi-radiobox-marked
															</v-icon>
														</div>

														<div class="ml-2 mt-1">DigiDoe</div>
													</div>
												</template>
												<template v-slot:actions> &nbsp;</template>
											</v-expansion-panel-header>
											<v-expansion-panel-content>
												<client-only>
													<v-row>
														<v-col></v-col>
														<v-col fill-height>
															<div
																class="d-flex justify-center align-items-center"
															>
																<vue-qr
																	text="https://digidoe.com/payment"
																	qid="digidoe-payment"
																	:correctLevel="3"
																></vue-qr>
															</div>
														</v-col>
														<v-col fill-height>
															<div class="center-all-content">
																Please scan the QR code using DigiDoe
																application.
															</div>
														</v-col>
													</v-row>
												</client-only>
											</v-expansion-panel-content>
										</v-expansion-panel>
										<v-expansion-panel
											@click="paymentPanels.selectedPanel = 'new-card'"
											:class="
												paymentPanels.selectedPanel == 'new-card'
													? 'active-panel'
													: ''
											"
											:key="'new-card'"
										>
											<v-expansion-panel-header>
												<template v-slot="{}">
													<div class="d-flex">
														<div>
															<v-icon
																v-if="paymentPanels.selectedPanel != 'new-card'"
																color="grey"
															>
																mdi-radiobox-blank
															</v-icon>
															<v-icon v-else color="accent">
																mdi-radiobox-marked
															</v-icon>
														</div>

														<div class="ml-2 mt-1">New Card</div>
													</div>
												</template>
												<template v-slot:actions> &nbsp;</template>
											</v-expansion-panel-header>
											<v-expansion-panel-content>
												<client-only>
													<v-form
														id="check-out-form"
														@submit.prevent
														v-model="paymentPanels.newCardForm.isValid"
														ref="from"
													>
														<FormCreator
															:schema="newCardFormStructure"
															:model="paymentPanels.newCardForm.data"
														></FormCreator>
													</v-form>
												</client-only>
												<div class="d-flex justify-space-between">
													<div class="caption">
														Your card will be saved for next time you order. You
														can remove it at any time.
													</div>
													<div class="caption text-decoration-underline">
														<a href="#">About my data</a>
													</div>
												</div>
												<div class="mt-4 d-flex justify-space-between">
													<div>
														<v-btn color="accent" outlined x-large block
															>Add Card</v-btn
														>
													</div>
													<div
														class="
															d-flex
															flex-row
															caption
															text-decoration-underline
														"
													>
														<div class="px-2 center-all-content">
															<a href="#"> Processed By </a>
														</div>
														<a href="#">
															<v-img
																contain
																width="130px"
																:src="company.logos.black"
															></v-img>
														</a>
													</div>
												</div>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>
									<v-row>
										<v-col :cols="colSize(4, 6, 12, 12)">
											<div class="mt-6">
												<v-btn color="accent" class="white--text" x-large block
													>Pay</v-btn
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
			<v-col :cols="colSize(3, 3, 12, 12)" fill-height class="transparent-3">
				<SectionCart :isFull="true" :isEditable="false"></SectionCart>
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
			checkOutPanels: {
				selectedPanel: null,
				deliveryForm: {
					is_selected: false,
					isValid: false,
					data: {},
				},
				collectionForm: {
					is_selected: false,
					isValid: false,
					data: {},
				},
			},
			paymentPanels: {
				selectedPanel: null,
				digidoeForm: {
					is_selected: false,
					isValid: false,
					data: {},
				},
				newCardForm: {
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
			deliveryFormStructure() {
				return {
					deliveryAddress: {
						name: "deliveryAddress",
						type: "text",
						label: "Delivery Address",
						placeholder: "Enter Delivery Address",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [required("Delivery Address is required."), minLen(3)],
					},
					phoneNumber: {
						name: "phoneNumber",
						type: "text",
						label: "Phone Number",
						placeholder: "Enter Phone Number",
						mask: "+## (##) ########",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [
							required("Phone Number is required."),
							minLen(17, "12 digits required."),
						],
					},
					deliveryNotes: {
						name: "deliveryNotes",
						type: "textarea",
						label: "Note For Delivery",
						placeholder: "Add a note",
						rows: 1,
						...formFieldsBasicLayout,
						rules: [],
					},
				}
			},
			collectionFormStructure() {
				return {
					name: {
						name: "name",
						type: "text",
						label: "Name for collection",
						placeholder: "Enter Name for collection",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [required("Name for collection is required."), minLen(3)],
					},
					deliveryTime: {
						name: "deliveryTime",
						label: "Collection Time",
						type: "select",
						items: timeHoursList(),
						multiple: false,
						returnObject: false,
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [required("Collection Time is required.")],
					},
					phoneNumber: {
						name: "phoneNumber",
						type: "text",
						label: "Phone Number",
						placeholder: "Enter Phone Number",
						mask: "+## (##) ########",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [
							required("Phone Number is required."),
							minLen(17, "12 digits required."),
						],
					},
				}
			},
			newCardFormStructure() {
				return {
					cardNumber: {
						name: "cardNumber",
						type: "text",
						label: "Card Number",
						placeholder: "#### #### #### ####",
						mask: "#### #### #### ####",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [
							required("Card Number is required."),
							minLen(19, "Invalid Card Cumber."),
						],
					},
					cardholderName: {
						name: "cardholderName",
						type: "text",
						label: "Cardholder Name",
						placeholder: "Cardholder Name",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 6,
							xl: 6,
						},
						rules: [required("Cardholder Name is required."), minLen(3)],
					},
					expiryDate: {
						name: "expiryDate",
						label: "Exp. Date",
						type: "text",
						ext: "date",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 4,
							xl: 4,
						},
						rules: [required("Exp. Date is required.")],
					},
					cvvNumber: {
						name: "cvvNumber",
						type: "text",
						label: "CVV",
						placeholder: "###",
						mask: "###",
						...formFieldsBasicLayout,
						col: {
							cols: 12,
							sm: 12,
							md: 12,
							lg: 2,
							xl: 2,
						},
						rules: [
							required("CVV Number is required."),
							minLen(3, "3 digits required."),
							maxLen(3, "3 digits max."),
						],
					},
				}
			},
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/variables.scss";

	section.main-2 {
		height: auto;
		min-height: 100vh;
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
