import axios from "axios";
const url = "https://product-management-server.herokuapp.com/api/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAccounting(productId) {
		const product = await axios.get(url + productId + "/accounting");
		return product;
	}
}
