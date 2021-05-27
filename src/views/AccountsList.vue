<template>
	<div>
		<v-container fluid v-show="prod.accounts.length != 0">
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

			<div class="legend">
				<div class="legendCon">
					<div class="con">
						<div class="normal"></div>
						<p>Good</p>
					</div>
					<div class="con">
						<div class="warning"></div>
						<p>Less than 2 days to expire</p>
					</div>
					<div class="con">
						<div class="error"></div>
						<p>Expired</p>
					</div>
				</div>
			</div>
			<div class="searchCon">
				<v-text-field
					label="Search"
					placeholder="Search"
					solo
					dense
					v-model="search"
				></v-text-field>
			</div>
			<v-row>
				<v-col v-for="account in filteredAccounts" :key="account.id" cols="3">
					<v-card height="250" width="250" dark class="acc">
						<router-link
							style="text-decoration: none; color: inherit;"
							:userId="userId"
							:to="`accounts/${account.id}`"
							exact
						>
							<v-img
								class="white--text align-end"
								height="180px"
								:src="prod.product_image"
							>
								<div class="content">
									<h1>{{ account.account_name }}</h1>
									<p
										:class="
											Date.now() > new Date(account.date_expires)
												? 'expired'
												: checkDate(account)
												? 'warning'
												: 'normal'
										"
									>
										Expires:
										{{
											new Date(account.date_expires).toString().split(" ")[1]
										}}
										{{
											new Date(account.date_expires).toString().split(" ")[2]
										}},
										{{
											new Date(account.date_expires).toString().split(" ")[3]
										}}
									</p>
								</div>
							</v-img>
						</router-link>
						<v-card-subtitle class="pb-0">
							<div class="label">
								<h3>{{ account.account_type }}</h3>
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
													@click="setDefaultValues(account)"
													><v-icon>mdi-pencil</v-icon></v-btn
												>
											</template>

											<template v-slot:default="dialog">
												<v-card dark>
													<form
														action=""
														@submit.prevent="updateAccount(account.id)"
														enctype="multipart/form-data"
													>
														<v-card-title>
															<span class="headline">Update Account</span>
														</v-card-title>
														<v-card-text>
															<v-container>
																<v-row>
																	<v-col cols="12">
																		<v-text-field
																			label="Account Name*"
																			v-model="newAcc.name"
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
																			:items="options"
																			required
																			v-model="newAcc.type"
																		></v-select>
																	</v-col>

																	<v-col cols="12">
																		<v-text-field
																			label="Account Username*"
																			v-model="newAcc.username"
																			required
																			dense
																			outlined
																		></v-text-field>
																	</v-col>

																	<v-col cols="12">
																		<v-text-field
																			label="Account Password*"
																			v-model="newAcc.password"
																			required
																			dense
																			outlined
																		></v-text-field>
																	</v-col>
																	<v-col cols="12">
																		<v-text-field
																			label="Original Price*"
																			v-model="newAcc.originalPrice"
																			required
																			dense
																			outlined
																			type="number"
																		></v-text-field>
																	</v-col>

																	<!--  -->

																	<v-col cols="6">
																		<p>Date Purchased</p>
																		<input
																			type="date"
																			name=""
																			id=""
																			required
																			v-model="newAcc.date_purchased"
																			class="dateInput"
																		/>
																	</v-col>

																	<!--  -->

																	<v-col cols="6">
																		<p>Date Expires</p>
																		<input
																			type="date"
																			name=""
																			id=""
																			v-model="newAcc.date_expires"
																			class="dateInput"
																			required
																		/>
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
																type="submit"
															>
																Save Account
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
														Delete Account?
													</v-card-title>
													<v-card-text
														>Deleting this account will delete all records below
														this account including the profiles</v-card-text
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
															@click="deleteAccount(account.id, dialog)"
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
																	<p mt-5>
																		Deleting product. Please wait.
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

		<div class="emptyContainer" v-show="prod.accounts.length == 0">
			<img src="../assets/empty2.svg" />

			<h2>
				This product has no accounts yet. Add account now.
			</h2>
		</div>
	</div>
</template>

<script>
	import accountsAPI from "../api/accountsAPI";

	export default {
		name: "AccountsList",
		props: {
			product: Object,
			edit: Boolean,
			userId: Number,
		},
		data() {
			return {
				dialog: false,
				dialog3: false,
				dialog5: false,
				id: this.$route.params.id,
				loaded: false,
				text: "",
				timeout: 2000,
				snackbar: false,
				tab: null,
				prod: this.product,
				newAcc: {
					name: "",
					type: "",
					username: "",
					password: "",
					originalPrice: 0,

					date_purchased: new Date().toISOString().substr(0, 10),
					date_expires: new Date().toISOString().substr(0, 10),
				},
				options: ["Solo", "Shared"],
				menu01: false,
				menu02: false,
				search: "",
			};
		},
		methods: {
			setDefaultValues(account) {
				this.newAcc.name = account.account_name;
				this.newAcc.type = account.account_type;
				this.newAcc.username = account.account_username;
				this.newAcc.password = account.account_password;
				this.newAcc.originalPrice = account.original_price;
				this.newAcc.date_purchased = account.date_purchased
					.toString()
					.substr(0, 10);
				this.newAcc.date_expires = account.date_expires
					.toString()
					.substr(0, 10);
			},
			checkDate(account) {
				return (new Date(account.date_expires) - Date.now()) / 86400000 <= 2;
			},
			editProduct() {
				this.edit = !this.edit;
			},

			async deleteAccount(accountId, dialog) {
				try {
					this.dialog5 = true;
					dialog.value = false;
					const productId = this.id;
					await accountsAPI.prototype.deleteSpecificAccount(
						this.userId,
						productId,
						accountId
					);
					this.text = "Successfully deleted account";
					this.dialog5 = false;
					this.snackbar = true;
					this.$emit("getProduct");
				} catch (error) {
					this.dialog5 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error deleting customer.";
					}

					this.snackbar = true;
				}
			},
			async updateAccount(accountId) {
				try {
					this.dialog3 = true;
					const productId = this.id;
					const data = {
						account_name: this.newAcc.name,
						account_type: this.newAcc.type,
						account_username: this.newAcc.username,
						account_password: this.newAcc.password,
						original_price: this.newAcc.originalPrice,
						date_purchased: new Date(this.newAcc.date_purchased + "Z"),
						date_expires: new Date(this.newAcc.date_expires + "Z"),
					};

					await accountsAPI.prototype.updateSpecificAccount(
						this.userId,
						productId,
						accountId,
						data
					);

					this.text = "Successfully updated account";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.$emit("getProduct");
				} catch (error) {
					this.dialog3 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error deleting customer.";
					}

					this.snackbar = true;
				}
			},
		},

		// mounted() {
		// 	this.getProduct(this.id);
		// },
		computed: {
			filteredAccounts: function() {
				return this.prod.accounts.filter((account) => {
					return account.account_name
						.toLowerCase()
						.includes(this.search.toLowerCase());
				});
			},
		},
	};
</script>

<style scoped>
	.emptyContainer {
		margin: -10px auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0px;
	}

	.emptyContainer img {
		width: 250px;
		height: 250px;
	}
	.emptyContainer h2 {
		padding: 0px;
		font-size: 20px;
		margin-top: -20px;
		padding-bottom: 40px;
	}
	.account {
		width: 90%;
		margin: auto;
	}

	.container {
		margin: auto;
		margin-top: 30px;
		margin-bottom: 0px;
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
		color: white;
		font-size: 20px;
		padding: 2px 20px;
		border: 1px solid white;
		border-radius: 20px;
		display: inline;
		width: 150px;
		text-align: center;
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

	.acc:hover {
		transform: scale(1.05);
		transition: 0.4s ease-in-out;
	}

	.content {
		height: 200px;
		background-color: rgba(0, 0, 0, 0.658);
		flex-direction: column;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		text-align: center;
	}

	.content h1 {
		text-align: center;
		font-size: 25px;
		padding: 0px 10px;
		color: white;
		background-color: #1e1e1e80;
		border-radius: 20px;
		margin-top: 60px;
	}

	.content .normal {
		background-color: rgb(206, 206, 206);
		border-radius: 20px;
		color: #1e1e1e;
		padding: 5px 10px;
		font-weight: bolder;
	}

	.label h3 {
		color: rgb(206, 206, 206);
		background-color: #131313;
		padding: 5px 10px;
		border-radius: 20px;
		font-size: 20px;
	}

	.label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.label .icoCon {
		display: flex;
		z-index: 1;
	}

	.label .ico {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0px 2px;
	}

	.dateInput {
		padding: 5px 10px;
		font-size: 18px;
		cursor: pointer;
		border: 1px solid grey;
		color: rgb(223, 223, 223);
		border-radius: 5px;
	}

	::-webkit-calendar-picker-indicator {
		background-color: white;
		cursor: pointer;
	}

	.searchCon {
		width: 300px;
		margin: 0px auto;
		margin-top: -40px;
		margin-bottom: 10px;
		text-align: center;
	}

	.expired {
		background-color: rgb(224, 64, 64);
		border-radius: 20px;
		color: #e1e1e1;
		padding: 5px 10px;
		font-weight: bolder;
	}

	.warning {
		background-color: rgb(255, 236, 61);
		border-radius: 20px;
		color: #1e1e1e;
		padding: 5px 10px;
		font-weight: bolder;
	}

	.legend {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 500px;
		margin-left: auto;
		margin-top: -20px;
	}

	.legend .normal,
	.legend .warning,
	.legend .error {
		width: 8px;
		height: 8px;
		padding: 8px;
		border-radius: 100%;
		border: 1px solid grey;
		margin: 5px;
		cursor: pointer;
	}

	.legendCon {
		display: flex;
	}

	.legend .normal {
		background-color: #e1e1e1;
		border: 1px solid grey;
	}

	.con {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.con p {
		margin: 5px;
		font-size: 12px;
	}
</style>
