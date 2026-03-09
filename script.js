async function getDeviceID(){

const fp = await FingerprintJS.load();
const result = await fp.get();

return result.visitorId;

}


/* REGISTER */

async function register(){

let user = document.getElementById("newuser").value;
let pass = document.getElementById("newpass").value;

if(!user || !pass){

alert("Nhập đầy đủ thông tin");
return;

}

let device = await getDeviceID();

let users = JSON.parse(localStorage.getItem("users") || "{}");

if(users[user]){

alert("Tài khoản đã tồn tại");
return;

}

users[user] = {
password:pass,
device:device
};

localStorage.setItem("users",JSON.stringify(users));

alert("Đăng ký thành công");

}


/* LOGIN */

async function login(){

let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

let device = await getDeviceID();

let users = JSON.parse(localStorage.getItem("users") || "{}");

if(!users[user]){

alert("Tài khoản không tồn tại");
return;

}

if(users[user].password !== pass){

alert("Sai mật khẩu");
return;

}

if(users[user].device !== device){

alert("Thiết bị này không được phép đăng nhập tài khoản này");
return;

}

localStorage.setItem("login","true");

window.location="dashboard.html";

}
