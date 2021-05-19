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
			items: [
				{ text: "My Products", icon: "mdi-widgets", link: "/" },
				{
					text: "My Customers",
					icon: "mdi-account-group-outline",
					link: "/customers",
				},
				{ text: "Log Out", icon: "mdi-logout" },
			],
		}),
	};
</script>
