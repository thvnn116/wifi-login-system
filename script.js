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

async function login(){

const username = document.getElementById("user").value;
const password = document.getElementById("pass").value;

const deviceId = await getDeviceID();

const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

const query =
"?action=login" +
"&username=" + encodeURIComponent(username) +
"&password=" + password +
"&deviceId=" + deviceId;

const res = await fetch(url + query);
const text = await res.text();

if(text == "not_found"){
alert("Tài khoản không tồn tại");
return;
}

if(text == "wrong_password"){
alert("Sai mật khẩu");
return;
}

if(text == "wrong_device"){
alert("Sai thiết bị đăng nhập");
return;
}

const user = JSON.parse(text);

user.deviceId = deviceId;

localStorage.setItem("currentUser", JSON.stringify(user));

window.location.href = "dashboard.html";

}
