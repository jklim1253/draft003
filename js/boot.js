// 요일을 반환한다.
function days_of_week() {
  return [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
}
// 년도별 각 월의 일수를 배열로 반환한다.
function days_of_month(y) {
  var feb = 28;
  if (y%400 == 0 || (y%100 != 0 && y%4 == 0))
    feb = 29;

  return [
    31, feb, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];
}
// 년월에 따른 시작 요일을 반환한다.
// 0 일요일, 1 월요일, .... 6 토요일 
function day_of_week(y, m) {
  var remain = (y-1) + parseInt((y-1)/4) - parseInt((y-1)/100) + parseInt((y-1)/400);
  var dom = days_of_month(y);
  var sum = 0;
  for (var i = 0; i < m - 1; ++i)
    sum += dom[i];
  return (remain + sum)%7;
}
// 입력 요소를 초기화 한다.
// 오늘 날짜로 년, 월을 초기화 한다.
function prepare_input() {
  var body = document.getElementsByTagName("body")[0];
  if (body === null) return;

  var controller = document.createElement("div");
  controller.className = "block";
  body.appendChild(controller);

  var now = new Date();
  var year_value = now.getFullYear();
  var month_value = now.getMonth() + 1;

  var year = document.createElement("input");
  year.className = "input";
  year.placeholder = "year";
  year.id = "input_year";
  controller.appendChild(year);
  year.value = year_value;

  var month = document.createElement("input");
  month.className = "input";
  month.placeholder = "month";
  month.id = "input_month";
  controller.appendChild(month);
  month.value = month_value;

  var apply = document.createElement("button");
  apply.className = "apply";
  apply.id = "apply";
  apply.appendChild(document.createTextNode("Apply"));
  controller.appendChild(apply);
}
// 춥력 요소를 초기화 한다.
// 요일 출력 및 일자 공간을 생성한다.
function prepare_frame() {
  var body = document.getElementsByTagName("body")[0];
  if (body === null) return;

  var month = document.createElement("div");
  month.className = "block";
  body.appendChild(month);

  var weeks = document.createElement("div");
  weeks.id = "weeks";
  month.appendChild(weeks);
  for (var i = 0; i < 7; ++i)
  {
    var week = document.createElement("div");
    var dow = days_of_week();
    week.appendChild(document.createTextNode(dow[i]));
    week.className = "week";
    weeks.appendChild(week);
  }

  var days = document.createElement("div");
  days.id = "days";
  month.appendChild(days);
  for (var i = 0; i < 7; ++i)
  {
    for (var j = 0; j < 6; ++j)
    {
      var day = document.createElement("div");
      var textnode = document.createTextNode("");
      day.appendChild(textnode);
      day.className = "day";
      days.appendChild(day);
    }
  }
}
// 주어진 년, 월에 따라 일자 출력 부분에 일자를 표시한다.
function assign_days(y, m) {
  var days = document.getElementById("days");
  if (days === null) return;

  var months = days_of_month(y);
  var start = day_of_week(y, m);
  for (var i = 0; i <= start; ++i)
  {
    days.childNodes[i].innerText = "x";
  }
  var d;
  for (var i = 0; i < 42 - (start + 1); ++i)
  {
    if (i + 1 > months[m-1]) d = 'x';
    else d = `${i + 1}`;
    days.childNodes[start + 1 + i].innerText = d;
  }
}
// 입력 요소의 이벤트를 등록한다.
function handle_input() {
  document.getElementById("apply").addEventListener("click", ()=>{
    var year = document.getElementById("input_year").value;
    var month = document.getElementById("input_month").value;

    assign_days(year, month);
  });
}
// 실행 함수.
function boot() {
  prepare_input();
  prepare_frame();
  handle_input();

  document.getElementById("apply").dispatchEvent(new Event("click"));
}
window.addEventListener("load", boot);