let db;
let openRequest=indexedDB.open("Gallery",1);

openRequest.onupgradeneeded=function(e){
    db=e.target.result;
     db.createObjectStore("Media", { keyPath: "mid" }); 
};
openRequest.onsuccess=function(e){
   db=e.target.result;
   fetchMedia();
  
};

openRequest.onerror=function(e) {
    alert("inside error");
};
function fetchMedia() {
    let txnObject=db.transaction("Media","readonly");
    let mediaTable=txnObject.objectStore("Media");
    let cursorObject=mediaTable.openCursor();
    cursorObject.onsuccess=function (e) {
        let cursor=cursorObject.result;
        if(cursor){
            let mediaObj=cursor.value;
            if(mediaObj.type=="photo"){
                appendphoto(mediaObj);
            }else{
                appendvideo(mediaObj);
            }
            cursor.continue();
        }
    };
}
function appendphoto(mediaObj) {
    let mediaDiv=document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML=`<img class="media-img" src=${mediaObj.url} alt="">
    <div class="media-buttons">
        <div class="download-media">Download</div>
        <div class="delete-media">Delete</div>
    </div>`;
    mediaDiv.querySelector(".download-media").addEventListener("click",function () {
        downloadmedia(mediaObj);
    });
    mediaDiv.querySelector(".delete-media").addEventListener("click",function () {
       deleteMedia(mediaObj,mediaDiv); 
    })
    document.querySelector(".gallery").append(mediaDiv);
}
function appendvideo(mediaObj) {
    let mediaDiv=document.createElement("div");
    mediaDiv.classList.add("media-div");

    mediaDiv.innerHTML=`<video class="media-video" controls autoplay loop></video>
    <div class="media-buttons">
        <div class="download-media">Download</div>
        <div class="delete-media">Delete</div>
    </div>`;
    mediaDiv.querySelector("video").src=URL.createObjectURL(mediaObj.url);
    mediaDiv.querySelector(".download-media").addEventListener("click",function () {
        downloadmedia(mediaObj);
    });
    mediaDiv.querySelector(".delete-media").addEventListener("click",function () {
        deleteMedia(mediaObj,mediaDiv);
    });
    document.querySelector(".gallery").append(mediaDiv);

}
function downloadmedia(mediaObject) {
  let aTag=document.createElement("a");
  if(mediaObject.type=="photo"){
      aTag.download=`${mediaObject.mid}.jpg`;
      aTag.href=mediaObject.url;
  }else{
      aTag.download=`${mediaObject.mid}.mp4`;
      aTag.href=URL.createObjectURL(mediaObject.url);
  } 
  aTag.click();
}
function deleteMedia(mediaObject,mediaDiv) {
    let mid=mediaObject.mid;
    let txnObject=db.transaction("Media","readwrite");
    let mediaTable=txnObject.objectStore("Media");
    mediaTable.delete(mid);
    mediaDiv.remove();
}
