
const canvas= document.getElementById("mycanvas");
canvas.width=500;
canvas.height= 300;
let ctx= canvas.getContext("2d");

const myImage= new Image();
myImage.src= "./assets/green_image1.webp";

// ctx.drawImage(myImage,0,0,500,300);
myImage.addEventListener("load",()=>{
    console.log("imageLoaded");
    ctx.drawImage(myImage,0,0,canvas.width,canvas.height);

    //  it is an object
    let scannedImage= ctx.getImageData(0,0,canvas.width,canvas.height);
    console.log(scannedImage);

    // it is an array
    let scannedData= scannedImage.data;
    console.log(scannedData);

    // after skipping 4 we get new pixel which 
    // again has 4 values r g b a
    for(let i=0;i<scannedData.length;i+=4){
        let r= scannedData[i];
        let g= scannedData[i+1];
        let b= scannedData[i+2];
        // console.log(r,g,b);
        // now we need to change this
        if(r>=0 && r<=100 && g>=105 && g<=220 && b>=8 && b<=108){
            scannedData[i]=0;
            scannedData[i+1]=0;
            scannedData[i+2]=255;
        }
        
    }
    scannedImage.data=scannedData;
    ctx.putImageData(scannedImage,0,0);
    
});

