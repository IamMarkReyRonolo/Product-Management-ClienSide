import axios from "axios";

axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async updateSpecificProfile(accountId, id, updates) {
		const api =
			"http://localhost:3000/api/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.patch(api, updates);
		return products;
	}
	async deleteSpecificProfile(accountId, id) {
		const api =
			"http://localhost:3000/api/" +
			accountId +
			"/customers/" +
			id +
			"/profile";
		const products = await axios.delete(api);
		return products;
	}

	async addNewCustomer(userId, id, data) {
		const url =
			"http://localhost:3000/api/" + userId + "/" + id + "/customers/create";
		const account = await axios.post(url, data);
		return account;
	}

	async addExistingCustomer(userId, accountId, customerId, data) {
		const url =
			"http://localhost:3000/api/" +
			userId +
			"/" +
			accountId +
			"/customers/" +
			customerId;
		const account = await axios.post(url, data);
		return account;
	}
}
