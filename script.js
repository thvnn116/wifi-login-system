async function login(){

let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

let device = await getDeviceID();

let savedDevice = localStorage.getItem("device_"+user);

if(user === "admin" && pass === "12345"){

if(!savedDevice){

localStorage.setItem("device_"+user,device);

}else if(savedDevice !== device){

alert("Thiết bị này không được phép đăng nhập tài khoản này");

return;

}

localStorage.setItem("login","true");

window.location="dashboard.html";

}else{

alert("Sai tài khoản hoặc mật khẩu");

}

}

async function getDeviceID(){

const fp = await FingerprintJS.load();

const result = await fp.get();

return result.visitorId;

}


/* Dashboard */

if(window.location.pathname.includes("dashboard")){

if(localStorage.getItem("login") !== "true"){

window.location="index.html";

}

fetch("https://api.ipify.org?format=json")
.then(res=>res.json())
.then(data=>{

document.getElementById("ip").innerText=data.ip;

});


let ua=navigator.userAgent;

document.getElementById("device").innerText=navigator.platform;

document.getElementById("browser").innerText=ua;

document.getElementById("os").innerText=navigator.platform;

}
