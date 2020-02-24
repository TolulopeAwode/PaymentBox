const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const PaymentPeriodContext  = require('../models').PaymentPeriod;

module.exports={
    addPaymentPeriod,
    getallPaymentPeriod,
  
};
async function getallPaymentPeriod(req, res){
    const pay =await PaymentPeriodContext.findAll();
    if(pay){
        res.send(_.map(pay,_.partialRight(_.pick, ['id','Description','StartDate','EndDate','IsClosed','TimeId'])));
    }
    else{res.status(404).send("No Time was found...");}
}

async function addPaymentPeriod(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let pay = await PaymentPeriodContext.findOne({
        where: { 
            Description: req.body.Description
        }
    });
    if (pay) return res.status(400).send("Payment Period with similar description already exists");
    let payment = new PaymentPeriodContext(_.pick(req.body,['Description','StartDate','EndDate','IsClosed','TimeId']));
    const today = new Date();

    payment.updatedAt = today;
    payment.createdAt=today;
    await payment.save();
    res.send(_.pick(payment, ['id','Description','StartDate','EndDate','IsClosed','TimeId']));
}

function validate(req) {
	const schema = {
        Description: Joi.string().min(3).required(),
        StartDate:Joi.date().required(),
        EndDate:Joi.date().required(),
        IsClosed:Joi.bool(),
        TimeId:Joi.string().required()

	};
	return Joi.validate(req, schema);
}
