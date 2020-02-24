const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const sequelize = require("sequelize");
// var Departments = require('../models/departments');
const SchoolAccountContext = require("../models").Schoolaccount;

module.exports = {
	addSchoolAccount,
	getallSchoolAccount,
	updateSchoolAccount
};
async function getallSchoolAccount(req, res) {
	// console.log('here now..');
	const pay = await SchoolAccountContext.findAll();
	if (pay) {
		res.send(
			_.map(
				pay,
				_.partialRight(_.pick, [
					"id",
					"AccountNumber",
					"AccountName",
					"isEnabled"
				])
			)
		);
	} else {
		res.status(404).send("No Account was found...");
	}
}

async function addSchoolAccount(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const { AccountNumber, AccountName, isEnabled, BankId } = req.body;

	let pay = await SchoolAccountContext.findOne({
		where: {
			AccountNumber: AccountNumber
		}
	});
	if (pay)
		return res
			.status(400)
			.send("Payment Category with similar description already exists");
	let payment = new SchoolAccountContext(
		_.pick(req.body, ["AccountNumber", "AccountName", "isEnabled"])
	);
	const today = new Date();

	payment.updatedAt = today;
	payment.createdAt = today;
	payment.BankId = BankId;
	await payment.save();
	res.send(
		_.pick(payment, [
			"id",
			"AccountNumber",
			"AccountName",
			"isEnabled",
			"BankId"
		])
	);
}
async function updateSchoolAccount(req, res) {
	const { id, AccountNumber, AccountName, isEnabled, BankId } = req.body;
	let pay = await SchoolAccountContext.findByPk(id);
	// console.log(role);
	if (!pay) return res.status(400).send("Unable to retrieve School Account");

	const today = new Date();
	pay.updatedAt = today;
	pay.AccountName = AccountName;
	pay.AccountNumber = AccountNumber;
	pay.isEnabled = isEnabled;
	pay, (BankId = BankId);
	await pay.save();
	res.send(
		_.pick(pay, ["id", "AccountNumber", "AccountName", "isEnabled", "BankId"])
	);
}
function validate(req) {
	const schema = {
		AccountNumber: Joi.string()
			.length(10)
			.required(),
		AccountName: Joi.string().required(),
		BankId: Joi.number().required(),
		isEnabled: Joi.bool()
	};
	return Joi.validate(req, schema);
}
