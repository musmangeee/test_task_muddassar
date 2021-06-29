<template>
	<v-card max-width="600px" color="white" style="width: 100%">
		<v-card-title style="background-color: #80808029">
			Forgot Password
			<v-spacer></v-spacer>
			<nuxt-link to="/">
				<v-img max-width="140px" src="./src/images/logo.png"></v-img>
			</nuxt-link>
		</v-card-title>
		<v-card-text>
			<v-form @submit.prevent v-model="isValidForm" ref="from">
				<client-only>
					<FormCreator
						:schema="form_structure"
						:model="form_data"
					></FormCreator>
				</client-only>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" outlined block @click="submit()">
				Send Reset Email
			</v-btn>
		</v-card-actions>
		<br />
		<v-row justify="center" align="center">
			<v-col cols="12" class="text-center">
				Already have an account?
				<nuxt-link to="/login">Login</nuxt-link> -
				<nuxt-link to="/reset-password">Reset Password</nuxt-link>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { required, validEmail, minLen } from "~/helpers/validationRules.js"
export default {
	layout: "auth",
	head() {
		return {
			title: "Login",
		}
	},
	components: {},
	mounted() {},
	data: () => ({
		isValidForm: false,
		form_data: {
			email: null,
		},
	}),
	computed: {
		form_structure() {
			return {
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
			}
		},
	},
	methods: {
		async submit() {
			var $this = this
			this.$refs.from.validate()
			if (!this.isValidForm) return
			await this.$axios
				.$post(`${this.$config.ApiBaseUrl}/password/email`, this.form_data)
				.then((val) => {
					this.$notifier.showMessage({
						content: val.message,
						color: "success",
					})
					$this.$router.push("/reset-password")
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
