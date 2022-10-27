const uniqid = require('uniqid'); 

exports.generateID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "ID" + id_2 + id_3;

    return final;
}

exports.generateRequsitionID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "RQ" + id_2 + id_3;

    return final;
}


exports.generateOrderID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "OR" + id_2 + id_3;

    return final;
}

exports.generateInvoiceID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "IN" + id_2 + id_3;

    return final;
}

exports.generatepaymentID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "PAY" + id_2 + id_3;

    return final;
}

exports.generateItemID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "It" + id_2 + id_3;

    return final;
}

exports.generateSupplierShopID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "SS" + id_2 + id_3;

    return final;
}




