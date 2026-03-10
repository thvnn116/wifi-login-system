/* DEVICE ID */

async function getDeviceID() {

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  return result.visitorId;

}


/* REGISTER */

async function register() {

  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const deviceId = await getDeviceID();

  let users = JSON.parse(localStorage.getItem("users")) || {};

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

  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

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

  if (users[username].deviceId !== deviceId) {
    alert("Sai thiết bị đăng nhập");
    return;
  }

  alert("Đăng nhập thành công");

  sendCheckin(username, password, deviceId);

}


/* CHECKIN GOOGLE SHEET */

async function sendCheckin(username, password, deviceId) {

const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

const query =
"?username=" + encodeURIComponent(username) +
"&password=" + encodeURIComponent(password) +
"&deviceId=" + encodeURIComponent(deviceId) +
"&action=checkin";

try {

await fetch(url + query, {
method: "GET",
mode: "no-cors"
});

alert("Đã gửi check-in");

} catch (err) {

console.log(err);
alert("Không kết nối được server");

}

}
