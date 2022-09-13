var url = "https://messages-sandbox.nexmo.com/v1/messages";

async function sendSMS() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic OGE1Njc0ZWQ6NUNva1RxOXBxem5BTjdyeA==");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = `{
        "from": "14157386102",
        "to": "94713032404",
        "message_type": "text",
        "text": "Hello, 3rd EYE Surveillance System was detected an abnormal situation. Plz check soon.",
        "channel": "whatsapp"
    }`;

    xhr.send(data);
    console.log("send fun called")
}