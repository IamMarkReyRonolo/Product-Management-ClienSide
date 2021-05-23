import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";
import Accounts from "../views/Accounts.vue";
import Customers from "../views/Customers.vue";
import SpecificAccount from "../views/SpecificAccount.vue";
import SpecificCustomer from "../views/SpecificCustomer.vue";
import LandingPage from "../views/LandingPage.vue";
import LoggedIn from "../views/LoggedIn.vue";
import PageNotFound from "../views/PageNotFound.vue";
import LogOut from "../views/LogOut.vue";
import AccessDenied from "../views/AccessDenied.vue";
import InfoPage from "../views/InfoPage.vue";
Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/welcome" },
	{ path: "/logOut", component: LogOut },
	{ path: "/welcome", name: "LandingPage", component: LandingPage },
	{
		path: "/about",
		name: "InfoPage",
		component: InfoPage,
	},
	{
		path: "/verified",
		name: "LoggedIn",
		component: LoggedIn,
		redirect: "/products",

		children: [
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
			{
				path: "/customers/:id",
				name: "SpecificCustomer",
				component: SpecificCustomer,
			},
		],
	},
	{ path: "*", component: PageNotFound },
	{ path: "/accessdenied", component: AccessDenied },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
