import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";
import Accounts from "../views/Accounts.vue";
import Customers from "../views/Customers.vue";
import SpecificAccount from "../views/SpecificAccount.vue";
Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", component: Products },
	{
		path: "/products",
		name: "Products",
		component: Products,
	},
	{
		path: "/products/:id/accounts",
		name: "Accounts",
		component: Accounts,
	},
	{
		path: "/products/:id/accounts/:accountId",
		name: "SpecificAccount",
		component: SpecificAccount,
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
