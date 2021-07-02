Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality:90
});

Webcam.attach('#img_webcam');

function takesnapshot(){
    console.log("taking snpshot...");

    Webcam.snap(function(data_uri){
        document.getElementById("img_container").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

//This code is for when the ml5 model is loded *ml5 stands for machine learning 5
function modelLoaded(){
    console.log('ml5 version:', ml5.version);
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BYtambKmA/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded');
}

function test(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById('obj_lab').innerHTML = results[0].label;
        document.getElementById('acc_lab').innerHTML = results[0].confidence.toFixed(3);
    }
}