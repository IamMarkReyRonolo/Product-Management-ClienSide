<template>
	<v-app id="inspire"> </v-app>
</template>

<script>
	export default {
		name: "App",

		data: () => ({}),
		methods: {
			async logOut() {
				await localStorage.removeItem("token");
			},
		},

		async created() {
			console.log("yeah");
			await this.logOut();
			this.$router.push("/");
		},
	};
</script>
