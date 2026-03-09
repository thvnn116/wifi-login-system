/* tạo device id */

async function getDeviceID(){

const fp = await FingerprintJS.load();
const result = await fp.get();

return result.visitorId;

}



/* REGISTER */

async function register() {

 const username = document.getElementById("newUsername").value;
 const password = document.getElementById("newPassword").value;

 const deviceId = await getDeviceID();

 let users = JSON.parse(localStorage.getItem("users")) || {};

 // kiểm tra device đã đăng ký account khác chưa
 for (let user in users) {
   if (users[user].deviceId === deviceId) {
     alert("Thiết bị này đã đăng ký tài khoản khác!");
     return;
   }
 }

 users[username] = {
   password: password,
   deviceId: deviceId
 };

 localStorage.setItem("users", JSON.stringify(users));

 alert("Đăng ký thành công");
}



/* LOGIN */

async function login(){

let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

let users = JSON.parse(localStorage.getItem("users") || "{}");

if(!users[user]){

alert("Tài khoản không tồn tại");
return;

}

if(users[user].password !== pass){

alert("Sai mật khẩu");
return;

}

let device = await getDeviceID();

if(users[user].device !== device){

alert("Thiết bị này không được phép đăng nhập tài khoản này");
return;

}

localStorage.setItem("login","true");

alert("Đăng nhập thành công");

window.location="dashboard.html";

}
