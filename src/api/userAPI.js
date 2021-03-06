import axios from "axios";
const url = "https://product-management-server.herokuapp.com/api/users";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async logIn(credentials) {
		const user = await axios.post(url + "/login", credentials);
		return user;
	}

	async signUp(credentials) {
		const user = await axios.post(url + "/signup", credentials);
		return user;
	}

	async getUser() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const user = await axios.get(url + "/" + localStorage.getItem("token"));
		return user;
	}
}
