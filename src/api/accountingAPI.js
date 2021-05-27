import axios from "axios";
const url = "https://product-management-server.herokuapp.com/api/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAccounting(userId, productId) {
		const product = await axios.get(
			url + userId + "/" + productId + "/accounting"
		);
		return product;
	}
}
