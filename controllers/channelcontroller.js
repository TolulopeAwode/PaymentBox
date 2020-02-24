const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const sequelize = require("sequelize");
// var Departments = require('../models/departments');
const ChannelContext = require("../models").Paymentchannel;

module.exports = {
	addNewChannel,
	getallChannels,
	updateChannel
};

async function getallChannels(req, res) {
	// console.log('here now..');
	const channel = await ChannelContext.findAll();
	if (channel) {
		res.send(
			_.map(
				channel,
				_.partialRight(_.pick, [
					"id",
					"ChannelName",
					"ProductId",
					"PaymentItemId",
					"Mackey",
					"RedirectURL",
					"QueryURL",
					"POSTURL",
					"PaymentCharges"
				])
			)
		);
	} else {
		res.status(404).send("No channel was found...");
	}
}

async function addNewChannel(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let pay = await ChannelContext.findOne({
		where: {
			ChannelName: req.body.ChannelName
		}
	});
	if (pay)
		return res
			.status(400)
			.send("Channel with similar description already exists");
	let payment = new ChannelContext(
		_.pick(req.body, [
			"ChannelName",
			"ProductId",
			"PaymentItemId",
			"Mackey",
			"RedirectURL",
			"QueryURL",
			"POSTURL",
			"PaymentCharges"
		])
	);
	const today = new Date();

	payment.updatedAt = today;
	payment.createdAt = today;
	await payment.save();
	res.send(
		_.pick(payment, [
			"id",
			"ChannelName",
			"ProductId",
			"PaymentItemId",
			"Mackey",
			"RedirectURL",
			"POSTURL",
			"QueryURL",
			"PaymentCharges"
		])
	);
}
async function updateChannel(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { id } = req.body.id;
	let pay = await ChannelContext.findByPk(id);

	if (!pay) return res.status(400).send("Unable to retrieve channel..");

	const today = new Date();

	pay.updatedAt = today;
	pay.ChannelName = req.body.ChannelName;
	pay.ProductId = req.body.ProductId;
	pay.PaymentItemId = req.body.PaymentItemId;
	pay.Mackey = req.body.Mackey;
	pay.RedirectURL = req.body.RedirectURL;
	pay.QueryURL = req.body.QueryURL;
	pay.POSTURL = req.body.POSTURL;
	pay.PaymentCharges = req.body.PaymentCharges;
	await pay.save();
	res.send(
		_.pick(payment, [
			"id",
			"ChannelName",
			"ProductId",
			"PaymentItemId",
			"Mackey",
			"RedirectURL",
			"QueryURL",
			"POSTURL",
			"PaymentCharges"
		])
	);
}
function validate(req) {
	const schema = {
		ChannelName: Joi.string().min(3)
			.required(),
		ProductId: Joi.string().required(),
		PaymentItemId: Joi.string().required(),
		Mackey: Joi.string().required(),
		RedirectURL: Joi.string().required(),
		QueryURL: Joi.string().required(),
		POSTURL :Joi.string().required(),
		PaymentCharges: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
