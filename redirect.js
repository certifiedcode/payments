const transactionId = new URLSearchParams(window.location.search).get("t");
if (transactionId)
    fetch(`https://certifiedcode.wixsite.com/payment-provider/_functions/transaction/${transactionId}`).then(async (res) => {
        // check res is text or json
        const response = await res.json()
        if (response.success === false && response.redirectUrl) {
            window.location.href = response.redirectUrl
        }
        if (response.providerId === 'ecpay') {
            const div = document.createElement("div");
            div.innerHTML = response.data
            document.body.append(div);
            document.getElementById("_form_aiochk").submit();
        }
        if (response.providerId === 'newebpay') {
            const data = response.data
            const div = document.createElement("div");
            const form = `<form id='Newebpay' name='Newebpay' method='post' action='https://core.newebpay.com/MPG/mpg_gateway' style='display: none;'><input type='text' name='MerchantID' value='${data.MerchantID}'><input type='text' name='TradeInfo' value='${data.TradeInfo}'><input type='text' name='TradeSha' value='${data.TradeSha}'><input type='text' name='Version' value='${data.Version}'></form>`
            div.innerHTML = form
            console.log(form)
            document.body.append(div);
            document.getElementById("Newebpay").submit();
        }
        if (response.providerId === 'linepay') {
            window.location.href = response.data.info.paymentUrl.web
        }
        if (response.providerId === 'phonepe') {
            window.location.href = response.data.data.instrumentResponse.redirectInfo.url
        }
        if (response.providerId === 'stripe') {
            window.location.href = response.data
        }
        if (response.providerId === 'coinbase-commerce') {
            window.location.href = response.data
        }
        if (response.providerId === 'square') {
            window.location.href = response.data
        }
        if (response.providerId === 'ccavenue') {
            document.body.innerHTML = response.data;
            document.forms[0].submit();
        }
        if (response.providerId === 'authorize-net') {
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "https://accept.authorize.net/payment/payment");
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "token");
            hiddenField.setAttribute("value", response.data);
            form.appendChild(hiddenField);
            document.body.appendChild(form);
            form.submit();
        }
    })
const shipmentId = new URLSearchParams(window.location.search).get("s");
if (shipmentId) {
    fetch(`https://api.certifiedco.de/_functions/link/${shipmentId}`).then(async (res) => {
        const data = await res.json()
        if (data.provider === "com.certifiedcode.ecpay.shipments.map") {
            // submit form post to {data.endpoint} with data from {data.data} (object)
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", data.endpoint);
            for (const key in data.data) {
                if (data.data.hasOwnProperty(key)) {
                    const element = data.data[key];
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", element);
                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();

        }
        if (data.fallbackUrl) {
            window.location.href = data.fallbackUrl
            return
        }
        const div = document.createElement("div");
        div.innerHTML = data.html
        document.body.append(div);
        document.getElementById("PostForm").submit();
    })
}