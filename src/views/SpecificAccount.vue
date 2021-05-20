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

		<h1 class="display-2 font-weight-bold">{{ account.account_name }}</h1>

		<div v-if="load" class="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ this.$router.push("/accessdenied") }}
		</div>

		<div v-if="fetched" class="">
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
						<h2 class="con">₱ {{ account.selling_price }}</h2>
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
									{{ account.date_purchased.toString().substr(0, 10) }}
								</h2>
							</div>

							<div class="div">
								<h3>Expires</h3>
								<h2 class="con">
									{{ account.date_expires.toString().substr(0, 10) }}
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

					<div
						class="division"
						v-for="customer in account.customers"
						:key="customer.id"
					>
						<div class="profiles">
							<h3>
								{{ customer.customer_firstname }}
								{{ customer.customer_lastname }}
							</h3>
							<h3>{{ customer.profile.profile_pin }}</h3>
							<h3>{{ customer.profile.subscription_status }}</h3>
							<h3>{{ customer.profile.subscription_price }}</h3>
							<h3>
								{{
									customer.profile.subscription_expires.toString().substr(0, 10)
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
												><v-icon>mdi-pencil</v-icon></v-btn
											>
										</template>

										<template v-slot:default="dialog">
											<v-card dark>
												<form
													action=""
													@submit.prevent="updateProfile(customer.id)"
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
																		dense
																		outlined
																	></v-text-field>
																</v-col>

																<v-col cols="12">
																	<v-select
																		label="Profile Status*"
																		outlined
																		dense
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
														@click="deleteProfile(customer.id, dialog)"
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

					<div class="division">
						<div class="addProf">
							<v-dialog v-model="dialog" max-width="700px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn color="dark" light v-bind="attrs" v-on="on">
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

										<v-stepper-items>
											<v-stepper-content step="1">
												<form action="" enctype="multipart/form-data">
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
																	></v-text-field>
																</v-col>

																<v-col cols="12">
																	<v-select
																		label="Profile Status*"
																		outlined
																		dense
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
																		outlined
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
																	/>
																</v-col>

																<!--  -->
															</v-row>
														</v-container>
														<small>*indicates required field</small>
													</v-card-text>
												</form>

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
													:disabled="dialog3"
													:loading="dialog3"
													color="primary"
													light
													type="submit"
													@click="addProfile()"
												>
													Add Profile
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
		props: ["ssdd"],
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
			editProfile() {
				this.edit = !this.edit;
			},

			async addProfile() {
				if (this.addExisting) {
					const result = await profileAPI.prototype.addExistingCustomer(
						this.account.id,
						this.selectedCustomerId,
						this.profile
					);
					console.log("existing");
					console.log(this.profile);
					console.log(this.selectedCustomerId);
					console.log(result);
				} else {
					console.log("Nooo");
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
					const result = await profileAPI.prototype.addNewCustomer(
						this.account.id,
						data
					);

					console.log(data);
					console.log(result);
				}

				this.dialog3 = true;
			},

			async getAccount() {
				this.error = this.fetched = null;
				this.load = true;
				try {
					const accountId = this.$route.params.accountId;
					const productId = this.$route.params.id;
					const acc = await accountsAPI.prototype.getSpecificAccount(
						productId,
						accountId
					);
					this.customers = await customerAPI.prototype.getAllCustomers();
					this.customers.sort((a, b) => a.id - b.id);

					this.account = acc.data.account;
					console.log(this.account.account);
					console.log("yeah");
					console.log(this.customers);
					console.log("yes");
					// console.log(this.products);
					this.load = false;
					this.fetched = this.account;
				} catch (error) {
					this.error = error;
				}
			},

			async updateProfile(id) {
				console.log("yeah");
				console.log(this.profile);
				console.log("yeah");
				const profile = await profileAPI.prototype.updateSpecificProduct(
					id,
					this.profile
				);
				this.dialog3 = true;
				console.log(profile);
			},
			async deleteProfile(id, dialog) {
				const profile = await profileAPI.prototype.deleteSpecificProduct(id);
				this.dialog5 = true;
				dialog.value = false;
				console.log(profile);
			},
		},
		created() {
			this.getAccount();
		},
		watch: {
			$route: "getAccount",
			dialog2(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully added profile";
					this.dialog2 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getAccount();
				}, 2000);
			},

			dialog3(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully updated profile";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getAccount();
				}, 2000);
			},

			dialog5(val) {
				if (!val) return;

				setTimeout(() => {
					this.text = "Successfully deleted profile";
					this.dialog5 = false;
					this.snackbar = true;
					this.getAccount();
				}, 2000);
			},
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
		margin-top: 50px;
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

	.profiles,
	.addProf {
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

		margin: 2px 0px;
		padding: 0px;
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
</style>
