<template>
	<v-card>
		<v-card-title>
			<v-btn color="success" @click="refresh()" icon>
				<v-icon>mdi-refresh</v-icon>
			</v-btn>Contacts
		</v-card-title>
		<v-card-text>
			<v-card>
				<v-card-title>
					<v-btn color="success" outlined @click="createContactDialog = true">Create</v-btn>
					<v-btn
						v-if="selectedContactIds.length"
						icon
						color="error"
						@click="deleteContacts(selectedContactIds)"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<v-text-field
						append-icon="mdi-magnify"
						v-model="search"
						label="Search"
						hide-details
						single-line
						outlined
						dense
					></v-text-field>
				</v-card-title>
				<v-data-table
					v-model="selectedContacts"
					:headers="headers"
					:items="contacts"
					:search="search"
					:single-select="false"
					item-key="id"
					show-select
				>
					<template v-slot:item.actions="{ item }">
						<v-btn @click="deleteContacts([item.id])" icon color="error">
							<v-icon>mdi-delete</v-icon>
						</v-btn>
						<v-btn @click="showUpdateContactDialog(item)" icon color="success">
							<v-icon>mdi-update</v-icon>
						</v-btn>
					</template>
				</v-data-table>
			</v-card>
		</v-card-text>
		<CreateContactDialog
			v-if="createContactDialog"
			:dialogModel="createContactDialog"
			:selectedContact="selectedContact"
			@created="(val)=>(contacts = val)"
			@closeDialog="closeDialog()"
		></CreateContactDialog>
	</v-card>
</template>

<script>
import CreateContactDialog from "@/components/dialogs/CreateContactDialog";
import { pluck } from "~/helpers/functions.js";
export default {
	components: {
		CreateContactDialog
	},
	data: () => ({
		createContactDialog: false,
		selectedContact: null,
		selectedContacts: [],
		selectedContactIds: [],
		contacts: [],
		search: "",
		headers: [
			{
				text: "ID",
				value: "contact_id",
				align: "start",
				filterable: false,
				sortable: false
			},
			{
				text: "Name",
				value: "name",
				align: "start",
				filterable: true
			},
			{ text: "Phone", value: "phone", sortable: false },
			{ text: "Email", value: "email" },
			{ text: "Notes", value: "notes" },
			{ text: "Actions", value: "actions" }
		]
	}),
	watch: {
		contacts(newVal, oldVal) {
			if (newVal.length != oldVal.length) this.selectedContacts = [];
		},
		selectedContacts(val) {
			this.selectedContactIds = pluck("id", this.selectedContacts);
		}
	},
	mounted() {
		this.getContacts();
	},
	methods: {
		closeDialog() {
			this.selectedContact = null;
			this.createContactDialog = false;
		},
		showUpdateContactDialog(contact) {
			this.selectedContact = contact;
			this.createContactDialog = true;
		},
		refresh() {
			this.getContacts();
			this.$nuxt.refresh();
		},
		async getContacts() {
			return await this.$axios
				.$post(`${this.$config.ApiBaseUrl}/api/get-all-contacts`, {})
				.then(val => {
					if (val) this.contacts = val.contacts;
				})
				.catch(({ response: data }) => {
					this.$notifier.showMessage({
						content: Object.values(data.data.errors)[0][0],
						color: "error"
					});
				});
		},
		async deleteContacts(contacts = []) {
			return await this.$axios
				.$post(`${this.$config.ApiBaseUrl}/api/delete-contacts`, {
					contacts
				})
				.then(val => {
					if (val) this.contacts = val.contacts;
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
