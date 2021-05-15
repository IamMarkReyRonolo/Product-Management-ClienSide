import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";
import Accounts from "../views/Accounts.vue";
import Customers from "../views/Customers.vue";
Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", component: Products },
	{
		path: "/products",
		name: "Products",
		component: Products,
	},
	{
		// UserProfile will be rendered inside User's <router-view>
		// when /user/:id/profile is matched
		path: "/products/:id/accounts",
		name: "Accounts",
		component: Accounts,
	},
	{
		path: "/customers",
		name: "Customers",
		component: Customers,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
