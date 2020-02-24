const builder = require("xmlbuilder");

const generateXMLRoot = function(refNo, key,splitDetail) {
	const root = builder.create("payment_item_detail");
	const detail = root.ele("item_details");
	detail.att("detail_ref", refNo);
    detail.att("college", key);
    const singleDetail =detail.ele('item_detail');
    singleDetail.att('item_id',splitDetail.ItemId);
    singleDetail.att('item_amt',splitDetail.Amount);
    singleDetail.att('bank_id',splitDetail.BankId);
    singleDetail.att('acct_num',splitDetail.AccountNo);
    const xml = root.end({ pretty: true });
    return xml;
};

const generateChildXML = function(splitDetail, xmlDoc) {

    const details = root.ele("item_details");
    const singleDetail =details.ele('item_detail');
    singleDetail.att('item_id',splitDetail.ItemId);
    singleDetail.att('bank_id',splitDetail.BankId);
    singleDetail.att('item_amt',singleDetail.Amount);
    singleDetail.att('acct_num',splitDetail.AccountNo);
    const xml = root.end({ pretty: true });
    return xml;
};

exports.generateXMLRoot=generateXMLRoot;
exports.generateChildXML=generateChildXML;