const c1= document.getElementById("c1");
const c2= document.getElementById("c2");
const v1= document.getElementById("v1");
const v3= document.getElementById("v3");
const image= document.getElementById("myimg")



c1.width=338;
c1.height=600;
const ctx1= c1.getContext("2d",{ willReadFrequently: true });


c2.width=338;
c2.height=600;
const ctx2= c2.getContext("2d",{ willReadFrequently: true });

let tempC= document.createElement("canvas");
tempC.width=338;
tempC.height=600;
let temp_ctx= tempC.getContext("2d",{ willReadFrequently: true });


// let v2= document.createElement("video");
// v2.src="./assets/road1.mp4";
// v2.muted=true;
// v2.autoplay=true;
// v2.loop=true;

v1.addEventListener("play", drawOn_c1);
function drawOn_c1(){

    ctx1.drawImage(v1,0,0,c1.width,c1.height); 
    
    let scannedImage= ctx1.getImageData(0,0,v1.videoWidth,v1.videoHeight);
    // console.log(scannedImage);
    let scannedData= scannedImage.data;
    // console.log(scannedData);

    
    for(let i=0;i<scannedData.length;i+=4){
        let r= scannedData[i];
        let g= scannedData[i+1];
        let b=scannedData[i+2];
        let a= scannedData[i+3];

        if(r>=120 && r<=190 && g>=157 && g<=207 && b>=70 && b<=158){
            scannedData[i]=255;
            scannedData[i+1]=255;
            scannedData[i+2]=255;
        }
    }
    scannedImage.data=scannedData;
    ctx1.putImageData(scannedImage,0,0);
    // console.log(scannedData);
    
    drawOn_c2();

    
}


function drawOn_c2(){

    ctx2.drawImage(v1,0,0,c2.width,c2.height); 
    
    let scannedImage_ctx2= ctx2.getImageData(0,0,v1.videoWidth,v1.videoHeight);
    // console.log(scannedImage);
    let scannedData_ctx2= scannedImage_ctx2.data;
    // console.log(scannedData);

    temp_ctx.drawImage(v3,0,0,tempC.width,tempC.height);
    let temp_scannedImage = temp_ctx.getImageData(0,0,v3.videoWidth,v3.videoHeight);
    let temp_scannedData= temp_scannedImage.data;
    // console.log(temp_scannedData);
    for(let i=0;i<scannedData_ctx2.length;i+=4){
        let r= scannedData_ctx2[i];
        let g= scannedData_ctx2[i+1];
        let b=scannedData_ctx2[i+2];
        let a= scannedData_ctx2[i+3];

        if(r>=120 && r<=190 && g>=157 && g<=207 && b>=70 && b<=158){
            scannedData_ctx2[i]=temp_scannedData[i];
            scannedData_ctx2[i+1]=temp_scannedData[i+1];
            scannedData_ctx2[i+2]=temp_scannedData[i+2];
        }
    }
    scannedImage_ctx2.data=scannedData_ctx2;
    ctx2.putImageData(scannedImage_ctx2,0,0);    
    setTimeout(drawOn_c1,0);

}

v1.addEventListener("load" , ()=>{
    drawOn_c1();  
});







