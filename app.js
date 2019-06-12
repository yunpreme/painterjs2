const canvas = document.getElementById("jsCanvas");
// canvas는 context를 갖고있는 HTML의 요소인데 그 요소안에서 픽셀을 다루는 것임
const ctx = canvas.getContext("2d");

//canvas는 두가지 사이즈를 가진다(css사이즈, pixel manipulating 사이즈)
//pixel을 다룰 수 있는 element로 만든다
//pixel modifier에 사이즈를 주어야 작동한다.
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
    ctx.beginPath;
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

function onMouseDown(event) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  //mousedown은 마우스를 클릭했을때 발생하는 이벤트임
  canvas.addEventListener("mousedown", startPainting);
  //mouseup은 마우스를 떼엇을때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
