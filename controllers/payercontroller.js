const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const PayerContext  = require('../models').Payer;

module.exports={
    addPerson,
    getallRegisteredStudents,
    getaOneStudent
  
};
async function getallRegisteredStudents(req, res){
    const reg =await PayerContext.findAll();
    if(reg){
        res.send(_.map(reg,_.partialRight(_.pick, ['id','FullName','IdentityKey','EmailAddress','IsEnabled'])));
    }
    else{res.status(404).send("No Record was found...");}
}
async function getaOneStudent(req, res){
    
    const id=req.params.identity;
    const reg =await PayerContext.findOne({where:{IdentityKey:id}});
 
    if(reg){
        res.send(
            {
                "id":reg.id,
                "FullName":reg.FullName,
        "IdentityKey":reg.IdentityKey,
        "EmailAddress":reg.EmailAddress,
        "IsEnabled":reg.IsEnabled
        });
    }
    else{res.status(404).send("No Record was found...");}
}
async function addPerson(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let pay = await PayerContext.findOne({
        where: { 
            IdentityKey: req.body.IdentityKey
        }
    });
    if (pay) return res.status(400).send("Record already exists");
    let payment = new PayerContext(_.pick(req.body,['FullName','IdentityKey','EmailAddress','IsEnabled']));
    const today = new Date();

    payment.updatedAt = today;
    payment.createdAt=today;
    payment.IsEnabled=true
    await payment.save();
    res.send(_.pick(payment, ['id','IdentityKey','FullName','EmailAddress','IsEnabled']));
}
function validate(req) {
	const schema = {
        IdentityKey: Joi.string().min(3).required(),
        FullName:Joi.string().min(4).required(),
        EmailAddress:Joi.string().email().required(),
        IsEnabled:Joi.bool()
	};
	return Joi.validate(req, schema);
}