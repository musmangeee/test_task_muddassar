<template>
	<section class="main-3">
		<v-card flat title class="card-cont fill-height px-0 py-6">
			<div class="container full-height">
				<v-card class="pa-0 ma-0" color="darker1">
					<v-row no-gutters>
						<v-col :cols="colSize(6, 6, 12, 12)">
							<v-card elevation="0" width="100%" color="transparent-1">
								<v-img
									width="100%"
									aspect-ratio="1.5"
									:src="`https://picsum.photos/id/${37 + 10}/500/500`"
									:lazy-src="`https://picsum.photos/id/${37 + 10}/10/6`"
								/>
							</v-card>
						</v-col>
						<v-col :cols="colSize(6, 6, 12, 12)">
							<div
								class="
									container
									fill-height
									justify-center
									align-center
									all-text-center
								"
							>
								<v-row
									style="border: white solid 1px"
									class="fill-height py-6"
									no-gutters
								>
									<v-col cols="12">
										<h1 class="display-2 mb-6 font-weight-bold">
											Book a table
										</h1>
									</v-col>
									<v-col cols="12">
										<v-row no-gutters class="px-4">
											<v-col class="px-2 mt-2" :cols="colSize(4, 4, 4, 12)">
												<v-dialog
													:return-value.sync="booking.date.value"
													v-model="booking.date.dialog"
													width="290px"
												>
													<template v-slot:activator="{ on, attrs }">
														<div>
															<div style="text-align: left !important">
																Date
															</div>
															<v-btn
																@click="booking.date.dialog = true"
																v-bind="attrs"
																v-on="on"
																style="border: 1px solid white"
																class="special-nav"
																block
																text
															>
																{{ booking.date.value }}
															</v-btn>
														</div>
													</template>
													<v-date-picker
														v-model="booking.date.value"
														color="accent"
														scrollable
													></v-date-picker>
												</v-dialog>
											</v-col>
											<v-col class="px-2 mt-2" :cols="colSize(4, 4, 4, 12)">
												<v-dialog
													:return-value.sync="booking.time.value"
													v-model="booking.time.dialog"
													width="290px"
												>
													<template v-slot:activator="{ on, attrs }">
														<div>
															<div style="text-align: left !important">
																Time
															</div>
															<v-btn
																@click="booking.time.dialog = true"
																v-bind="attrs"
																v-on="on"
																style="border: 1px solid white"
																class="special-nav"
																block
																text
															>
																{{ booking.time.value }}
															</v-btn>
														</div>
													</template>

													<v-time-picker
														v-model="booking.time.value"
														color="accent"
														ampm-in-title
														format="ampm"
														scrollable
													></v-time-picker>
												</v-dialog>
											</v-col>
											<v-col class="px-2 mt-2" :cols="colSize(4, 4, 4, 12)">
												<div>
													<div style="text-align: left !important">Persons</div>
													<v-combobox
														style="
															border: 1px solid white;
															text-align: left !important;
															border-radius: 5px;
														"
														class="special-nav pa-0 ma-0"
														v-model="booking.persons.value"
														:items="booking.persons.items"
														hide-selected
														dark
														hide-details
														block
														text
													></v-combobox>
												</div>
											</v-col>
										</v-row>
									</v-col>
									<v-col cols="12">
										<div class="d-flex flex-row justify-space-around mt-10">
											<v-btn x-large text class="special-nav">Book now</v-btn>
										</div>
									</v-col>
								</v-row>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</div>
		</v-card>
	</section>
</template>

<script>
	// import { mapState } from "vuex"

	export default {
		components: {},
		mounted() {},
		async fetch() {},
		data: () => ({
			booking: {
				date: {
					dialog: false,
					value: new Date().toISOString().substr(0, 10),
				},
				time: {
					dialog: false,
					value: "21:00",
				},
				persons: {
					dialog: false,
					value: 3,
					items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				},
			},
		}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	section.main-3 {
		height: auto;
		.card-cont {
			background-color: rgb(255, 255, 255);
			* {
				color: rgb(255, 255, 255);
			}
		}
	}
</style>
