<template>
	<v-app id="inspire">
		<div v-if="true" class="loading">
			<v-progress-circular
				:size="70"
				:width="7"
				color="blue"
				indeterminate
			></v-progress-circular>
		</div>
	</v-app>
</template>

<script>
	export default {
		name: "App",

		data: () => ({
			load: false,
		}),
		methods: {
			async logOut() {
				this.load = true;
				setTimeout(() => {
					localStorage.removeItem("token");
					this.load = false;
					this.$router.push("/");
				}, 1000);
			},
		},

		async created() {
			await this.logOut();
		},
	};
</script>

<style scoped>
	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: auto;
		width: 300px;
	}
</style>
