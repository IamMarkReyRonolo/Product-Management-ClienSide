import axios from "axios";
const url = "https://product-management-server.herokuapp.com/api/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAllCustomers(userId) {
		const link = url + `${userId}/customers`;
		const customers = await axios.get(link);
		return customers.data.customers;
	}

	async addCustomer(userId, newCustomer) {
		const link = url + `${userId}/customers`;
		const customer = await axios.post(link, newCustomer);
		return customer.data.customer;
	}

	async getSpecificCustomer(userId, id) {
		const link = url + `${userId}/customers/${id}`;
		const customer = await axios.get(link);
		return customer;
	}

	async updateSpecificCustomer(userId, id, updates) {
		const link = url + `${userId}/customers/${id}`;
		const customer = await axios.patch(link, updates);
		return customer;
	}
	async deleteSpecificCustomer(userId, id) {
		const link = url + `${userId}/customers/${id}`;
		const customer = await axios.delete(link);
		return customer;
	}
}
