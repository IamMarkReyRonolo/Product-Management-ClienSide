<template>
	<div class="customers">
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
			<h1 class="display-2 font-weight-bold">MY CUSTOMERS</h1>
			<v-spacer></v-spacer>
			<v-btn color="dark" light class="editButton" @click="editAccount">
				Edit
			</v-btn>
			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="dark" dark v-bind="attrs" v-on="on">
						Add Customer
					</v-btn>
				</template>
				<v-card dark>
					<form
						action=""
						@submit.prevent="addCustomer"
						enctype="multipart/form-data"
					>
						<v-card-title>
							<span class="headline">Add Customer</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field
											label="First Name*"
											required
											v-model="customer.customer_firstname"
										></v-text-field>
									</v-col>

									<v-col cols="12">
										<v-text-field
											label="Last Name*"
											required
											v-model="customer.customer_lastname"
										></v-text-field>
									</v-col>

									<v-col cols="12">
										<v-text-field
											label="Phone*"
											required
											v-model="customer.customer_phone"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											label="Email*"
											required
											v-model="customer.customer_email"
										></v-text-field>
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
								Add Customer
							</v-btn>
							<v-dialog v-model="dialog2" hide-overlay persistent width="300">
								<v-card color="white" light>
									<v-card-text>
										<p mt-5>Adding Customer. Please wait.</p>
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

			<div v-if="error" class="error">{{ error }}F</div>

			<div v-if="fetched">
				<v-container v-if="customers.length != 0">
					<v-row>
						<v-col v-for="customer in customers" :key="customer.id" cols="3">
							<v-card class="mx-auto" max-width="344" outlined dark>
								<v-list-item three-line>
									<v-list-item-content>
										<div class="overline mb-4">
											{{ customer.profiles.length }} Profiles
										</div>
										<v-list-item-title class="overline mb-2">
											{{ customer.customer_firstname }}
											{{ customer.customer_lastname }}
										</v-list-item-title>
										<v-list-item-subtitle>
											{{ customer.customer_phone }}</v-list-item-subtitle
										>
									</v-list-item-content>

									<v-list-item-avatar tile size="70" color="grey">
										<img
											src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png"
											alt=""
									/></v-list-item-avatar>
								</v-list-item>

								<v-card-actions>
									<v-btn
										outlined
										rounded
										text
										light
										class="white mb-2 ml-2"
										:to="`/customers/${customer.id}`"
									>
										View Customer
									</v-btn>
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
																<span class="headline">Update Customer</span>
															</v-card-title>
															<v-card-text>
																<v-container>
																	<v-row>
																		<v-col cols="12">
																			<v-text-field
																				label="First Name*"
																				required
																				v-model="newCustomer.customer_firstname"
																			></v-text-field>
																		</v-col>

																		<v-col cols="12">
																			<v-text-field
																				label="Last Name*"
																				required
																				v-model="newCustomer.customer_lastname"
																			></v-text-field>
																		</v-col>

																		<v-col cols="12">
																			<v-text-field
																				label="Phone*"
																				required
																				v-model="newCustomer.customer_phone"
																			></v-text-field>
																		</v-col>
																		<v-col cols="12">
																			<v-text-field
																				label="Email*"
																				required
																				v-model="newCustomer.customer_email"
																			></v-text-field>
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
																	@click="updateCustomer(customer.id)"
																	type="submit"
																>
																	Save Customer
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
																				Updating customer. Please wait.
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
															Delete Customer?
														</v-card-title>
														<v-card-text
															>Deleting this customer will delete all records
															including profiles related to this</v-card-text
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
																@click="deleteCustomer(customer.id, dialog)"
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
																		<p mt-5>Deleting customer. Please wait.</p>
																		<v-progress-linear
																			indeterminate
																			color="black"
																			class="mb-0 mt-5"
																		></v-progress-linear>
																	</v-card-text>
																</v-card>
															</v-dialog>
														</v-card-actions>
													</v-card>
												</template>
											</v-dialog>
										</div>
									</div>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>

				<div class="emptyContainer" v-if="customers.length == 0">
					<v-img src="../assets/emptyCustomer.svg" width="350px"></v-img>
					<h2>
						No customers yet? Don't give up! You can do this!
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import customerAPI from "../api/customerAPI";

	export default {
		name: "Customers",
		data: () => ({
			load: false,
			fetched: null,
			error: null,
			customers: [],
			dialog: false,
			dialog2: false,
			dialog3: false,
			dialog4: false,
			dialog5: false,
			edit: false,
			timeout: 2000,
			snackbar: false,
			text: "",
			result: {},
			customer: {
				customer_firstname: "",
				customer_lastname: "",
				customer_phone: "",
				customer_email: "",
			},
			newCustomer: {
				customer_firstname: "",
				customer_lastname: "",
				customer_phone: "",
				customer_email: "",
			},
		}),
		methods: {
			async addCustomer() {
				this.dialog2 = true;
				this.result = await customerAPI.prototype.addCustomer(this.customer);
			},
			async getCustomers() {
				this.error = this.fetched = null;
				this.load = true;
				try {
					this.customers = await customerAPI.prototype.getAllCustomers();
					this.customers.sort((a, b) => a.id - b.id);
					console.log(this.customers);
					this.load = false;
					this.fetched = this.customers;
				} catch (error) {
					this.error = error;
				}
			},
			editAccount() {
				this.edit = !this.edit;
			},
			async updateCustomer(id) {
				// const formData = new FormData();

				// formData.append("product_name", this.productName);
				// formData.append("product_image", this.productImage);
				console.log("------------------");
				console.log(this.newCustomer);
				console.log("------------------");
				await customerAPI.prototype.updateSpecificCustomer(
					id,
					this.newCustomer
				);
				this.dialog3 = true;
			},
			async deleteCustomer(id, dialog) {
				await customerAPI.prototype.deleteSpecificCustomer(id);
				this.dialog5 = true;
				dialog.value = false;
			},
		},
		async created() {
			await this.getCustomers();
			// this.products = await productAPI.prototype.getAllProducts();
			// this.products = this.products.result;
			// console.log(this.products);
		},
		watch: {
			dialog2(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully added customer";
					this.dialog2 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getCustomers();
					// this.customers.push(this.result);
				}, 2000);
			},
			dialog3(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully updated customer";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getCustomers();
				}, 2000);
			},

			dialog5(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully deleted customer";
					this.dialog5 = false;
					this.snackbar = true;
					this.getCustomers();
				}, 2000);
			},
		},
	};
</script>

<style scoped>
	.customers {
		width: 90%;
		margin: auto;
	}

	.headings {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40px auto;
	}

	.editButton {
		margin: 0px 10px;
	}

	.icoCon {
		display: flex;
		margin-left: auto;
	}
	.ico {
		margin: 0px 5px;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: 50px 0px;
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
</style>
