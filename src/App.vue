<template>
	<v-app id="inspire">
		<router-view></router-view>
	</v-app>
</template>

<script>
	export default {
		name: "App",

		data: () => ({
			drawer: false,
		}),
	};
</script>
