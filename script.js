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
  const role = document.getElementById("newRole").value;
  const dept = document.getElementById("newDept").value;

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
    deviceId: deviceId,
    role: role,
    department: dept
  };

  localStorage.setItem("users", JSON.stringify(users));

  /* GỬI DỮ LIỆU LÊN GOOGLE SHEET */

  const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

  const query =
  "?action=register" +
  "&username=" + encodeURIComponent(username) +
  "&password=" + encodeURIComponent(password) +
  "&deviceId=" + encodeURIComponent(deviceId) +
  "&role=" + encodeURIComponent(role) +
  "&department=" + encodeURIComponent(dept);

  try {

    await fetch(url + query, {
      method: "GET",
      mode: "no-cors"
    });

    console.log("Đã gửi đăng ký lên Google Sheet");

  } catch (err) {

    console.log("Lỗi gửi dữ liệu:", err);

  }

  alert("Đăng ký thành công");

  // XÓA DỮ LIỆU INPUT
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("newRole").value = "";
  document.getElementById("newDept").value = "";

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

  let user = users[username];

  localStorage.setItem("currentUser", JSON.stringify({
  username: username,
  password: password,
  deviceId: deviceId,
  role: user.role,
  department: user.department,
  shift: "08:00 - 17:00"
  }));
  
  window.location.href = "dashboard.html";

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
