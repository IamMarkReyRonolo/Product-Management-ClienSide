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
							src="https://scontent.fceb1-3.fna.fbcdn.net/v/t1.6435-9/169287011_2017074691767068_6531114819268002370_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHkseHYCDPV_2pLz0czzbPPjxutAHy17-KPG60AfLXv4snZ42r6t5qyBFMm7Mcht5z2Hkt_mU8kQJJINcL2jAUM&_nc_ohc=3tP3rvwRY48AX-fqUOp&_nc_ht=scontent.fceb1-3.fna&oh=5872de5c9d9d78f52f2ffa1850088621&oe=60C2C3C3"
						/>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Fatima B. Madrigal</v-list-item-title>
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
