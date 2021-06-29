<template>
	<DialogBase :dialogWidth="800" :dialogModel="dialogModel" @closeDialog="(val) => closeDialog(val)">
		<template v-slot:title>{{selectedContact ? 'Update' : 'Create'}} Contact</template>
		<v-form id="registration-form" @submit.prevent v-model="isValidForm" ref="from">
			<FormCreator :schema="form_structure" :model="form_data"></FormCreator>
		</v-form>
		<v-btn color="primary" outlined block @click="submit()">{{selectedContact ? 'Update' : 'Create'}}</v-btn>
	</DialogBase>
</template>

<script>
import { required, validEmail, minLen } from "~/helpers/validationRules.js";
import FormCreator from "~/components/global/FormCreator";
import DialogBase from "@/components/dialogs/Base";
export default {
	components: { DialogBase, FormCreator },
	props: {
		dialogModel: { required: true, type: Boolean },
		selectedContact: { required: true, default: null }
	},
	data() {
		return {
			isValidForm: false,
			form_data: {
				name: null,
				phone: null,
				email: null,
				notes: null
			}
		};
	},
	computed: {
		form_structure() {
			return {
				name: {
					name: "name",
					type: "text",
					label: "Name",
					clearable: true,
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: [required("Name is required."), minLen(3)]
				},
				phone: {
					name: "phone",
					type: "text",
					label: "Phone",
					clearable: true,
					mask: "###-###-####",
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: [minLen(12)]
				},
				email: {
					name: "email",
					type: "email",
					label: "Email",
					clearable: true,
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: [validEmail()]
				},
				notes: {
					name: "notes",
					type: "textarea",
					label: "Notes",
					clearable: true,
					col: { cols: 12, sm: 12, md: 12, lg: 12, xl: 12 },
					rules: []
				}
			};
		}
	},
	mounted() {
		if (this.selectedContact) this.form_data = this.selectedContact;
	},
	methods: {
		closeDialog(val = false) {
			this.$emit("closeDialog", val);
		},
		async submit() {
			this.$refs.from.validate();
			if (!this.isValidForm) return;
			let data = this.form_data;
			await this.$axios
				.$post(
					`${this.$config.ApiBaseUrl}/api/${
						this.selectedContact ? "update" : "create"
					}-contact`,
					data
				)
				.then(val => {
					this.$emit("created", val.contacts);
					this.closeDialog();
					this.$notifier.showMessage({
						content: this.selectedContact
							? "Contact updated."
							: "New Contact Created.",
						color: "primary"
					});
				})
				.catch(({ response: data }) => {
					this.$notifier.showMessage({
						content: Object.values(data.data.errors)[0][0],
						color: "error"
					});
				});
		}
	}
};
</script>
