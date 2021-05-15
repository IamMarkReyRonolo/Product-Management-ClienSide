import axios from "axios";
const url = " http://localhost:3000/api/products/";

export default class API {
	async getAllProducts() {
		const products = await axios.get(url);

		// console.log(products.data.products);
		return products.data.products;
	}

	async addProduct(newProduct) {
		const product = await axios.post(url, newProduct);
		return product.data.result.product;
	}

	async getSpecificProduct(id) {
		const products = await axios.get(url + id);
		return products;
	}
	async updateSpecificProduct(id, updates) {
		const products = await axios.patch(url + id, updates);
		return products;
	}
	async deleteSpecificProduct(id) {
		const products = await axios.delete(url + id);
		return products;
	}
}
