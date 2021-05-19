import axios from "axios";
const url = " http://localhost:3000/api/users";

export default class API {
	async logIn(credentials) {
		const user = await axios.post(url + "/login", credentials);
		return user;
	}

	async signUp(credentials) {
		const user = await axios.post(url + "/signup", credentials);
		return user;
	}
}
