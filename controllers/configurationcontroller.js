const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const gen = require("../util/generatecode");
const generatexml = require("../util/generatexml");
const sha = require("js-sha512");

const sequelize = require("sequelize");
// var Departments = require('../models/departments');
const ConfigurationContext = require("../models").Paymentconfiguration;
const ChannelContext = require("../models").Paymentchannel;
const CategoryContext = require("../models").Paymentcategory;
const BankContext = require("../models").Bank;
const SchoolAccountContext = require("../models").Schoolaccount;
const PayerContext = require("../models").Payer;
const TransactionlogContext = require("../models").TransactionLog;
module.exports = {
	addTransactionConfig,
	getallConfigurations,
	getTransactionConfig,
	fetchPaymentConfig
};

async function getallConfigurations(req, res) {
	const reg = await ConfigurationContext.findAll();
	if (reg) {
		res.send(
			_.map(
				reg,
				_.partialRight(_.pick, [
					"id",
					"ConfigDescription",
					"PaymentCode",
					"MinimumPayment",
					"MaximumPayment"
				])
			)
		);
	} else {
		res.status(404).send("No Record was found...");
	}
}
async function fetchPaymentConfig(req, res) {
	const id = req.params.transref;
	console.log(id);
	const trans = await TransactionlogContext.findOne({
		where: { TransactionRefNo: id }
	});
	if (trans) {
		const configuration =await ConfigurationContext.findByPk(trans.ConfigurationId);
		const account = await SchoolAccountContext.findByPk(
			configuration.SchoolAccountId
		);
		const payer = await PayerContext.findByPk(trans.PayerId);
		if (account) {
			const bank = await BankContext.findByPk(account.BankId);
			if (bank) {
				var channel = await ChannelContext.findByPk(configuration.ChannelId);
				if (channel) {
					const transactionRef = gen.generateCode(15).toUpperCase();
					const splitInfo = {
						ItemId: configuration.id,
						BankId: bank.BankSplitCode,
						Amount: configuration.MaximumPayment * 100,
						AccountNo: account.AccountNo
					};
					const amt = (configuration.MaximumPayment + 300) * 100;
					const xml = generatexml.generateXMLRoot(
						transactionRef.toUpperCase(),
						"UNIOSUNPG",
						splitInfo
					);
					let info ='';
info+=transactionRef;
info+=channel.ProductId;
info+=channel.PaymentItemId;
info+=amt;
info+=channel.RedirectURL;
info+=channel.Mackey;

					
						console.log('Information >>>>',info);
					const hash = sha.sha512(info);
				
					const transactionSummary = {
                        Amount: amt,
                        ActualAmount: configuration.MaximumPayment,
						PayementId: channel.PaymentItemId,
                        CustomerNameDescription: "Student",
                        PaymentCode: configuration.PaymentCode,
                        PaymentDescription: configuration.ConfigDescription,
						PaymentItemName: configuration.ConfigDescription,
                        PostActionUrl: channel.POSTURL,
                        Charges: channel.PaymentCharges,
						ProductId: channel.ProductId,
						TransactionReference: transactionRef,
						RedirectURL: channel.RedirectURL,
						XmlData: xml,
						Hash: hash,
						FullName:payer.FullName
					};
                    console.log(transactionSummary);
                    res.status(200).send(transactionSummary);
				} else {
					res.status(404).send("Channel not found..");
				}
			} else {
				res.status(404).send("Unable to retrieve bank information");
			}
		} else {
			res.status(404).send("Unable to retrieve school account");
		}
	} else {
		res.status(404).send("Unable to retrieve configuration detail..");
	}
}
async function getTransactionConfig(req, res) {
	const id = req.params.paymentcode;
	const configuration = await ConfigurationContext.findOne({
		where: { PaymentCode: id }
	});
	if (configuration) {
		const account = await SchoolAccountContext.findByPk(
			configuration.SchoolAccountId
		);
		if (account) {
			const bank = await BankContext.findByPk(account.BankId);
			if (bank) {
				var channel = await ChannelContext.findByPk(configuration.ChannelId);
				if (channel) {
					const transactionRef = gen.generateCode(15).toUpperCase();
					const splitInfo = {
						ItemId: configuration.id,
						BankId: bank.BankSplitCode,
						Amount: configuration.MaximumPayment * 100,
						AccountNo: account.AccountNo
					};
					const amt = (configuration.MaximumPayment + 300) * 100;
					const xml = generatexml.generateXMLRoot(
						transactionRef.toUpperCase(),
						"UNIOSUNPG",
						splitInfo
					);
					let info ='';
info+=transactionRef;
info+=channel.ProductId;
info+=channel.PaymentItemId;
info+=amt;
info+=channel.RedirectURL;
info+=channel.Mackey;

					
						console.log('Information >>>>',info);
					const hash = sha.sha512(info);
				
					const transactionSummary = {
                        Amount: amt,
                        ActualAmount: configuration.MaximumPayment,
						PayementId: channel.PaymentItemId,
                        CustomerNameDescription: "Student",
                        PaymentCode: configuration.PaymentCode,
                        PaymentDescription: configuration.ConfigDescription,
						PaymentItemName: configuration.ConfigDescription,
                        PostActionUrl: channel.POSTURL,
                        Charges: channel.PaymentCharges,
						ProductId: channel.ProductId,
						TransactionReference: transactionRef,
						RedirectURL: channel.RedirectURL,
						XmlData: xml,
						Hash: hash
					};
                    console.log(transactionSummary);
                    res.status(200).send(transactionSummary);
				} else {
					res.status(404).send("Channel not found..");
				}
			} else {
				res.status(404).send("Unable to retrieve bank information");
			}
		} else {
			res.status(404).send("Unable to retrieve school account");
		}
	} else {
		res.status(404).send("Unable to retrieve configuration detail..");
	}
}
async function addTransactionConfig(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let pay = await ConfigurationContext.findOne({
		where: {
			ConfigDescription: req.body.ConfigDescription
		}
	});
	if (pay) return res.status(400).send("Record already exists");
	let payment = new ConfigurationContext(
		_.pick(req.body, [
			"ConfigDescription",
			"MinimumPayment",
			"MaximumPayment",
			"CallBackHookURL",
			"SchoolAccountId",
			"PaymentPeriodId",
			"ChannelId",
			"CategoryId"
		])
	);
	const today = new Date();
	payment.updatedAt = today;
	payment.createdAt = today;
	payment.PaymentCode = gen.generateCode(12).toUpperCase();
	payment.IsEnabled = true;
	await payment.save();
	res.send(
		_.pick(payment, [
			"id",
			"ConfigDescription",
			"PaymentCode",
			"MinimumPayment",
			"MaximumPayment"
		])
	);
}
function validate(req) {
	const schema = {
		ConfigDescription: Joi.string()
			.min(3)
			.required(),
		MinimumPayment: Joi.number().required(),
		MaximumPayment: Joi.number().required(),
		CallBackHookURL: Joi.string()
			.min(5)
			.required(),
		SchoolAccountId: Joi.number().required(),
		PaymentPeriodId: Joi.number().required(),
		ChannelId: Joi.number().required(),
		CategoryId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
