import axios from "axios";
const url = " http://localhost:3000/api/customers/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async updateSpecificProduct(id, updates) {
		const products = await axios.patch(url + id + "/profile", updates);
		return products;
	}
	async deleteSpecificProduct(id) {
		const products = await axios.delete(url + id + "/profile");
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
