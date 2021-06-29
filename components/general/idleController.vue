<template>
	<div class="d-none">
		<v-idle
			@idle="onidle"
			@remind="onremind"
			:loop="false"
			:reminders="[60, 120]"
			:wait="5"
			:duration="3000"
			:events="['mousemove', 'keypress', 'scroll']"
		/>
	</div>
</template>

<script>
	export default {
		methods: {
			onidle() {
				alert("You have been logged out")
			},
			onremind(time) {
				// alert seconds remaining to 00:00
				// alert(time)
			},
		},
	}
</script>
