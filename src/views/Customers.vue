<template>
	<div class="customers">
		<div class="headings">
			<h1 class="display-2 font-weight-bold">MY CUSTOMERS</h1>
			<v-spacer></v-spacer>
			<v-btn color="dark" light class="editButton" @click="editProduct">
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

		<v-container>
			<v-row>
				<v-col v-for="n in 5" :key="n" cols="3">
					<v-card class="mx-auto" max-width="344" outlined dark>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="overline mb-4">
									OVERLINE
								</div>
								<v-list-item-title class="headline mb-1">
									Headline 5
								</v-list-item-title>
								<v-list-item-subtitle
									>Greyhound divisely hello coldly
									fonwderfully</v-list-item-subtitle
								>
							</v-list-item-content>

							<v-list-item-avatar
								tile
								size="80"
								color="grey"
							></v-list-item-avatar>
						</v-list-item>

						<v-card-actions>
							<v-btn outlined rounded text light class="white">
								Button
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	.account {
		width: 90%;
		margin: auto;
	}

	.headings {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40px auto;
	}

	.editButton {
		margin: 0px 10px;
	}
</style>
