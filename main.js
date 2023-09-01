song="";
Status="";
Objects=[];


function preload()
{
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
}



function draw()
{
    image(video,0,0,380,380);
    if(Status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetection.detect(video, gotResults);
        for(i = 0; i<Objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(r,g,b);
            Percentage = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + Percentage + "%", Objects[i].x + 15, Objects[i].y + 30); 
            noFill();
            stroke(r,g,b);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
            if(Objects[i].label == "Person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("Stop");
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                console.log("Play");
                song.play();
            }
        }
    }

    
    
}

function modelLoaded()
{
    console.log("Model is initialised");
    Status = true;
    objectDetection.detect(video, gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);

    Objects = results;

}

