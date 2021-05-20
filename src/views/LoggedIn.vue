<template>
	<v-app id="inspire">
		<v-navigation-drawer
			v-model="drawer"
			app
			color="grey darken-4
"
			dark
		>
			<template v-slot:prepend>
				<v-list-item two-line>
					<v-list-item-avatar>
						<img
							src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
						/>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ user.fullname }}</v-list-item-title>
						<v-list-item-subtitle>Logged In</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list-item-group color="white">
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-navigation-drawer>

		<v-app-bar
			app
			color="grey darken-4
"
			dark
		>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<h1 class="title">
				Product Management System
			</h1>
		</v-app-bar>

		<v-main color="grey">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import userAPI from "../api/userAPI";
	export default {
		name: "App",

		data: () => ({
			drawer: true,
			items: [
				{ text: "My Products", icon: "mdi-widgets", link: "/products" },
				{
					text: "My Customers",
					icon: "mdi-account-group-outline",
					link: "/customers",
				},
				{ text: "Log Out", icon: "mdi-logout", link: "/logout" },
			],
			user: {},
		}),
		methods: {},

		async created() {
			console.log("hey");
			console.log(localStorage.getItem("token"));
			const user = await userAPI.prototype.getUser();
			this.user = user.data;
			console.log(this.user);
			console.log("yow");
		},
		// mounted() {
		// 	this.$router.push("/products");
		// },
	};
</script>
