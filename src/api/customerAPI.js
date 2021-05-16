import axios from "axios";
const url = " http://localhost:3000/api/customers/";

export default class API {
	async getAllCustomers() {
		const customers = await axios.get(url);

		// console.log(customers);
		return customers.data.customers;
	}

	async addCustomer(newCustomer) {
		const customer = await axios.post(url + "create", newCustomer);
		console.log("----------------");
		console.log(customer.data.customer);
		return customer.data.customer;
	}

	async getSpecificCustomer(id) {
		const customer = await axios.get(url + id);
		return customer;
	}
	async updateSpecificCustomer(id, updates) {
		const customer = await axios.patch(url + id, updates);
		console.log(customer);
		return customer;
	}
	async deleteSpecificCustomer(id) {
		const customer = await axios.delete(url + id);
		console.log(customer);
		return customer;
	}
}
