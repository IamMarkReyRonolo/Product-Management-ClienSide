<template>
	<div class="landingPage">
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

		<div class="container">
			<div class="signIn" v-if="!signUp">
				<v-card max-width="350" dark class="mx-auto">
					<v-card-title class="title font-weight-regular ">
						<span>Log In</span>
					</v-card-title>
					<v-card-text>
						<v-form v-model="valid">
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
										type="password"
										dense
									></v-text-field>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>
					<div class="buttons">
						<div class="button">
							<v-btn class="primary">
								Log in
							</v-btn>
						</div>
						<div class="button">
							<div>
								<p>Or</p>
								<v-btn @click="signUp = true">
									Sign up
								</v-btn>
							</div>
						</div>
					</div>
				</v-card>
			</div>

			<div class="signUp" v-if="signUp">
				<v-card class="mx-auto" max-width="500" dark>
					<v-card-title class="title font-weight-regular justify-space-between">
						<span>{{ currentTitle }}</span>
						<v-avatar
							color="primary lighten-2"
							class="subheading white--text"
							size="24"
							v-text="step"
						></v-avatar>
					</v-card-title>

					<v-window v-model="step">
						<v-window-item :value="1">
							<v-card-text>
								<v-text-field
									label="Name"
									v-model="user.fullname"
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
									v-model="user.password"
								></v-text-field>

								<span class="caption grey--text text--darken-1">
									Please enter a password for your account
								</span>
							</v-card-text>
						</v-window-item>

						<v-window-item :value="3">
							<v-card-text>
								{{ result.data }}
							</v-card-text>
						</v-window-item>
					</v-window>

					<v-divider></v-divider>

					<v-card-actions>
						<v-btn text @click="step--">
							Back
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn
							:disabled="step === 3"
							color="primary"
							depressed
							@click="step++"
						>
							Next
						</v-btn>
					</v-card-actions>
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
				signUp: false,
				step: 1,
				user: {
					fullname: "",
					username: "",
					password: "",
				},
				result: {},
				valid: false,
				logIn: {
					username: "",
					password: "",
				},
				email: "",
				emailRules: [
					(v) => !!v || "E-mail is required",
					(v) => /.+@.+/.test(v) || "E-mail must be valid",
				],
			};
		},
		methods: {
			async signUp() {
				this.result = await userAPI.prototype.signUp(this.user);
				return this.result;
			},

			change() {
				this.signUp = false;
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
</style>
