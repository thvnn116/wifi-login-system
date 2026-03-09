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

const username = document.getElementById("newUsername").value;
const password = document.getElementById("newPassword").value;

  const deviceId = await getDeviceID();

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    alert("Tài khoản không tồn tại");
    return;
  }

  if (users[username].password !== password) {
    alert("Sai mật khẩu");
    return;
  }

  if (users[username].deviceId !== deviceId) {
    alert("Thiết bị này không được phép đăng nhập tài khoản này");
    return;
  }

  alert("Đăng nhập thành công!");

window.location="dashboard.html";

}
