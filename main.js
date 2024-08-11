let imagesContent=document.getElementById("images");
let moreShowBtn=document.getElementById("moreBtn");
let lightBoxDiv=document.getElementById("lightBox")
let imageName=null;
let valueImageSerch=document.getElementById("serch-img").value;
let apiKey="KCfsjI33LmfmlkcPwtgRYdpgTvKjUdHZcjfGUZSCsJ6dPR1vBDnpQAbW";
let currentPage=1;
const per_Page=15
function géneretImages(img){
    img.map((ele=>{
        imagesContent.innerHTML+=`
        <li class="card" onclick="lightBox('${ele.src.original}','${ele.photographer}')">
                <img src="${ele.src.original}" alt="">
                <div class="info-img">
                    <div class="photographe">
                        <i class="fa-solid fa-camera"></i>
                        <span id="name-photgraphe">${ele.photographer}</span>
                    </div>
                    <div class="button-download">
                        <i onclick="downloadImages('${ele.src.original}')" class="fa-solid fa-download"></i>
                    </div>
                </div>
        </li>`
    }))
    
}
document.getElementsByClassName("X-mark")[0].addEventListener("click",()=>{
    lightBoxDiv.classList.remove("show");
})
function lightBox(photo,namePhotgraphe){
    lightBoxDiv.classList.add("show");
    lightBoxDiv.querySelector(".photographe-lightBox #name-photgraphe").innerHTML=namePhotgraphe;
    lightBoxDiv.querySelector("img").src=photo;
    lightBoxDiv.querySelector(".download").setAttribute("data-img",photo);

}

function loadMoreImages(){
    currentPage++;
    let apiLoad=`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${per_Page}`
    if(imageName){
        apiLoad=`https://api.pexels.com/v1/search?query=${imageName}&page=${currentPage}&per_page=${per_Page}`
    }
    getImages(apiLoad);
    
}
moreShowBtn.addEventListener("click",loadMoreImages)



async function getImages(apiUrl){
    await fetch(apiUrl,{
        headers:{Authorization:apiKey}
    })
    .then(resp=>resp.json())
    .then(data=>{
        géneretImages(data.photos)
    })
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${per_Page}`);


document.getElementById("serch-img").addEventListener("keyup",(e)=>{
    if(e.target.value==""){
        e.target.value=="";
        return
    }
    if(e.key=="Enter"){
        imageName=e.target.value;
        imagesContent.innerHTML=""
        currentPage=1;
        apiUrl=`https://api.pexels.com/v1/search?query=${imageName}&page=${currentPage}&per_page=${per_Page}`;
        getImages(apiUrl);
    }

})


async function downloadImages(value){
    await fetch(value)
    .then(resp=>resp.blob())
    .then(file=>{
        let a=document.createElement("a");
        a.href=URL.createObjectURL(file)
        a.download=new Date().getTime()
        a.click()
    })
}


let  downloadFromData=document.getElementsByClassName("download")[0].addEventListener("click",(e)=>{
    downloadImages(e.currentTarget.dataset.img);
})