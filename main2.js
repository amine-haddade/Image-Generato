const apikey='KCfsjI33LmfmlkcPwtgRYdpgTvKjUdHZcjfGUZSCsJ6dPR1vBDnpQAbW';
let ulImages=document.getElementById("images");
let imageNmae=null
const lightBox=document.getElementById("lightBox");
let currenPage=1;
async function getImages(apiUrl){
    await fetch(apiUrl,{
        headers:{Authorization:apikey}
    })
    .then(response=>response.json())
    .then(data=>{generateImages(data.photos)});
    
}

function generateImages(images){
    let ulImages=document.getElementById("images");
    ulImages.innerHTML+=images.map((image)=>{
        return `<li class="card" onclick="afficheImage('${image.src.large2x}','${image.photographer}')">
                    <img src=${image.src.large2x} alt="">
                        <div class="info-img">
                            <div class="photographe">
                                <i class="fa-solid fa-camera"></i>
                                <span id="name-photgraphe">${image.photographer}</span>
                            </div>
                            <div class="button-download" onclick="downloadImages('${image.src.large2x}')">
                                <i class="fa-solid fa-download"></i>
                            </div>
                        </div>
                </li>`
    }).join('')
}
getImages(`https://api.pexels.com/v1/curated?page=${currenPage}&per_page=15`);

function downloadImages(image){
    fetch(image)
    .then(file=>file.blob())
    .then(blob=>{
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=new Date().getTime();
    a.click();
    })
    .catch(error => {
        console.error('Error fetching the image:', error);
    });
}

function afficheImage(image,photgraphe){
    lightBox.querySelector("img").src=image;
    lightBox.querySelector("span").innerHTML=photgraphe;
    lightBox.style.display="block";
    
}


function downloadLIght(){
    let imagesrc=document.getElementById("image-lightbox").src;
    downloadImages(imagesrc);
}

document.getElementById("x-mark").addEventListener("click",(e)=>{
    e.target.closest(".lightBox").style.display="none";
})



function serchInpute(){
    let inputName=document.getElementById("serch-img").vlaue;
    getImages(`https://api.pexels.com/v1/search?query=${inputName}&page=${currenPage}&per_page=15`);

}
document.getElementById("serch-img").addEventListener("keyup",(e)=>{
    if(e.target.value==""){
        return
    }
    if(e.key=="Enter"){
        currenPage=1;
        ulImages.innerHTML="";
        imageNmae=e.target.value;
        getImages(`https://api.pexels.com/v1/search?query=${e.target.value}&page=${currenPage}&per_page=15`)
    }
})


let buttonLoadMore=document.getElementById("moreBtn");

buttonLoadMore.addEventListener("click",(e)=>{
    currenPage++;
    apilOad=`https://api.pexels.com/v1/curated?page=${currenPage}&per_page=15`;
    if(imageNmae){
        apilOad=`https://api.pexels.com/v1/search?query=${imageNmae}&page=${currenPage}&per_page=15`
    }
    getImages(apilOad);
})