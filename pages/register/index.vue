<template>
	<v-card max-width="600px" color="white" style="width: 100%">
		<v-card-title style="background-color: #80808029">
			Registration
			<v-spacer></v-spacer>
			<nuxt-link to="/">
				<v-img max-width="140px" src="./src/images/logo.png"></v-img>
			</nuxt-link>
		</v-card-title>
		<v-card-text>
			<v-form
				id="registration-form"
				@submit.prevent
				v-model="isValidForm"
				ref="from"
			>
				<client-only>
					<FormCreator
						:schema="form_structure"
						:model="form_data"
					></FormCreator>
				</client-only>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" outlined block @click="submit()">Register</v-btn>
		</v-card-actions>
		<br />
		<v-row justify="center" align="center">
			<v-col cols="12" class="text-center">
				Already have an account?
				<nuxt-link to="/login">Login</nuxt-link>-
				<nuxt-link to="/forgot-password">Forgot Password</nuxt-link>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	import {
		required,
		validEmail,
		minLen,
		maxLen,
	} from "~/helpers/validationRules.js"
	import countries from "~/helpers/countries.json"
	export default {
		layout: "auth",
		head() {
			return {
				title: "Registration",
			}
		},
		components: {},
		mounted() {},
		data: () => ({
			isValidForm: false,
			form_data: {
				first_name: null,
				last_name: null,
				date_of_birth: null,
				country: null,
				phone: null,
				username: null,
				role: null,
				password: null,
				password_confirmation: null,
				email: null,
				terms_conditions: null,
			},
		}),
		computed: {
			form_structure() {
				return {
					first_name: {
						name: "first_name",
						type: "text",
						label: "First Name",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("First Name is required."), minLen(3)],
					},
					last_name: {
						name: "last_name",
						type: "text",
						label: "Last Name",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("Last Name is required."), minLen(3)],
					},
					country: {
						name: "country",
						type: "autocomplete",
						label: "Country",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						"item-text": "name",
						"item-value": "name",
						items: countries,
						rules: [required("Country is required.")],
					},
					date_of_birth: {
						name: "date_of_birth",
						type: "text",
						ext: "date",
						label: "Date Of Birth",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("DOB is required.")],
					},
					// date_of_birth: {
					//   name: "date_of_birth",
					//   type: "date",
					//   ext: "text",
					//   label: "Date Of Birth",
					//   clearable: true,
					//   menu: {
					//     closeOnContentClick: false,
					//     nudgeRight: 200,
					//     maxWidth: "290px",
					//     minWidth: "290px",
					//   },
					//   col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
					// },
					phone: {
						name: "phone",
						type: "text",
						label: "Phone",
						mask: "###-###-####",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("Phone is required.")],
					},
					username: {
						name: "username",
						type: "text",
						label: "Username",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("Username is required.")],
					},
					role: {
						name: "role",
						type: "radio",
						label: "Account Type",
						clearable: true,
						row: true,
						options: ["Restaurant"],
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
						rules: [required("Account Type is required.")],
					},
					password: {
						name: "password",
						type: "password",
						label: "Password",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("Password is required."), minLen(8)],
					},
					password_confirmation: {
						name: "password_confirmation",
						type: "password",
						label: "Conform Password",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 6, xl: 6 },
						rules: [required("Conform Password is required."), minLen(8)],
					},
					email: {
						name: "email",
						type: "email",
						label: "Email",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
						rules: [
							required("Email is required."),
							validEmail("Email Must be valid."),
						],
					},
					terms_conditions: {
						name: "terms_conditions",
						type: "checkbox",
						label: "Terms and Conditions",
						clearable: true,
						col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
						rules: [required("Terms and Conditions must be accepted.")],
					},
				}
			},
		},
		methods: {
			async submit() {
				var $this = this
				this.$refs.from.validate()
				if (!this.isValidForm) return
				let data = this.form_data
				data["role"] = data.role.toString().toLowerCase()
				await this.$axios
					.$post(`${this.$config.ApiBaseUrl}/register`, data)
					.then((val) => {
						this.$notifier.showMessage({
							content: "Account Registered Successfully.",
							color: "primary",
						})
						$this.$router.push("/login")
					})
					.catch(({ response: data }) => {
						// console.log(data.data.message,Object.values(data.data.errors)[0][0]);
						this.$notifier.showMessage({
							content: Object.values(data.data.errors)[0][0],
							color: "error",
						})
					})
			},
		},
	}
</script>

<style lang="scss">
	#registration-form #form-base .item {
		padding-left: 1rem !important;
		padding-right: 1rem !important;
	}
</style>
