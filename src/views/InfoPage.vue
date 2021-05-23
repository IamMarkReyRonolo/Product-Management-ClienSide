<template>
	<div class="About">
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
				<router-link :to="'/welcome'"
					><p class="ic">
						GO TO APP
					</p></router-link
				>
			</v-app-bar>

			<div class="mainContainer">
				<h1>Product Management System</h1>

				<div class="appOverview">
					This Product Management System is designed to help users manage their
					products in a more efficient and effective manner. This system's
					behavior is based on the nature of one of my classmates' businesses,
					so I attribute this to her. This Web App will serve as my final
					project work for the CS ICS-105 course.
				</div>

				<div class="tecCon">
					<h2>Technology Used</h2>
					<div class="container">
						<div>
							<img
								src="https://images.vexels.com/media/users/3/166383/isolated/preview/6024bc5746d7436c727825dc4fc23c22-html-programming-language-icon-by-vexels.png"
								alt=""
							/>
							<p>HTML5</p>
						</div>

						<div>
							<img
								src="https://www.pngitem.com/pimgs/m/11-119330_transparent-curly-brackets-png-transparent-css-icon-png.png"
								alt=""
							/>
							<p>CSS3</p>
						</div>
						<div>
							<img src="../assets/logo.png" alt="" />
							<p>VueJS</p>
						</div>
						<div>
							<img src="../assets/logo.svg" alt="" />
							<p>Vuetify</p>
						</div>
					</div>

					<div class="container">
						<div>
							<img
								src="https://cdn0.iconfinder.com/data/icons/designer-skills/128/node-js-512.png"
								alt=""
							/>
							<p>NodeJs</p>
						</div>

						<div>
							<img
								src="https://www.pngfind.com/pngs/m/136-1363736_express-js-icon-png-transparent-png.png"
								alt=""
							/>
							<p>ExpressJs</p>
						</div>
						<div>
							<img
								src="https://cpl.thalesgroup.com/sites/default/files/content/paragraphs/intro/2020-03/postgresql-logo.png"
								alt=""
							/>
							<p>PostgreSql</p>
						</div>
						<div>
							<img
								src="https://camo.githubusercontent.com/58e35d08b53ec029f0e3e587a28a6f65777d352f797add843d153a0db60b9d7d/68747470733a2f2f692e696d6775722e636f6d2f79764559686e5a2e706e67"
								alt=""
							/>
							<p>Sequelize.js</p>
						</div>
					</div>
				</div>

				<div class="erd">
					<h2>Entity Relationship Diagram</h2>
					<br />
					<iframe
						width="900"
						height="600"
						src="https://dbdiagram.io/embed/60a89f77b29a09603d1606a8"
					>
					</iframe>
					<br />
					<br />
					<h2>Business Rules</h2>
					<br />
					<div class="businessrulesCon">
						<div class="busRules">
							A <span>USER</span> can manage many <span>PRODUCT</span>s and each
							<span>PRODUCT</span> is manage by only one <span>USER</span>.
						</div>

						<div class="busRules">
							A <span>USER</span> can have many <span>CUSTOMER</span>s and each
							<span>CUSTOMER</span> is manage by only one <span>USER</span>.
						</div>

						<div class="busRules">
							A <span>PRODUCT</span> generates only one
							<span>ACCOUNTING</span> and the <span>ACCOUNTING</span> belongs to
							only one <span>PRODUCT</span>.
						</div>

						<div class="busRules">
							A <span>PRODUCT</span> can have many <span>ACCOUNT</span>s and
							each <span>ACCOUNT</span> belongs to one <span>PRODUCT</span>.
						</div>

						<div class="busRules">
							AN <span>ACCOUNT</span> can have many <span>PROFILE</span>s and
							each <span>PROFILE</span> belongs to one <span>ACCOUNT</span>.
						</div>

						<div class="busRules">
							A <span>CUSTOMER</span> can purchase many <span>PROFILE</span>s
							and each <span>PROFILE</span> owns by one <span>CUSTOMER</span>.
						</div>

						<div class="busRules">
							<span>ACCOUNTING</span> records many <span>LOG</span>s and each
							<span>LOG</span> belongs to one <span>ACCOUNTING</span>.
						</div>
					</div>

					<br />
				</div>
			</div>
			<footer>
				<div class="icon">
					<a href="https://github.com/IamMarkReyRonolo" target="_blank"
						><img src="../assets/github-brands.svg" alt=""
					/></a>
				</div>
			</footer>
		</div>
	</div>
</template>

<style scoped>
	p {
		padding: 10px;
		margin: 0px;
	}

	.ic {
		cursor: pointer;
		padding: 5px;
		border: 1px solid rgb(56, 56, 56);
		border-radius: 10px;
	}

	.ic:hover {
		background-color: rgb(56, 56, 56);
		transition: 0.3s ease-in-out;
	}
	a {
		text-decoration: none;
		color: #e1e1e1;
	}

	.mainContainer {
		width: 80%;
		margin: 120px auto;

		text-align: center;
		color: #1e1e1e;
	}

	.mainContainer h1 {
		font-size: 50px;
	}

	.appOverview {
		padding: 15px;
		width: 700px;
		margin: 20px auto;
		border-radius: 20px;
		background-color: #1e1e1e;
		color: #e1e1e1;
	}

	.tecCon {
		width: 500px;
		margin: 10px auto;
		padding: 20px;
	}

	.container {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.container div {
		margin: 5px 10px;
	}
	img {
		width: 80px;
	}

	.businessrulesCon {
		width: 900px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 10px auto;
	}

	.busRules {
		width: 400px;
		padding: 10px;
		border-radius: 20px;
		margin: 10px auto;
		background-color: #1e1e1e;
		color: #e1e1e1;
	}

	span {
		color: rgb(76, 76, 207);
		font-weight: bold;
	}

	footer {
		width: 100%;
		height: 70px;
		background-color: #1e1e1e;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	footer .icon img {
		width: 40px;
		color: #e1e1e1;
		cursor: pointer;
	}
</style>
