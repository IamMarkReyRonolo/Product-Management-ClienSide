<template>
	<div class="home">
		<div class="text-center mt-4">
			<v-snackbar v-model="snackbar" :timeout="timeout">
				{{ text }}

				<template v-slot:action="{ attrs }">
					<v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</div>

		<div class="headings">
			<h1 class="display-2 font-weight-bold">MY PRODUCTS</h1>
			<v-spacer></v-spacer>
			<v-btn color="dark" light class="editButton" @click="editProduct">
				Edit
			</v-btn>
			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="dark" dark v-bind="attrs" v-on="on">
						Add Product
					</v-btn>
				</template>
				<v-card dark>
					<form
						action=""
						@submit.prevent="addProduct"
						enctype="multipart/form-data"
					>
						<v-card-title>
							<span class="headline">Add Product</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="6">
										<v-text-field
											label="Product Name*"
											v-model="productName"
											required
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-file-input
											label="Product Image*"
											filled
											prepend-icon="mdi-camera"
											required
											@change="imageFile"
										></v-file-input>
									</v-col>
								</v-row>
							</v-container>
							<small>*indicates required field</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="white darken-4" text @click="dialog = false">
								Cancel
							</v-btn>
							<!-- <v-btn color="white darken-4" text type="submit">
								Add Product
							</v-btn> -->

							<v-btn
								:disabled="dialog2"
								:loading="dialog2"
								class="white--text"
								color="white darken-4"
								text
								type="submit"
							>
								Add Product
							</v-btn>
							<v-dialog v-model="dialog2" hide-overlay persistent width="300">
								<v-card color="white" light>
									<v-card-text>
										<p mt-5>Adding product. Please wait.</p>
										<v-progress-linear
											indeterminate
											color="black"
											class="mb-0 mt-5"
										></v-progress-linear>
									</v-card-text>
								</v-card>
							</v-dialog>
						</v-card-actions>
					</form>
				</v-card>
			</v-dialog>
		</div>

		<div class="contents">
			<div v-if="load" class="loading">
				Loading...
			</div>

			<div v-if="error" class="error">
				{{ this.$router.push("/accessdenied") }}
			</div>

			<div v-if="fetched" class="">
				<v-container v-if="products.length != 0">
					<v-row>
						<v-col v-for="product in products" :key="product.id" cols="3">
							<v-card class="product" height="250" width="250" dark>
								<router-link :to="`products/${product.id}/accounts`" exact>
									<v-img
										class="white--text align-end"
										height="200px"
										:src="'http://localhost:3000/' + product.product_image"
									>
									</v-img>
								</router-link>

								<v-card-subtitle class="pb-0">
									<div class="label">
										<p>{{ product.product_name }}</p>

										<div class="icoCon" v-show="edit">
											<div class="ico">
												<v-dialog
													transition="dialog-bottom-transition"
													max-width="600"
												>
													<template v-slot:activator="{ on, attrs }">
														<v-btn
															color="success"
															fab
															x-small
															dark
															v-bind="attrs"
															v-on="on"
															><v-icon>mdi-pencil</v-icon></v-btn
														>
													</template>

													<template v-slot:default="dialog">
														<v-card dark>
															<form
																action=""
																@submit.prevent=""
																enctype="multipart/form-data"
															>
																<v-card-title>
																	<span class="headline">Update Product</span>
																</v-card-title>
																<v-card-text>
																	<v-container>
																		<v-row>
																			<v-col cols="6">
																				<v-text-field
																					label="Product Name*"
																					required
																					v-model.lazy="productName"
																				></v-text-field>
																			</v-col>
																			<v-col cols="6">
																				<v-file-input
																					label="Product Image*"
																					filled
																					prepend-icon="mdi-camera"
																					@change="imageFile"
																				></v-file-input>
																			</v-col>
																		</v-row>
																	</v-container>
																	<small>*indicates required field</small>
																</v-card-text>
																<v-card-actions>
																	<v-spacer></v-spacer>
																	<v-btn
																		color="white darken-4"
																		text
																		@click="dialog.value = false"
																	>
																		Cancel
																	</v-btn>

																	<v-btn
																		:disabled="dialog3"
																		:loading="dialog3"
																		class="white--text"
																		color="white darken-4"
																		text
																		@click="updateProduct(product.id)"
																		type="submit"
																	>
																		Save Product
																	</v-btn>
																	<v-dialog
																		v-model="dialog3"
																		hide-overlay
																		persistent
																		width="300"
																	>
																		<v-card color="white" light>
																			<v-card-text>
																				<p mt-5>
																					Updating product. Please wait.
																				</p>
																				<v-progress-linear
																					indeterminate
																					color="black"
																					class="mb-0 mt-5"
																				></v-progress-linear>
																			</v-card-text>
																		</v-card>
																	</v-dialog>
																</v-card-actions>
															</form>
														</v-card>
													</template>
												</v-dialog>
											</div>

											<div class="ico">
												<v-dialog persistent max-width="290">
													<template v-slot:activator="{ on, attrs }">
														<v-btn
															color="error"
															fab
															x-small
															dark
															v-bind="attrs"
															v-on="on"
														>
															<v-icon dark>
																mdi-minus
															</v-icon>
														</v-btn>
													</template>

													<template v-slot:default="dialog">
														<v-card dark>
															<v-card-title class="headline">
																Delete Product?
															</v-card-title>
															<v-card-text
																>Deleting this product will delete all records
																including the accounts and the
																profiles.</v-card-text
															>
															<v-card-actions>
																<v-spacer></v-spacer>
																<v-btn
																	color="white darken-1"
																	text
																	@click="dialog.value = false"
																>
																	Cancel
																</v-btn>

																<v-btn
																	:disabled="dialog5"
																	:loading="dialog5"
																	class="white--text"
																	color="red darken-1"
																	text
																	type="submit"
																	@click="deleteProduct(product.id, dialog)"
																>
																	Delete
																</v-btn>
																<v-dialog
																	v-model="dialog5"
																	hide-overlay
																	persistent
																	width="300"
																>
																	<v-card color="white" light>
																		<v-card-text>
																			<p mt-5>Deleting product. Please wait.</p>
																			<v-progress-linear
																				indeterminate
																				color="black"
																				class="mb-0 mt-5"
																			></v-progress-linear>
																		</v-card-text>
																	</v-card>
																</v-dialog>

																<!-- <v-btn
														color="red darken-1"
														text
														@click="dialog4 = false"
													>
														Agree
													</v-btn> -->
															</v-card-actions>
														</v-card>
													</template>
												</v-dialog>
											</div>
										</div>
									</div>
								</v-card-subtitle>
							</v-card>
						</v-col>
					</v-row>
				</v-container>

				<div class="emptyContainer" v-if="products.length == 0">
					<v-img src="../assets/empty.svg" height="230px" width="230px"></v-img>
					<h2>
						There is nothing here. Add your first ever product!
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import productAPI from "../api/productAPI";
	export default {
		name: "Home",
		data: () => ({
			dialog: false,
			dialog2: false,
			dialog3: false,
			dialog4: false,
			dialog5: false,
			edit: false,
			edit1: false,
			timeout: 2000,
			snackbar: false,
			text: "",
			loading: false,
			dialogOpen: true,
			products: [],
			success: false,
			productName: "",
			productImage: "",
			result: {},
			load: false,
			fetched: null,
			error: null,
		}),

		methods: {
			editProduct() {
				this.edit = !this.edit;
			},
			async addProduct() {
				this.dialog2 = true;
				const formData = new FormData();

				formData.append("product_name", this.productName);
				formData.append("product_image", this.productImage);
				this.result = await productAPI.prototype.addProduct(formData);
			},
			imageFile(file) {
				this.productImage = file;
			},
			async updateProduct(id) {
				const formData = new FormData();

				formData.append("product_name", this.productName);
				formData.append("product_image", this.productImage);
				await productAPI.prototype.updateSpecificProduct(id, formData);
				this.dialog3 = true;
			},
			async deleteProduct(id, dialog) {
				await productAPI.prototype.deleteSpecificProduct(id);
				this.dialog5 = true;
				dialog.value = false;
			},

			async getProducts() {
				this.error = this.fetched = null;
				this.load = true;
				try {
					this.products = await productAPI.prototype.getAllProducts();
					console.log(this.products);
					this.products = this.products.result;
					console.log(this.products);
					this.products.sort((a, b) => a.id - b.id);
					this.load = false;
					this.fetched = this.products;
				} catch (error) {
					this.error = error;
					console.log(error.status);
				}
			},
		},

		async created() {
			await this.getProducts();
			// this.products = await productAPI.prototype.getAllProducts();
			// this.products = this.products.result;
			// console.log(this.products);
		},

		watch: {
			$route: "getProducts",
			dialog2(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully added product";
					this.dialog2 = false;
					this.dialog = false;
					this.snackbar = true;
					this.products.push(this.result);
				}, 2000);
			},

			dialog3(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully updated product";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getProducts();
				}, 2000);
			},

			dialog5(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully deleted product";
					this.dialog5 = false;
					this.snackbar = true;
					this.getProducts();
				}, 2000);
			},
		},
	};
</script>

<style scoped>
	.home {
		width: 90%;
		margin: auto;
	}

	.emptyContainer {
		margin: auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.emptyContainer h2 {
		padding: 20px;
		font-size: 20px;
	}

	.headings {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40px 0px;
	}

	.product {
		cursor: pointer;
	}

	.product:hover {
		transform: scale(1.1);
		transition: 0.4s ease-in-out;
	}

	#create .v-speed-dial {
		position: absolute;
	}

	#create .v-btn--floating {
		position: relative;
	}

	.label {
		display: flex;
		justify-content: space-between;
	}

	.label .icoCon {
		display: flex;
		margin-top: -20px;
		z-index: 1;
	}

	.label .ico {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0px 4px;
	}

	.editButton {
		margin: 0px 10px;
	}

	.alert {
		display: inline-block;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: 50px 0px;
	}
</style>
