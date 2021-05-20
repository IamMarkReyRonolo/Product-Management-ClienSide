<template>
	<div class="landingPage">
		<div class="text-center mt-4">
			<v-snackbar v-model="snackbar" :timeout="timeout">
				<p class="error">{{ text }}</p>

				<template v-slot:action="{ attrs }">
					<v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</div>
		<div class="div">
			<v-app-bar
				app
				color="grey darken-4
"
				dark
			>
				<h1 class="title">
					Product Management System
				</h1>
				<v-spacer></v-spacer>
				<p class="ic">
					<v-icon dark>
						mdi-help
					</v-icon>
				</p>
			</v-app-bar>
		</div>

		<div class="image">
			<v-img src="../assets/logIn.svg" alt="" />
		</div>

		<div class="container">
			<!--  -->

			<div class="signIn" v-if="!signup">
				<v-card max-width="400" dark>
					<v-card-title class="title font-weight-regular ">
						<span class="mx-auto">Log In</span>
					</v-card-title>
					<v-card-text>
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
							@submit.prevent="validate"
						>
							<v-row class="justify-center">
								<v-col cols="10">
									<v-text-field
										v-model="logIn.username"
										:rules="emailRules"
										label="E-mail"
										required
									></v-text-field>
								</v-col>

								<v-col cols="10">
									<v-text-field
										v-model="logIn.password"
										label="Password"
										required
										:rules="passwordRules"
										type="password"
										dense
									></v-text-field>
								</v-col>
							</v-row>
							<div class="buttons">
								<div class="button">
									<v-btn class="primary" @click="validate">
										Log in
									</v-btn>
								</div>
								<div class="button">
									<div>
										<p>Or</p>

										<v-btn @click="signup = true">
											Sign up
										</v-btn>
									</div>
								</div>
							</div>
						</v-form>
					</v-card-text>
				</v-card>
			</div>

			<div class="signUp" v-if="signup">
				<v-card max-width="500" dark>
					<v-card-title class="title font-weight-regular justify-space-between">
						<span>{{ currentTitle }}</span>
						<v-avatar
							color="primary lighten-2"
							class="subheading white--text"
							size="24"
							v-text="step"
						></v-avatar>
					</v-card-title>
					<v-form
						ref="form1"
						v-model="valid1"
						lazy-validation
						@submit.prevent="validate1"
					>
						<v-window v-model="step">
							<v-window-item :value="1">
								<v-card-text>
									<v-text-field
										label="Name"
										v-model="user.fullname"
										:rules="nameRules"
									></v-text-field>
									<span class="caption grey--text text--darken-1">
										Please enter your full name for registration
									</span>
								</v-card-text>
							</v-window-item>

							<v-window-item :value="2">
								<v-card-text>
									<v-text-field
										label="Email"
										:rules="emailRules"
										v-model="user.username"
									></v-text-field>

									<v-text-field
										label="Password"
										type="password"
										:rules="passwordRules"
										v-model="user.password"
									></v-text-field>

									<span class="caption grey--text text--darken-1">
										Please enter a password for your account
									</span>
								</v-card-text>
							</v-window-item>

							<v-window-item :value="3">
								<v-card-text>
									<div class="div" v-if="error">
										<img src="../assets/failed_signUp.svg" alt="" />
										<p>Email already exists!</p>
									</div>
									<div class="div" v-if="loading">
										<v-progress-circular
											indeterminate
											color="primary"
										></v-progress-circular>
									</div>
									<div v-if="fetched">
										<div class="div" v-if="success">
											<img src="../assets/success_signUp.svg" alt="" />
											<p>Successfully created account!</p>
										</div>
									</div>
								</v-card-text>
							</v-window-item>
						</v-window>

						<v-divider></v-divider>

						<v-card-actions>
							<v-btn text @click="step = 0">
								Sign in
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								:disabled="step === 3"
								color="primary"
								depressed
								@click="validate1"
							>
								{{ step === 2 ? "Sign Up" : "Next" }}
							</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
	import userAPI from "../api/userAPI";
	export default {
		name: "LandingPage",

		data: () => {
			return {
				signup: false,
				step: 1,
				user: {
					fullname: "",
					username: "",
					password: "",
				},
				result: {},
				valid: true,
				logIn: {
					username: "",
					password: "",
				},
				email: "",
				emailRules: [
					(v) => !!v || "E-mail is required",
					(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
				],
				nameRules: [(v) => !!v || "Name is required"],
				passwordRules: [(v) => !!v || "Password is required"],
				valid1: true,
				success: false,
				error: false,
				loading: false,
				fetched: "",
				timeout: 2000,
				snackbar: false,
				text: "",
			};
		},
		methods: {
			async signUp() {
				try {
					this.loading = true;
					this.result = await userAPI.prototype.signUp(this.user);
					if (this.result.data.success_message) {
						this.success = true;
						console.log(this.success);
					} else {
						this.success = false;
						console.log(this.success);
					}
					this.loading = false;
					this.fetched = this.result;
					return this.result;
				} catch (error) {
					this.error = true;
					this.loading = false;
				}
			},

			async logUser() {
				try {
					console.log("yow");
					console.log(this.logIn.username);
					const users = await userAPI.prototype.logIn(this.logIn);
					console.log("yeah");
					console.log(users);
					console.log("yeah");
					localStorage.setItem("token", users.data.user.token);
					this.$router.push("/verified");
				} catch (error) {
					this.text = "Email or Password is incorrect";
					this.snackbar = true;
				}
			},
			validate() {
				if (this.$refs.form.validate()) {
					console.log(this.logIn);
					this.logUser();
				}
			},
			validate1() {
				if (this.$refs.form1.validate()) {
					this.step++;
					console.log(this.step);
				}
			},
			reset() {
				this.$refs.form.reset();
			},
			reset1() {
				this.$refs.form1.reset();
			},

			change() {
				this.signup = false;
			},

			submit() {
				this.$v.$touch();
			},
			clear() {
				this.$v.$reset();
				this.logIn.password = "";
				this.logIn.username = "";
			},
		},
		computed: {
			currentTitle() {
				switch (this.step) {
					case 0:
						this.change();
						return 0;
					case 1:
						return "Sign-up";
					case 2:
						return "Create a username and password";
					default:
						this.signUp();
						this.reset1();
						return "Result";
				}
			},
		},
	};
</script>

<style scoped>
	.div {
		display: block;
	}
	.container {
		width: 90%;
		margin: 100px auto;
	}

	.buttons {
		margin-top: -20px;
		padding: 20px;
		margin-bottom: 20px;
		text-align: center;
	}

	p {
		padding: 10px;
		margin: 0px;
	}

	.ic {
		cursor: pointer;
		padding: 5px;
		border: 1px solid rgb(56, 56, 56);
		border-radius: 50%;
	}

	.ic:hover {
		background-color: rgb(56, 56, 56);
		transition: 0.3s ease-in-out;
	}

	.image {
		width: 650px;
		position: fixed;
		bottom: 50px;
		right: 50px;
	}

	img {
		width: 650px;
	}

	.div {
		width: 300px;
		text-align: center;
		margin: auto;
	}

	.div img {
		width: 200px;
	}
</style>
