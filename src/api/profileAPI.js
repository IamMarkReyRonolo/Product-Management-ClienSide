import axios from "axios";

axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async updateSpecificProfile(accountId, id, updates) {
		const api =
			"https://product-management-server.herokuapp.com/api/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.patch(api, updates);
		return products;
	}
	async deleteSpecificProfile(accountId, id) {
		const api =
			"https://product-management-server.herokuapp.com/api/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.delete(api);
		return products;
	}

	async addNewCustomer(userId, id, data) {
		const url =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			id +
			"/customers/create";
		const account = await axios.post(url, data);
		return account;
	}

	async addExistingCustomer(userId, accountId, customerId, data) {
		const url =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			accountId +
			"/customers/" +
			customerId;
		const account = await axios.post(url, data);
		return account;
	}
}
