	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas'); 
	var context = canvas.getContext('2d');
	var selectVideo = document.getElementById('selectVideo');
	var modelPath = document.getElementById('modelPath');
	var result = document.getElementById('result'); 
	// var Type = document.getElementById('Type');
	var flipHorizontal = true;
	let model; 
    var Type="image";

	async function LoadModel() {
		// if (modelPath.value=="") {
		// 	result.innerHTML = "Please input Model Link.";
		// 	return;
		// }
		// else
		// 	result.innerHTML = "Please wait for loading model.";

		// const URL = modelPath.value;
        const URL = 'https://teachablemachine.withgoogle.com/models/Hcnbh22C6/';

		const modelURL = URL + "model.json";
		const metadataURL = URL + "metadata.json";
		try {
			if (Type=="image") {
				model = await tmImage.load(modelURL, metadataURL);
			}
			else if (Type=="pose") {
				model = await tmPose.load(modelURL, metadataURL);
			}	
			maxPredictions = model.getTotalClasses();
            console.log(maxPredictions)
			result.innerHTML = "";
			predict();
		}
		catch (e){
			result.innerHTML = "Loading model failed.";
		}
	} 

    	async function predict() {
		if (flipHorizontal) {	
			  context.translate((canvas.width + video.width) / 2, 0);
			  context.scale(-1, 1);
			  context.drawImage(video, 0, 0, video.width, video.height);
			  context.setTransform(1, 0, 0, 1, 0, 0);  
		}
		else
			context.drawImage(video, 0, 0, video.width, video.height); 		
  
		var data = "";
		var maxClassName = "";
		var maxProbability = "";
		
		if (Type=="image")
			var prediction = await model.predict(canvas);
		else if (Type=="pose") {
			var { pose, posenetOutput } = await model.estimatePose(canvas);
			var prediction = await model.predict(posenetOutput);
		}		

		if (maxPredictions>0) {
			for (let i = 0; i < maxPredictions; i++) {
				if (i==0) {
					maxClassName = prediction[i].className;
					maxProbability = prediction[i].probability;
				}
				else {
					if (prediction[i].probability>maxProbability) {
						maxClassName = prediction[i].className;
						maxProbability = prediction[i].probability;
					}
				}
				data += prediction[i].className + ": " + prediction[i].probability.toFixed(2) + "<br>";
			}
			result.innerHTML = data + "<br>Max Probability : <br>" + maxClassName + ", " + maxProbability.toFixed(2);		
		}
		else
			result.innerHTML = "";
		setTimeout(function(){predict(); }, 100);
    	}

	selectVideo.onchange = function (event) {
	  var target = event.target || window.event.srcElement;
	  var files = target.files;
	  if (files && files.length) {
	    var file = files[0];
		if (video.canPlayType(file.type)!="") {
			var fileURL = URL.createObjectURL(file);
			video.src = fileURL;
		}
		else
			result.innerHTML = "The file type is not supported.";
	  }
	}
	
	video.addEventListener( "loadedmetadata", function () {
		canvas.setAttribute("width", video.videoWidth);
		canvas.setAttribute("height", video.videoHeight);
	}, false );