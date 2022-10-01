var url = "https://app.notify.lk/api/v1/send";

async function sendSMS(type) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Authorization", "Basic OGE1Njc0ZWQ6NUNva1RxOXBxem5BTjdyeA==");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var msg="";
    if(type==1){
        msg="Hello, 3rd EYE Surveillance System detected someone attempting to cover the camera feed. Plz check";
    }
    else if(type==3){
        msg="Hello, 3rd EYE Surveillance System was detected an abnormal situation. Plz check back.";
    }

    // let uid=process.env.USER_ID;
    // let api_key=process.env.API_KEY;
    var data = `{
        "user_id": "23534",
        "api_key": "VNDAusGquwyAHZttBG1T",
        "sender_id": "NotifyDEMO",
        "to":"94777724874",
        "message": "`+msg+`"
    }`;

    xhr.send(data);
    console.log("send fun called")
}

// https://app.notify.lk/api/v1/send?user_id=23534&api_key=VNDAusGquwyAHZttBG1T&sender_id=NotifyDEMO&to=94777334869&message=Test one