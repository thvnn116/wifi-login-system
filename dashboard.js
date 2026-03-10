const user = JSON.parse(localStorage.getItem("currentUser"));

if(!user){
alert("Chưa đăng nhập");
window.location.href = "/";
}

// hiển thị thông tin nhân viên

document.getElementById("empName").innerText = user.username;
document.getElementById("empRole").innerText = user.role;
document.getElementById("empDept").innerText = user.department;
document.getElementById("empShift").innerText = user.shift;



async function checkin(){

const deviceId = await getDeviceID();

const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

const query =
"?action=checkin" +
"&username=" + user.username +
"&password=" + user.password +
"&deviceId=" + deviceId;

fetch(url + query,{
method:"GET",
mode:"no-cors"
});

alert("Chấm công thành công");

}
