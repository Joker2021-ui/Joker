//娑堟伅鍐呭锛屽彲浠ヤ换鎰忛暱搴�
let arr = ["娑堟伅1 : 2006骞�1鏈圝ohn Resig绛変汉鍒涘缓浜唈Query", "娑堟伅2 : 2007骞�7鏈堬紝jQuery 1.1.3鐗堝彂甯�", "娑堟伅3 : 2008骞�5鏈堬紝jQuery 1.2.6鐗堝彂甯�", "娑堟伅4 : 2010骞�1鏈堬紝涔熸槸jQuery鐨勫洓鍛ㄥ勾鐢熸棩"];

var settings = {
  speeds: 10, //婊氬姩鐨勯€熷害,鍗曚綅ms
  isPause: true, //婊氬姩鍚庢瘡涓秷鎭槸鍚﹂渶瑕佹殏鍋滐紝true鍜宖alse,
  isHover:true, //榧犳爣鎮仠鏄惁闇€瑕佹殏鍋�
};

var ul = document.querySelector("ul");
//娓叉煋鏁版嵁
arr.forEach((item) => {
  var li = document.createElement("li");
  li.innerHTML = item;
  ul.appendChild(li);
});
//鑾峰彇褰撳墠婊氬姩鐨勯珮搴︼紝鏀寔ie璇疯嚜琛屼娇鐢╟urrentStyle
var currentTop = parseInt(window.getComputedStyle(ul).top);

//婊氬姩鍑芥暟
function run() {
  currentTop--;
  ul.style.top = currentTop + "px";
  
  //褰撻〉闈㈡粴鍔ㄦ渶鍚庝竴涓椂锛屾妸绗竴涓鍒秔ush鍒板熬閮�
  if (currentTop == (arr.length - 1) * -50) {
    let li = document.createElement("li");
    li.innerHTML = arr[0];
    ul.appendChild(li);
  }

  //鏃犵紳鏇挎崲
  if (currentTop == arr.length * -50) {
    currentTop = 0;
    ul.style.top = currentTop + "px";
    var li = document.querySelectorAll("li");
    ul.removeChild(li[li.length - 1]);
  }

  //婊氬姩鍚庢瘡涓秷鎭槸鍚﹂渶瑕佹殏鍋�
  if (settings.isPause) {
    if (currentTop % 50 == 0) {
      clearInterval(timer);
      setTimeout(function () {
        timer = setInterval(run, settings.speeds);
      }, 3000);
    }
  }
}
var timer = setInterval(run, settings.speeds);

//榧犳爣鎮仠鏄惁闇€瑕佹殏鍋�
ul.onmouseover = function () {
    if(settings.isHover){
        clearInterval(timer);
    }
};
ul.onmouseleave = function () {
    if(settings.isHover){
        timer = setInterval(run, settings.speeds);
    }
};