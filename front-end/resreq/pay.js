function payNow() {

    const date1 = new Date();
    const amount = 150
    var txn_uid =
        date1.getSeconds().toString() + date1.getMilliseconds().toString();
    let esewamessage = `total_amount=${amount},transaction_uuid=${txn_uid},product_code=EPAYTEST`;
    var hash = CryptoJS.HmacSHA256(esewamessage, "8gBm/:&EnhH.1/q");
    var signature = CryptoJS.enc.Base64.stringify(hash);
    console.log("test", signature, typeof signature);
    const data = {
        amount: amount,
        failure_url: "https://google.com",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "https://esewa.com",
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: txn_uid,
    };

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in data) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", data[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}