import axios from "axios";
const url = " http://localhost:3000/api/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAllCustomers(userId) {
		const link = url + `${userId}/customers`;
		console.log(link);
		const customers = await axios.get(link);
		console.log(customers);
		console.log("hey");
		// console.log(customers);
		return customers.data.customers;
	}

	async addCustomer(userId, newCustomer) {
		const link = url + `${userId}/customers`;
		const customer = await axios.post(link, newCustomer);
		console.log("----------------");
		console.log(customer.data.customer);
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
		console.log(customer);
		return customer;
	}
	async deleteSpecificCustomer(userId, id) {
		const link = url + `${userId}/customers/${id}`;
		const customer = await axios.delete(link);
		console.log(customer);
		return customer;
	}
}
