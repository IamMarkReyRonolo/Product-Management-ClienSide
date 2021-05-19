import axios from "axios";
const url = " http://localhost:3000/api/";

export default class API {
	async getSpecificAccount(id, accountId) {
		const account = await axios.get(url + id + "/accounts/" + accountId);

		return account;
	}

	async addAccount(id, newAccount) {
		const account = await axios.post(url + id + "/accounts/", newAccount);
		return account;
	}

	async updateSpecificAccount(id, accountId, updates) {
		const account = await axios.patch(
			url + id + "/accounts/" + accountId,
			updates
		);
		return account;
	}
	async deleteSpecificAccount(id, accountId) {
		const account = await axios.delete(url + id + "/accounts/" + accountId);
		return account;
	}
}
