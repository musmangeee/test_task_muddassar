<template>
	<v-card max-width="600px" color="white" style="width: 100%">
		<v-card-title style="background-color: #80808029">
			Login
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
			<v-btn color="primary" outlined block @click="submit()">Login</v-btn>
		</v-card-actions>
		<br />
		<v-row justify="center" align="center">
			<v-col cols="12" class="text-center">
				Don't have an account?
				<nuxt-link to="/register">Create Account</nuxt-link>-
				<nuxt-link to="/forgot-password">Forgot Password</nuxt-link>
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
			username: null,
			password: null,
		},
	}),
	computed: {
		form_structure() {
			return {
				username: {
					name: "username",
					type: "text",
					label: "Username",
					clearable: true,
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: [required("Username is required."), minLen(3)],
				},
				password: {
					name: "password",
					type: "password",
					label: "Password",
					clearable: true,
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: [required("Password is required."), minLen(8)],
				},
			}
		},
	},
	methods: {
		async submit() {
			var $this = this
			this.$refs.from.validate()
			if (!this.isValidForm) return
			// const response = await this.$api.auth.login(this.email, this.password);
			return await this.$auth
				.loginWith("laravelSanctum", {
					data: this.form_data,
				})
				.then((val) => {
					this.$notifier.showMessage({
						content: "Logged In Successfully.",
						color: "primary",
					})
					$this.$router.replace(this.user_home_path)
				})
				.catch(({ response: data }) => {
					this.$notifier.showMessage({
						content: Object.values(data.data.errors)[0][0],
						color: "error",
					})
				})
		},
	},
}
</script>
