import axios from "axios";
const url = " http://localhost:3000/api/";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getAccounting(productId) {
		const product = await axios.get(url + productId + "/accounting");
		return product;
	}
}
