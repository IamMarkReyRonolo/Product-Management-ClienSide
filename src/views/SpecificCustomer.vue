<template>
	<div class="specificCustomer">
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

		<div v-if="fetched" class="specificCustomer">
			<div class="sideContainer">
				<v-card max-width="280" class="mx-auto">
					<v-img
						src="https://wgsi.utoronto.ca/wp-content/uploads/2020/12/blank-profile-picture-png.png"
						height="220px"
						dark
					>
						<div class="customerNameCon">
							<div class="nameContent">
								{{ customer.customer_firstname }}
								{{ customer.customer_lastname }}
							</div>
						</div>
					</v-img>

					<v-list two-line>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="dark">
									mdi-phone
								</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title>{{
									customer.customer_phone
								}}</v-list-item-title>
								<v-list-item-subtitle>Mobile</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-divider inset></v-divider>

						<v-list-item>
							<v-list-item-icon>
								<v-icon color="dark">
									mdi-email
								</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title>{{
									customer.customer_email
								}}</v-list-item-title>
								<v-list-item-subtitle>Personal</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-divider inset></v-divider>

						<v-list-item>
							<v-list-item-icon> </v-list-item-icon>

							<v-list-item-content> </v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
			</div>
			<div class="mainContainer">
				<div class="head">
					<h1>Profiles</h1>
					<v-btn color="dark" light class="editButton" @click="editProfile">
						Edit
					</v-btn>
				</div>

				<div class="profiles">
					<div class="division">
						<div class="headings">
							<h3 class="header">Account</h3>
							<h3 class="header">Pin</h3>
							<h3 class="header">Status</h3>
							<h3 class="header">Price</h3>
							<h3 class="header">Date Purchased</h3>
							<h3 class="header">Date Expires</h3>
						</div>
						<div class="buttons extension" v-show="edit"></div>
					</div>

					<div
						v-for="account in customer.accounts"
						:key="account.id"
						v-show="customer.accounts.length != 0"
						class="division"
					>
						<v-card
							class="content"
							:class="
								Date.now() > new Date(account.profile.subscription_expires)
									? 'error'
									: checkDate(account)
									? 'warning'
									: ''
							"
							:to="`/products/${account.productId}/accounts/${account.id}`"
						>
							<h3 class="con">
								{{ account.account_name }}
							</h3>
							<h3 class="con">{{ account.profile.profile_pin }}</h3>
							<h3 class="con">{{ account.profile.subscription_status }}</h3>
							<h3 class="con">{{ account.profile.subscription_price }}</h3>
							<h3 class="con">
								{{
									account.profile.subscription_purchased
										.toString()
										.substr(0, 10)
								}}
							</h3>
							<h3 class="con">
								{{
									account.profile.subscription_expires.toString().substr(0, 10)
								}}
							</h3>
						</v-card>
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
												@click="setDefaultValues(account.profile)"
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

					<div class="emptyLogsCon" v-if="customer.accounts.length == 0">
						<img src="../assets/empty3.svg" alt="" />
						<p>Oops, looks like this customer has no profiles yet.</p>
						<p>Add this customer to an account now!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import productAPI from "../api/productAPI";
	import profileAPI from "../api/profileAPI";
	import customerAPI from "../api/customerAPI";
	export default {
		name: "SpecificAccount",
		props: { userId: Number },
		data: () => {
			return {
				customer: {},
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
				options: ["Paid", "Unpaid"],
				e1: 1,
				addExisting: false,
				selectedCustomerId: "",
			};
		},
		methods: {
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
			checkDate(account) {
				return (
					(new Date(account.profile.subscription_expires) - Date.now()) /
						86400000 <=
					2
				);
			},
			redirectError() {
				if (this.error.message == "Request failed with status code 404") {
					this.$router.push("/notfound");
				} else {
					this.$router.push("/accessdenied");
				}
			},
			editProfile() {
				this.edit = !this.edit;
			},

			async getCustomer() {
				this.error = this.fetched = null;
				this.load = true;
				try {
					const customerId = this.$route.params.id;
					this.customer = await customerAPI.prototype.getSpecificCustomer(
						this.userId,
						customerId
					);

					this.customer = this.customer.data;

					this.load = false;
					this.fetched = this.customer;
				} catch (error) {
					this.error = error;
				}
			},

			async updateProfile(accountId, id) {
				try {
					this.dialog3 = true;
					id;

					await profileAPI.prototype.updateSpecificProfile(
						accountId,
						id,
						this.profile
					);

					this.text = "Successfully updated profile";
					this.dialog3 = false;
					this.dialog = false;
					this.snackbar = true;
					this.getCustomer();
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
					this.getCustomer();
				} catch (error) {
					this.dialog5 = false;
					if (error.message == "Network Error") {
						this.text = error.message;
					} else {
						this.text = "Error updating profile.";
					}

					this.snackbar = true;
				}
			},
		},
		created() {
			this.getCustomer();
		},
	};
</script>

<style scoped>
	.specificCustomer {
		margin: 50px auto;
		width: 90%;

		justify-content: center;
		display: flex;
	}

	.sideContainer {
		margin: auto 10px;
		padding: 10px;
	}

	.customerNameCon {
		background-color: rgba(0, 0, 0, 0.507);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
	}

	.nameContent {
		padding: 10px 20px;
		border-radius: 20px;
		color: #1e1e1e;
		background-color: rgba(255, 255, 255, 0.726);
	}

	.mainContainer {
		padding: 10px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mainContainer h1 {
		margin: 0px;
		margin-bottom: 10px;
		color: #1e1e1e;
	}

	.headings,
	.content {
		display: flex;
		background-color: #1e1e1e;
		border-radius: 20px;
		color: #e1e1e1;
		width: 100%;
		justify-content: space-evenly;
	}

	.header,
	.con {
		width: 130px;
		font-size: 17px;
		text-align: center;
		margin: auto;
	}

	.content {
		background-color: #e1e1e1;
		border-radius: 10px;
		color: #1e1e1e;
		height: 60px;
		margin: 5px 0px;
	}

	.division {
		display: flex;
		cursor: pointer;
		margin: 2px 0px;
		padding: 0px;
	}

	.expired {
		display: flex;
		cursor: pointer;
		margin: 2px 0px;
		padding: 0px;
	}

	.warning {
		display: flex;
		cursor: pointer;
		margin: 2px 0px;
		padding: 0px;
	}

	.content:hover {
		background-color: #b9b9b9;
		transition: 0.3s ease-in-out;
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

	.emptyLogsCon {
		text-align: center;
		margin: auto;
		margin: 50px 0px;
	}

	.emptyLogsCon img {
		width: 140px;
		height: 140px;
		margin: 10px;
	}

	.emptyLogsCon p {
		padding: 0px;
		margin: 0px;
		font-weight: bold;
	}

	/*  */
</style>
