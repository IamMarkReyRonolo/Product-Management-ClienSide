import axios from "axios";
const url = " http://localhost:3000/api/users";
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
		const user = await axios.get(url + "/user");
		return user;
	}
}
