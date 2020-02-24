const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const PaymentCategoryContext  = require('../models').Paymentcategory;

module.exports={
    getallPaymentCategory,
    addPaymentCategory,
    updatePaymentCategory
};
async function getallPaymentCategory(req, res){
    // console.log('here now..');
    const account =await PaymentCategoryContext.findAll();
    if(account){
        res.send(_.map(account,_.partialRight(_.pick, ['id','Description','RevenueCode'])));
    }
    else{res.status(404).send("No Payment Category was found...");}
}

async function addPaymentCategory(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log('xxxx',req.body.Description);
    const {Description,RevenueCode}=req.body;   

    let pay = await PaymentCategoryContext.findOne({
        where: { 
            [sequelize.Op.or]:[
            {Description: Description},
            {RevenueCode: RevenueCode}
        ]
        }
    });

    if (pay) return res.status(400).send("Payment Category with similar description already exists");
    let payment = new PaymentCategoryContext(_.pick(req.body, ['Description', 'RevenueCode']));
    const today = new Date();

    payment.updatedAt = today;
    payment.createdAt=today;
    await payment.save();
    res.send(_.pick(payment, ['id', 'RevenueCode', 'Description']));
}
async function updatePaymentCategory(req, res){
    const { id,Description,RevenueCode } = req.body;
    if (error) return res.status(400).send(error.details[0].message);
    let pay = await PaymentCategoryContext.findByPk(id);
    // console.log(role);
    if (!pay) return res.status(400).send("Unable to retrieve Payment Category");
   
    const today = new Date();
    pay.updatedAt = today;
    pay.Description = Description;
    pay.RevenueCode=RevenueCode;
    await pay.save();
    res.send(_.pick(pay, ['id', 'RevenueCode', 'Description']));
}
function validate(req) {
	const schema = {
        Description: Joi.string().required(),
        RevenueCode: Joi.string().required()
	};
	return Joi.validate(req, schema);
}
 