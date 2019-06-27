const canvas = document.getElementById("jsCanvas");
// canvas는 context를 갖고있는 HTML의 요소인데 그 요소안에서 픽셀을 다루는 것임
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//canvas는 두가지 사이즈를 가진다(css사이즈, pixel manipulating 사이즈)
//pixel을 다룰 수 있는 element로 만든다
//pixel modifier에 사이즈를 주어야 작동한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // mousemove이벤트를 콘솔로그하여 offset값을 얻는다
  //offset은 캔버스 안의 마우스위치이고 client값은 화면 전체의 마우스위치
  const x = event.offsetX;
  const y = event.offsetY;
  //mousemove상태에서 클릭하지않고 마우스를 움직이면 path를 시작(beginpath)
  //
  if (!painting) {
    // console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);

    // 클릭후에 mousedown상태
  } else {
    // console.log("creating line in ", x, y);
    //lineTo는 이전의path에서 지금위치까지 선을 만드는 것
    ctx.lineTo(x, y);
    //stroke를 실행하면서 선이 보여지면서 그려짐
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas[0].toDataURL("image/jpeg");
  console.log(image);
  //   const link = document.createElement("a");
  //   link.href = image;
  //   link.download = "yunpremePaint";
  //   link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  //mousedown은 마우스를 클릭했을때 발생하는 이벤트임
  canvas.addEventListener("mousedown", startPainting);
  //mouseup은 마우스를 떼엇을때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  //마우스 우클릭방지용 이벤트리스너
  canvas.addEventListener("contextmenu", handleCM);
}

//Array.from은 object로부터 array로 만든다.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("cilck", handleSaveClick);
}
