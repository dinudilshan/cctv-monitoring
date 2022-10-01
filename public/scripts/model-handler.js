
    const URL = 'https://teachablemachine.withgoogle.com/models/Hcnbh22C6/';

    let model, webcam, labelContainer, maxPredictions;

    let isIos = false; 
    // fix when running demo in ios, video will be frozen;
    if (window.navigator.userAgent.indexOf('iPhone') > -1 || window.navigator.userAgent.indexOf('iPad') > -1) {
      isIos = true;
    }
    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        const width = 450;
        const height = 450;
        webcam = new tmImage.Webcam(width, height, flip);
        await webcam.setup(); // request access to the webcam

        if (isIos) {
            document.getElementById('webcam-container').appendChild(webcam.webcam); // webcam object needs to be added in any case to make this work on iOS
            // grab video-object in any way you want and set the attributes
            const webCamVideo = document.getElementsByTagName('video')[0];
            webCamVideo.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise
            webCamVideo.muted = "true";
            webCamVideo.style.width = width + 'px';
            webCamVideo.style.height = height + 'px';
        } else {
            document.getElementById("webcam-container").appendChild(webcam.canvas);
        }
        // append elements to the DOM
        labelContainer = document.getElementById('label-container');
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }
        webcam.play();
        window.requestAnimationFrame(loop);
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        let prediction;
        if (isIos) {
            prediction = await model.predict(webcam.webcam);
        } else {
            prediction = await model.predict(webcam.canvas);
        }
        for (let i = 0; i < maxPredictions; i++) {

            let maxClassName = prediction[i].className;
            
            const classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
            
            if(maxClassName=="Class 3"){
                count=3;
            }
            else if( maxClassName=="Class 1"){
                count=1;
            }
            else{
                count=2;
            }
        }
    }

    function vidOff() {
        webcam.stop();
        // await webcam.stop();
    }

    let count=2;
	var prevVal = null;
	var _myInterval = setInterval(function() {
		if(prevVal == count) {
			if(count!=2){
				console.log("abnormal situation by class ", count);
				sendSMS(count);
			}
			
		} else {
			// console.log("Value was changed between past 15 second prev: ", prevVal, " New: ", count)
			prevVal = count;
		}
	}, 10000)