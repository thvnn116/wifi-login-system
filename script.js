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

async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
        alert("Tài khoản không tồn tại");
        return;
    }

    if (users[username].password !== password) {
        alert("Sai mật khẩu");
        return;
    }

    const deviceId = await getDeviceID();

    alert("Đăng nhập thành công");

    sendCheckin(username, password, deviceId);

}

/* CHECKIN */
async function sendCheckin(username, password, deviceId) {

  const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      deviceId: deviceId,
      action: "checkin"
    })
  });

  const result = await res.text();

  if (result === "SUCCESS") {
    alert("Chấm công thành công");
  }

  if (result === "WRONG_DEVICE") {
    alert("Thiết bị không hợp lệ");
  }

}
