async function login(){

let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

let response = await fetch("https://api.ipify.org?format=json");
let data = await response.json();

let ip = data.ip;

/* IP wifi nhà - lát nữa bạn thay */

let homeIP = "YOUR_HOME_IP";

if(user === "admin" && pass === "12345"){

if(ip.startsWith(homeIP)){

localStorage.setItem("login","true");

window.location = "dashboard.html";

}else{

alert("Bạn phải đăng nhập bằng WiFi tại nhà");

}

}else{

document.getElementById("msg").innerText="Sai tài khoản hoặc mật khẩu";

}

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
