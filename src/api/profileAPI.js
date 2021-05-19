import axios from "axios";
const url = " http://localhost:3000/api/customers/";

export default class API {
	async updateSpecificProduct(id, updates) {
		const products = await axios.patch(url + id + "/profile", updates);
		return products;
	}
	async deleteSpecificProduct(id) {
		const products = await axios.delete(url + id + "/profile");
		return products;
	}

	async addNewCustomer(id, data) {
		const url = "http://localhost:3000/api/" + id + "/customers/create";
		const account = await axios.post(url, data);
		return account;
	}

	async addExistingCustomer(accountId, customerId, data) {
		const url =
			"http://localhost:3000/api/" + accountId + "/customers/" + customerId;
		const account = await axios.post(url, data);
		return account;
	}
}
