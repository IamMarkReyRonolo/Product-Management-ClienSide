<template>
	<div class="account">
		<div class="post">
			<div v-if="load" class="loading">
				Loading...
			</div>

			<div v-if="error" class="error">
				{{ redirectError() }}
			</div>

			<div v-if="fetched">
				<v-app>
					<div class="text-center mt-4">
						<v-snackbar v-model="snackbar" :timeout="timeout">
							{{ text }}

							<template v-slot:action="{ attrs }">
								<v-btn
									color="blue"
									text
									v-bind="attrs"
									@click="snackbar = false"
								>
									Close
								</v-btn>
							</template>
						</v-snackbar>
					</div>

					<div class="container">
						<div class="innerContainer" dark max-width="500">
							<div class="leftCon">
								<div class="imgCon">
									<v-card class="product" dark>
										<v-img
											class="white--text align-end"
											height="200px"
											:src="
												'https://product-management-server.herokuapp.com/' +
													product.product_image.split('/')[4]
											"
										>
										</v-img>
									</v-card>
								</div>
								<div class="detailsCon">
									<h1>{{ product.product_name }}</h1>
									<div class="accountQtyCon">
										<p>{{ product.accounts.length }} Accounts</p>
									</div>
								</div>
							</div>
							<div class="buttons">
								<v-btn
									color="dark"
									dark
									class="editButton"
									@click="editProduct"
								>
									Edit
								</v-btn>

								<v-dialog v-model="dialog" max-width="500px">
									<template v-slot:activator="{ on, attrs }">
										<v-btn color="dark" light v-bind="attrs" v-on="on">
											Add Account
										</v-btn>
									</template>
									<v-card dark>
										<form
											action=""
											@submit.prevent="addAccount"
											enctype="multipart/form-data"
										>
											<v-card-title>
												<span class="headline">Add Account</span>
											</v-card-title>
											<v-card-text>
												<v-container>
													<v-row>
														<v-col cols="12">
															<v-text-field
																label="Account Name*"
																v-model="account.name"
																required
																dense
																outlined
															></v-text-field>
														</v-col>

														<v-col cols="12">
															<v-select
																label="Account Type*"
																outlined
																dense
																required
																:items="options"
																v-model="account.type"
															></v-select>
														</v-col>

														<v-col cols="12">
															<v-text-field
																label="Account Username*"
																v-model="account.username"
																required
																dense
																outlined
															></v-text-field>
														</v-col>

														<v-col cols="12">
															<v-text-field
																label="Account Password*"
																v-model="account.password"
																required
																dense
																outlined
															></v-text-field>
														</v-col>
														<v-col cols="12">
															<v-text-field
																label="Original Price*"
																v-model="account.originalPrice"
																required
																dense
																outlined
																type="number"
															></v-text-field>
														</v-col>

														<!--  -->

														<v-col cols="12">
															<v-menu
																ref="menu"
																v-model="menu"
																:close-on-content-click="false"
																:return-value.sync="account.datePurchased"
																transition="scale-transition"
																offset-y
																min-width="auto"
																dark
															>
																<template v-slot:activator="{ on, attrs }">
																	<v-text-field
																		v-model="account.datePurchased"
																		label="Date Purchased"
																		prepend-icon="mdi-calendar"
																		readonly
																		v-bind="attrs"
																		v-on="on"
																	></v-text-field>
																</template>
																<v-date-picker
																	v-model="account.datePurchased"
																	no-title
																	scrollable
																>
																	<v-spacer></v-spacer>
																	<v-btn
																		text
																		color="primary"
																		@click="menu = false"
																	>
																		Cancel
																	</v-btn>
																	<v-btn
																		text
																		color="primary"
																		@click="
																			$refs.menu.save(account.datePurchased)
																		"
																	>
																		OK
																	</v-btn>
																</v-date-picker>
															</v-menu>
														</v-col>

														<!--  -->

														<v-col cols="12">
															<v-menu
																ref="menu2"
																v-model="menu2"
																:close-on-content-click="false"
																:return-value.sync="account.dateExpires"
																transition="scale-transition"
																offset-y
																min-width="auto"
																dark
															>
																<template v-slot:activator="{ on, attrs }">
																	<v-text-field
																		v-model="account.dateExpires"
																		label="Date Expires"
																		prepend-icon="mdi-calendar"
																		readonly
																		v-bind="attrs"
																		v-on="on"
																	></v-text-field>
																</template>
																<v-date-picker
																	v-model="account.dateExpires"
																	no-title
																	scrollable
																>
																	<v-spacer></v-spacer>
																	<v-btn
																		text
																		color="primary"
																		@click="menu2 = false"
																	>
																		Cancel
																	</v-btn>
																	<v-btn
																		text
																		color="primary"
																		@click="
																			$refs.menu2.save(account.dateExpires)
																		"
																	>
																		OK
																	</v-btn>
																</v-date-picker>
															</v-menu>
														</v-col>

														<!--  -->
													</v-row>
												</v-container>
												<small>*indicates required field</small>
											</v-card-text>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="white darken-4"
													text
													@click="dialog = false"
												>
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
												<v-dialog
													v-model="dialog2"
													hide-overlay
													persistent
													width="300"
												>
													<v-card color="white" light>
														<v-card-text>
															<p mt-5>Adding account. Please wait.</p>
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
						</div>
					</div>
					<div class="container1">
						<div class="innerContainer">
							<v-card>
								<v-tabs color="deep-black accent-4" left>
									<v-tab>Accounts</v-tab>

									<v-tab @click="count = count + 1">Accounting</v-tab>

									<v-tab-item>
										<AccountsList
											:product="product"
											:edit="edit"
											:userId="userId"
											v-on:getProduct="getProduct(id)"
										></AccountsList>
									</v-tab-item>

									<v-tab-item>
										<AccountingView
											:productId="product.id"
											:productAccounting="productAccounting"
											:key="count"
										></AccountingView>
									</v-tab-item>
								</v-tabs>
							</v-card>
						</div>
					</div>
				</v-app>
			</div>
		</div>
	</div>
</template>

<script>
	import productAPI from "../api/productAPI";
	import AccountsList from "../views/AccountsList";
	import accountsAPI from "../api/accountsAPI";
	import AccountingView from "../views/AccountingView";
	import accountingAPI from "../api/accountingAPI";
	export default {
		name: "Accounts",
		props: { userId: Number },
		data() {
			return {
				count: 0,
				dialog: false,
				dialog2: false,
				id: this.$route.params.id,
				product: {},
				loaded: false,
				tab: null,

				edit: false,
				text: "",
				timeout: 2000,
				snackbar: false,
				account: {
					name: "",
					type: "",
					username: "",
					password: "",
					originalPrice: 0,

					datePurchased: new Date().toISOString().substr(0, 10),
					dateExpires: new Date().toISOString().substr(0, 10),
				},
				options: ["Solo", "Shared"],
				menu: false,
				menu2: false,
				result: {},
				load: false,
				fetched: null,
				error: null,
				productAccounting: {},
			};
		},
		components: {
			AccountsList,
			AccountingView,
		},
		methods: {
			redirectError() {
				if (this.error.message == "Request failed with status code 404") {
					this.$router.push("/notfound");
				} else {
					this.$router.push("/accessdenied");
				}
			},
			editProduct() {
				this.edit = !this.edit;
			},
			async getProductAccounting(id) {
				const result = await accountingAPI.prototype.getAccounting(id);
				this.productAccounting.accounting = result.data.accounting;
				this.productAccounting.logs = result.data.logs;
			},
			async getProduct(id) {
				this.error = this.fetched = null;
				this.load = true;
				try {
					this.product = await productAPI.prototype.getSpecificProduct(
						this.userId,
						id
					);

					this.product = this.product.data[0];

					this.product.accounts.sort((a, b) => a.id - b.id);
					this.getProductAccounting(id);

					this.fetched = this.product;
					this.load = false;
				} catch (error) {
					this.error = error;
				}
			},

			async addAccount() {
				try {
					this.dialog2 = true;

					const data = {
						account_name: this.account.name,
						account_type: this.account.type,
						account_username: this.account.username,
						account_password: this.account.password,
						original_price: this.account.originalPrice,
						date_purchased: new Date(this.account.datePurchased + "Z"),
						date_expires: new Date(this.account.dateExpires + "Z"),
					};

					this.result = await accountsAPI.prototype.addAccount(this.id, data);
					this.getProductAccounting(this.id);

					this.text = "Successfully added account";
					this.dialog2 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getProduct(this.id);
				} catch (error) {
					this.dialog2 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error adding account.";
					}

					this.snackbar = true;
				}
			},
		},

		async created() {
			await this.getProduct(this.id);
		},

		computed: {
			dateRangeText() {
				return this.dates.join(" ~ ");
			},
		},

		watch: {
			$route: "getProduct",
		},
	};
</script>

<style scoped>
	.account {
		width: 90%;
		margin: auto;
	}

	.container {
		margin: auto;
		margin-top: 0px;
		margin-bottom: 0px;
		padding-top: 0px;
	}

	.container .innerContainer {
		border: 1px solid black;
		width: 95%;
		margin: auto;
		padding: 20px;
		display: flex;
		border-radius: 10px;
		background-color: rgb(49, 49, 49);
		justify-content: space-between;
	}

	.container .leftCon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container .imgCon {
		width: 220px;
		height: 220px;
		border: 1px solid black;
		margin: 20px 20px;
		background-color: black;
		border-radius: 10px;
	}

	.container .detailsCon {
		height: 220px;
		margin: 20px 5px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}

	.container .detailsCon h1 {
		font-size: 80px;
		color: white;
	}

	.container .accountQtyCon {
		color: rgb(41, 41, 41);
		font-size: 20px;
		padding: 2px 20px;
		border: 1px solid white;
		border-radius: 20px;
		display: inline;
		width: 180px;
		text-align: center;
		background-color: white;
		font-weight: 700;
	}

	.container .accountQtyCon p {
		padding: 0px;
		margin: 0px;
	}

	.container .buttons {
		display: flex;
		color: white;
		justify-content: space-evenly;
		align-items: flex-end;
		width: 250px;
		margin-bottom: 0px;
	}

	.container1 {
		width: 95%;
		margin: auto;
		margin-top: 0px;
	}

	.container1 .innerContainer {
		width: 95%;
		margin: 0px auto;
		padding: 20px;
		padding: 0px 20px;
	}

	.content {
		height: 180px;
		background-color: rgba(0, 0, 0, 0.555);

		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h3 {
		color: white;
		background-color: rgb(7, 109, 7);
		padding: 0px 5px;
		border-radius: 20px;
	}

	.label {
		display: flex;
		justify-content: space-between;
	}

	.label .icoCon {
		display: flex;
		margin-top: -12px;
		z-index: 1;
	}

	.label .ico {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0px 2px;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: 50px 0px;
	}
</style>
