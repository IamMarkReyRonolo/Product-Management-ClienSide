<template>
	<div class="specAccount">
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

		<div v-if="load" class="loading">
			<v-progress-circular
				:size="70"
				:width="7"
				color="blue"
				indeterminate
			></v-progress-circular>
		</div>

		<div v-if="error" class="error">
			{{ redirectError() }}
		</div>

		<div v-if="fetched" class="">
			<v-btn
				@click="hasHistory() ? $router.go(-1) : $router.push('/')"
				class="my-5 btn btn-outline-success"
			>
				&laquo; Back
			</v-btn>
			<h1 class="display-2 font-weight-bold">{{ account.account_name }}</h1>
			<div class="container1">
				<div class="inner">
					<div class="div">
						<h2>Product:</h2>
						<h2 class="con">{{ account.product.product_name }}</h2>
					</div>
					<div class="div">
						<h2>Type:</h2>
						<h2 class="con">{{ account.account_type }}</h2>
					</div>
					<div class="div">
						<h2>Price:</h2>
						<h2 class="con">₱ {{ account.original_price }}</h2>
					</div>
				</div>
				<div class="inner">
					<div>
						<h2>Credentials:</h2>
						<div class="group">
							<h2 class="con cred">{{ account.account_username }}</h2>
							<h2 class="con cred">{{ account.account_password }}</h2>
						</div>
					</div>
				</div>

				<div class="inner">
					<div>
						<h2>Date:</h2>
						<div class="group">
							<div class="div">
								<h3>Purchased</h3>
								<h2 class="con">
									{{
										new Date(account.date_purchased).toString().split(" ")[1]
									}}
									{{
										new Date(account.date_purchased).toString().split(" ")[2]
									}},
									{{
										new Date(account.date_purchased).toString().split(" ")[3]
									}}
								</h2>
							</div>

							<div class="div">
								<h3>Expires</h3>
								<h2 class="con">
									{{ new Date(account.date_expires).toString().split(" ")[1] }}
									{{ new Date(account.date_expires).toString().split(" ")[2] }},
									{{ new Date(account.date_expires).toString().split(" ")[3] }}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="profileContainer">
				<div class="profHead">
					<h2>Customers:</h2>
					<v-btn color="dark" light class="editButton" @click="editProfile">
						Edit
					</v-btn>
				</div>

				<div class="innerProfCon">
					<div class="division">
						<div class="header">
							<h3>Name</h3>
							<h3>Pin</h3>
							<h3>Status</h3>
							<h3>Subscription Price</h3>
							<h3>Subscription Expires</h3>
						</div>
						<div class="buttons extension" v-show="edit"></div>
					</div>

					<router-link
						:to="'/customers/' + customer.id"
						custom
						v-slot="{ navigate }"
						v-for="customer in account.customers"
						:key="customer.id"
						exact
					>
						<div class="division" @click="navigate" role="link">
							<div
								class="profiles"
								:class="
									Date.now() > new Date(customer.profile.subscription_expires)
										? 'error'
										: checkDate(customer)
										? 'warning'
										: ''
								"
							>
								<h3>
									{{ customer.customer_firstname }}
									{{ customer.customer_lastname }}
								</h3>
								<h3>{{ customer.profile.profile_pin }}</h3>
								<h3
									:class="
										customer.profile.subscription_status == 'Unpaid'
											? 'unpaid'
											: ''
									"
								>
									{{ customer.profile.subscription_status }}
								</h3>

								<h3>{{ customer.profile.subscription_price }}</h3>
								<h3>
									{{
										new Date(customer.profile.subscription_expires)
											.toString()
											.split(" ")[1]
									}}
									{{
										new Date(customer.profile.subscription_expires)
											.toString()
											.split(" ")[2]
									}},
									{{
										new Date(customer.profile.subscription_expires)
											.toString()
											.split(" ")[3]
									}}
								</h3>
							</div>

							<div class="buttons" v-show="edit">
								<div class="icoCon">
									<div class="ico">
										<v-dialog
											transition="dialog-bottom-transition"
											max-width="550"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													color="success"
													fab
													x-small
													dark
													v-bind="attrs"
													v-on="on"
													@click="setDefaultValues(customer.profile)"
													><v-icon>mdi-pencil</v-icon></v-btn
												>
											</template>

											<template v-slot:default="dialog">
												<v-card dark>
													<form
														action=""
														@submit.prevent="
															updateProfile(account.id, customer.id)
														"
														enctype="multipart/form-data"
													>
														<v-card-title>
															<span class="headline">Update Profile</span>
														</v-card-title>
														<v-card-text>
															<v-container>
																<v-row>
																	<v-col cols="12">
																		<v-text-field
																			label="Profile Pin*"
																			v-model="profile.profile_pin"
																			required
																			type="number"
																			dense
																			outlined
																		></v-text-field>
																	</v-col>

																	<v-col cols="12">
																		<v-select
																			label="Profile Status*"
																			outlined
																			dense
																			required
																			:items="options"
																			v-model="profile.subscription_status"
																		></v-select>
																	</v-col>

																	<v-col cols="12">
																		<v-text-field
																			label="Subscription Price*"
																			v-model="profile.subscription_price"
																			required
																			dense
																			type="number"
																			outlined
																		></v-text-field>
																	</v-col>

																	<!--  -->

																	<v-col cols="6">
																		<p>Subscription Purchased*</p>
																		<input
																			type="date"
																			name=""
																			id=""
																			v-model="profile.subscription_purchased"
																			class="dateInput"
																			required
																		/>
																	</v-col>

																	<!--  -->

																	<v-col cols="6">
																		<p>Subscription Expires*</p>
																		<input
																			type="date"
																			name=""
																			id=""
																			v-model="profile.subscription_expires"
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
																Save Profile
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
																			Updating profile. Please wait.
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
														Delete Profile?
													</v-card-title>
													<v-card-text
														>Deleting this profile will delete all records
														including the recorded profile from the
														customer.</v-card-text
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
															@click="
																deleteProfile(account.id, customer.id, dialog)
															"
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
																	<p mt-5>Deleting profile. Please wait.</p>
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
						</div>
					</router-link>

					<div class="division">
						<div class="addProf">
							<v-dialog v-model="dialog" max-width="700px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										color="dark"
										light
										v-bind="attrs"
										v-on="on"
										@click="setFormEmpty()"
									>
										Add Profile
									</v-btn>
								</template>
								<v-card dark max-width="700px">
									<v-stepper v-model="e1">
										<v-stepper-header>
											<v-stepper-step :complete="e1 > 1" step="1">
												Profile Details
											</v-stepper-step>

											<v-divider></v-divider>

											<v-stepper-step :complete="e1 > 2" step="2">
												Add Customer
											</v-stepper-step>

											<v-divider></v-divider>
										</v-stepper-header>
										<form
											action=""
											enctype="multipart/form-data"
											@submit.prevent="addProfile"
										>
											<v-stepper-items>
												<v-stepper-content step="1">
													<v-card-title>
														<span class="headline">Create Profile</span>
													</v-card-title>
													<v-card-text>
														<v-container>
															<v-row>
																<v-col cols="12">
																	<v-text-field
																		label="Profile Pin*"
																		v-model="profile.profile_pin"
																		required
																		dense
																		outlined
																		type="number"
																	></v-text-field>
																</v-col>

																<v-col cols="12">
																	<v-select
																		label="Profile Status*"
																		outlined
																		dense
																		:items="options"
																		v-model="profile.subscription_status"
																		required
																	></v-select>
																</v-col>

																<v-col cols="12">
																	<v-text-field
																		label="Subscription Price*"
																		v-model="profile.subscription_price"
																		required
																		dense
																		outlined
																		type="number"
																	></v-text-field>
																</v-col>

																<!--  -->

																<v-col cols="6">
																	<p>Subscription Purchased*</p>
																	<input
																		type="date"
																		name=""
																		v-model="profile.subscription_purchased"
																		class="dateInput"
																		required
																		@change="setDefaultExpiration()"
																	/>
																</v-col>

																<!--  -->

																<v-col cols="6">
																	<p>Subscription Expires*</p>
																	<input
																		type="date"
																		name=""
																		v-model="profile.subscription_expires"
																		class="dateInput"
																		required
																	/>
																</v-col>

																<!--  -->
															</v-row>
														</v-container>
														<small>*indicates required field</small>
													</v-card-text>

													<v-btn color="primary" light @click="e1 = 2">
														Continue
													</v-btn>

													<v-btn text @click="dialog = false">
														Cancel
													</v-btn>
												</v-stepper-content>

												<v-stepper-content step="2">
													<v-card-title>
														<span class="headline">Add Customer</span>
														<v-spacer></v-spacer>
														<v-btn
															color="primary"
															@click="addExisting = !addExisting"
														>
															<p v-if="!addExisting" class="buttonlabel">
																Add Existing
															</p>
															<p v-else class="buttonlabel">Add New</p>
														</v-btn>
													</v-card-title>
													<v-card-text v-if="addExisting == false">
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
																		type="number"
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

													<v-card-text v-if="addExisting == true">
														<v-container>
															<v-row>
																<v-col cols="12">
																	<h2>Select Customer*</h2>
																	<v-radio-group
																		class="ml-10"
																		v-model="selectedCustomerId"
																		required
																	>
																		<v-radio
																			v-for="cus in customers"
																			:key="cus.id"
																			:label="
																				cus.customer_firstname +
																					' ' +
																					cus.customer_lastname
																			"
																			:value="cus.id"
																		>
																		</v-radio>
																	</v-radio-group>
																</v-col>
															</v-row>
														</v-container>
														<small>*indicates required field</small>
													</v-card-text>

													<v-btn
														:disabled="dialog2"
														:loading="dialog2"
														color="primary"
														light
														type="submit"
													>
														Add Profile
													</v-btn>
													<v-dialog
														v-model="dialog2"
														hide-overlay
														persistent
														width="300"
													>
														<v-card color="white" light>
															<v-card-text>
																<p mt-5>
																	Adding profile. Please wait.
																</p>
																<v-progress-linear
																	indeterminate
																	color="black"
																	class="mb-0 mt-5"
																></v-progress-linear>
															</v-card-text>
														</v-card>
													</v-dialog>

													<v-btn text @click="e1 = 1">
														Back
													</v-btn>
												</v-stepper-content>
											</v-stepper-items>
										</form>
									</v-stepper>
								</v-card>
							</v-dialog>
						</div>
						<div class="buttons extension" v-show="edit"></div>
					</div>
				</div>
			</div>

			<!-- <p>{{ account }}</p> -->
		</div>
	</div>
</template>

<script>
	import accountsAPI from "../api/accountsAPI";
	import profileAPI from "../api/profileAPI";
	import customerAPI from "../api/customerAPI";
	export default {
		name: "SpecificAccount",

		props: { userId: Number },
		data: () => {
			return {
				account: {},
				load: false,
				fetched: null,
				error: null,
				edit: false,
				dialog: false,
				dialog2: false,
				dialog3: false,
				dialog4: false,
				dialog5: false,
				timeout: 2000,
				snackbar: false,
				text: "",
				profile: {
					profile_pin: "",
					subscription_status: "",
					subscription_price: 0,
					subscription_purchased: new Date().toISOString().substr(0, 10),
					subscription_expires: new Date().toISOString().substr(0, 10),
				},
				customer: {
					customer_firstname: "",
					customer_lastname: "",
					customer_phone: "",
					customer_email: "",
				},
				customers: [],
				options: ["Paid", "Unpaid"],
				e1: 1,
				addExisting: false,
				selectedCustomerId: "",
			};
		},
		methods: {
			setDefaultExpiration() {
				this.profile.subscription_expires =
					new Date(this.profile.subscription_purchased).getTime() +
					86400000 * 30;

				this.profile.subscription_expires = new Date(
					this.profile.subscription_expires
				)
					.toISOString()
					.substr(0, 10);
			},
			setFormEmpty() {
				this.profile = {
					profile_pin: "",
					subscription_status: "",
					subscription_price: 0,
					subscription_purchased: new Date().toISOString().substr(0, 10),
					subscription_expires: new Date().toISOString().substr(0, 10),
				};
			},
			hasHistory() {
				return window.history.length > 2;
			},
			setDefaultValues(profile) {
				this.profile.profile_pin = profile.profile_pin;
				this.profile.subscription_status = profile.subscription_status;
				this.profile.subscription_price = profile.subscription_price;
				this.profile.subscription_purchased = profile.subscription_purchased
					.toString()
					.substr(0, 10);
				this.profile.subscription_expires = profile.subscription_expires
					.toString()
					.substr(0, 10);
			},
			checkDate(customer) {
				return (
					(new Date(customer.profile.subscription_expires) - Date.now()) /
						86400000 <=
					2
				);
			},
			redirectError() {
				console.log(this.error.message);
				if (this.error.message == "Request failed with status code 404") {
					this.$router.push("/notfound");
				} else if (
					this.error.message == "Request failed with status code 401"
				) {
					this.$router.push("/accessdenied");
				} else if (this.error.message == "Network Error") {
					this.text = this.error.message;
					this.timeout = 5000;
					this.snackbar = true;
				}
			},
			editProfile() {
				this.edit = !this.edit;
			},

			async addProfile() {
				try {
					this.dialog2 = true;
					if (this.addExisting) {
						await profileAPI.prototype.addExistingCustomer(
							this.userId,
							this.account.id,
							this.selectedCustomerId,
							this.profile
						);
					} else {
						const data = {
							customer_firstname: this.customer.customer_firstname,
							customer_lastname: this.customer.customer_lastname,
							customer_phone: this.customer.customer_phone,
							customer_email: this.customer.customer_email,
							profile_pin: this.profile.profile_pin,
							subscription_status: this.profile.subscription_status,
							subscription_price: this.profile.subscription_price,
							subscription_purchased: this.profile.subscription_purchased,
							subscription_expires: this.profile.subscription_expires,
						};
						await profileAPI.prototype.addNewCustomer(
							this.userId,
							this.account.id,
							data
						);
					}

					this.text = "Successfully added profile";
					this.dialog2 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getAccount();
				} catch (error) {
					this.dialog2 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error adding profile.";
					}

					this.snackbar = true;
				}
			},

			async getAccount() {
				this.error = this.fetched = null;
				this.load = true;
				try {
					const accountId = this.$route.params.accountId;
					const productId = this.$route.params.id;

					const acc = await accountsAPI.prototype.getSpecificAccount(
						this.userId,
						productId,
						accountId
					);

					this.customers = await customerAPI.prototype.getAllCustomers(
						this.userId
					);
					this.customers.sort((a, b) => a.id - b.id);

					this.account = acc.data.account;

					this.load = false;
					this.fetched = this.account;
				} catch (error) {
					this.error = error;
				}
			},

			async updateProfile(accountId, id) {
				try {
					this.dialog3 = true;

					await profileAPI.prototype.updateSpecificProfile(
						accountId,
						id,
						this.profile
					);

					this.text = "Successfully updated profile";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getAccount();
				} catch (error) {
					this.dialog3 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error updating profile.";
					}

					this.snackbar = true;
				}
			},
			async deleteProfile(accountId, id, dialog) {
				try {
					this.dialog5 = true;
					dialog.value = false;
					await profileAPI.prototype.deleteSpecificProfile(accountId, id);

					this.text = "Successfully deleted profile";
					this.dialog5 = false;
					this.snackbar = true;
					this.getAccount();
				} catch (error) {
					this.dialog5 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error deleting profile.";
					}

					this.snackbar = true;
				}
			},
		},
		created() {
			this.getAccount();
		},
	};
</script>

<style scoped>
	.specAccount {
		width: 90%;
		margin: auto;
	}

	.container1 {
		margin: 20px auto;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;

		color: #e1e1e1;
		border-radius: 20px;
		background-color: #1e1e1e;
		width: 100%;
	}

	.profHead {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.container1 .inner {
		margin: 10px 0px;
		padding: 20px;
		min-width: 320px;
		border-radius: 20px;
	}

	.container1 .div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 5px auto;
	}

	.con {
		background-color: #e1e1e1;
		padding: 2px 10px;
		border-radius: 10px;
		margin: 2px 0px;
		margin-left: auto;
		min-width: 180px;
		font-size: 18px;
		text-align: center;
		color: #1e1e1e;
	}

	.group {
		width: 180px;
		margin: auto 30px;
	}

	.group .div {
		width: 290px;
	}

	.group .con {
		margin: 7px;
		margin-left: auto;
	}

	h1 {
		margin-top: 0px;
	}

	.profileContainer {
		max-width: 1200px;
		margin: auto;
	}

	.profileContainer h2 {
		margin: 5px 0px;
	}

	.profileContainer .innerProfCon {
		margin: 10px auto;

		max-width: 1000px;
	}

	.header {
		display: flex;
		padding: 1px 0px;
		justify-content: space-evenly;
		align-items: center;
		border-radius: 20px;
		background-color: #1e1e1e;
		color: #e1e1e1;
		border: 1px solid black;
		width: 100%;
	}

	.addProf,
	.profiles {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: #e1e1e1;
		color: #1e1e1e;
		border: 1px solid white;
		padding: 20px 0px;
		border-radius: 10px;
		margin: 2px 0px;
		width: 100%;
		cursor: pointer;
	}

	.profiles:hover {
		transition: 0.4s ease-in-out;
		background-color: #bebebe;
	}

	.addProf:hover {
		transition: 0.4s ease-in-out;
		background-color: #bebebe;
	}

	.header h3,
	.profiles h3 {
		width: 180px;
		text-align: center;
		font-size: 16px;
	}

	.division {
		display: flex;
		margin: 5px 0px;
		padding: 0px;
		border-radius: 20px;
	}

	.buttons {
		width: 80px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.extension {
		margin-left: 5px;
	}

	.icoCon {
		display: flex;
		margin: auto;
	}

	.ico {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0px 4px;
	}

	.cred {
		width: 250px;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: 50px 0px;
	}

	.row {
		margin: auto;
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

	.buttonlabel {
		margin: auto;
	}

	.unpaid {
		color: red;
		padding: 2px;
		border-radius: 5px;
		background-color: #1e1e1e;
		font-weight: bold;
	}
</style>
