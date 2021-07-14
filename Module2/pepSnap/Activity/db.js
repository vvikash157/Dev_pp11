let db;
let openRequest=indexedDB.open("Gallery",1);

openRequest.onupgradeneeded=function(e){
    db=e.target.result;
     db.createObjectStore("Media", { keyPath: "mid" }); 
};
openRequest.onsuccess=function(e){
   db=e.target.result;
  
};

openRequest.onerror=function(e) {
    alert("inside error");
};

