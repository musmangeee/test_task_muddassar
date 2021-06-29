<template>
	<CreateContact></CreateContact>
</template>

<script>
	import CreateContact from "@/components/tables/ContactsTable"
	export default {
		layout: "cms",
		// middleware: "page-role-manager",
		head() {
			return {
				title: "Contacts",
			}
		},
		components: {
			CreateContact,
		},
		mounted() {},
		data: () => ({
			createContactDialog: false,
			selected: [],
			search: "",
			headers: [
				{
					text: "No",
					value: "id",
					align: "start",
					filterable: false,
					sortable: false,
				},
				{
					text: "Name",
					value: "name",
					align: "start",
					filterable: true,
				},
				{ text: "Phone", value: "phone", sortable: false },
				{ text: "Email", value: "email" },
				{ text: "Notes", value: "notes" },
			],
			desserts: [
				{
					name: "Test",
					phone: "0335-630-4958",
					email: "awais.jameel@ymail.com",
					notes: "Test Notes",
				},
			],
		}),
		computed: {},
		methods: {},
	}
</script>
