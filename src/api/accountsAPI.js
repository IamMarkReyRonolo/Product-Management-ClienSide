import axios from "axios";
const url = "https://product-management-server.herokuapp.com/api/";

export default class API {
	async getSpecificAccount(userId, id, accountId) {
		const account = await axios.get(
			url + userId + "/" + id + "/accounts/" + accountId
		);

		return account;
	}

	async addAccount(userId, id, newAccount) {
		const account = await axios.post(
			url + userId + "/" + id + "/accounts/",
			newAccount
		);
		return account;
	}

	async updateSpecificAccount(userId, id, accountId, updates) {
		const account = await axios.patch(
			url + userId + "/" + id + "/accounts/" + accountId,
			updates
		);
		return account;
	}
	async deleteSpecificAccount(userId, id, accountId) {
		const account = await axios.delete(
			url + userId + "/" + id + "/accounts/" + accountId
		);
		return account;
	}
}
