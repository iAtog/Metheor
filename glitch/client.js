setInterval(() => {
 let random = Math.floor(Math.random() * 10);
  let abc = "ABCDEFGHIJKMNLOPQRSTUVWXYZabcdefghijkmnlopqrstuvwxyz"
  let elm = document.getElementById("asdsad");
  if(elm.innerHTML.length%200 == 0){
    elm.innerHTML = elm.innerHTML + "<br>";
  }
  if(random>=7){
    let r = Math.floor(Math.random() * abc.length);
    elm.innerHTML = elm.innerHTML + abc.charAt(r);
  }
   elm.innerHTML = elm.innerHTML + random;
  
}, 1);