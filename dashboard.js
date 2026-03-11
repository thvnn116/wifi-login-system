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


/* CHECKIN */
async function checkin(){

const user = JSON.parse(localStorage.getItem("currentUser"));

const url = "https://script.google.com/macros/s/AKfycbw-hlUyOgU_eerQnykqBLRbz7Tfrn1U9AJnhnInqGQBU1FAuFtnNKyKXQTkPVuxP0jh/exec";

const query =
"?action=checkin" +
"&username=" + user.username +
"&deviceId=" + user.deviceId +
"&shift=" + user.shift;

await fetch(url + query,{
method:"GET",
mode:"no-cors"
});

const btn = document.getElementById("checkinBtn");

btn.innerText = "Đã chấm công";
btn.disabled = true;

alert("Chấm công thành công");

}

/* ẨN TRẠNG THÁI NÚT */
window.onload = function(){

const checked = localStorage.getItem("checkedToday");

if(checked){

const btn = document.getElementById("checkinBtn");

btn.innerText = "Đã chấm công";
btn.disabled = true;

}

}
