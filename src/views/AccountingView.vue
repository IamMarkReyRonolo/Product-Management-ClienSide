<template>
	<div class="accounting" :key="componentKey">
		<div class="container1">
			<div class="content">
				<h3>Total Expenses:</h3>
				<h2 class="field">₱ {{ accounting.totalExpenses }}</h2>
			</div>
			<div class="content">
				<h3>Total Income:</h3>
				<h2 class="field">₱ {{ accounting.totalIncome }}</h2>
			</div>
			<div class="content">
				<h3>Net Income:</h3>
				<h2 class="field">₱ {{ accounting.netIncome }}</h2>
			</div>
		</div>
		<div class="container2">
			<div class="title">
				<h2>Activity Log</h2>
			</div>

			<div class="logsContainer" v-if="logs.length != 0">
				<div
					class="logs"
					v-for="(log, index) in logs.slice().reverse()"
					:key="index"
				>
					<p>{{ log.createdAt.toString().substr(0, 10) }}</p>
					<p>
						{{ log.logMessage }}
					</p>
				</div>
			</div>

			<div class="emptyLogsCon" v-if="logs.length == 0">
				<img src="../assets/empty3.svg" alt="" />
				<p>There is no activity recorded yet.</p>
			</div>
		</div>
	</div>
</template>

<script>
	import accountingAPI from "../api/accountingAPI";

	export default {
		name: "AccountingView",
		props: {
			productAccounting: Object,
			reload: Boolean,
		},
		data() {
			return {
				accounting: this.productAccounting.accounting,
				logs: this.productAccounting.logs,
				rand: "",
				componentKey: 0,
			};
		},
		methods: {
			async getProductAccounting(id) {
				const result = await accountingAPI.prototype.getAccounting(id);
				this.accounting = result.data.accounting;
				this.logs = result.data.logs;
			},
		},

		mounted() {
			console.log("Mark Rey Ronolo");
		},
	};
</script>

<style scoped>
	.accounting {
		padding: 20px;
		display: flex;
		margin: auto;
		justify-content: center;
		align-items: flex-start;
	}

	.accounting .container1,
	.accounting .container2 {
		padding: 20px;
		border: 1px solid rgb(190, 190, 190);
		background-color: #1e1e1e;
		margin: 20px;

		border-radius: 20px;
	}

	.accounting .container1 {
		width: 400px;
	}
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content h3 {
		width: 250px;
		color: #e1e1e1;
		font-weight: bold;
	}

	.accounting .container1 .field {
		color: white;
		background-color: grey;
		border-radius: 20px;
		text-align: center;
		margin: 10px;
		width: 250px;
	}

	.container2 {
		height: 400px;
		max-height: 400px;
		overflow-y: scroll;
	}

	.container2 .title {
		color: white;
		width: 300px;
	}

	.container2 .logsContainer {
		padding: 5px;
	}

	.container2 .logs {
		padding: 2px 5px;
		background-color: #e1e1e1;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 10px 0px;
	}

	.logs p {
		padding: 10px;
		margin: 0px;
		font-weight: bold;
		font-size: 14px;
	}

	.emptyLogsCon {
		color: white;
		text-align: center;
		margin: auto;
		margin: 50px 0px;
	}

	.emptyLogsCon img {
		width: 100px;
		height: 100px;
	}

	.emptyLogsCon p {
		padding: 10px;
	}
</style>
