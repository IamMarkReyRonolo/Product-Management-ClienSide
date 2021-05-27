import axios from "axios";

axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async updateSpecificProfile(userId, productId, accountId, id, updates) {
		const api =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			productId +
			"/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.patch(api, updates);
		return products;
	}
	async deleteSpecificProfile(userId, productId, accountId, id) {
		const api =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			productId +
			"/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.delete(api);
		return products;
	}

	async addNewCustomer(userId, productId, id, data) {
		const url =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			productId +
			"/" +
			id +
			"/customers/create";
		const account = await axios.post(url, data);
		return account;
	}

	async addExistingCustomer(userId, productId, accountId, customerId, data) {
		const url =
			"https://product-management-server.herokuapp.com/api/" +
			userId +
			"/" +
			productId +
			"/" +
			accountId +
			"/customers/" +
			customerId;
		const account = await axios.post(url, data);
		return account;
	}
}
