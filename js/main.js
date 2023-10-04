// text 작성, 삭제
(function(){
    //function으로 감싸면 내영역이 확보되어 오염시키지 않고 타이핑 효과 적용 가능
    const spanEl = document.querySelector('main h2 span')
    const txtArr = ['Web Publisher','Hyunuk','Director','Producer','Oh!!Nice!!']
    
    // console.log(spanE1)
    index = 0
    let currentTxt = txtArr[index].split('')// 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤 배열로 만들기 => 단어를 하나하나 추출함

    function writeTxt(){
        spanEl.textContent += currentTxt.shift();
        // 배열 요소를 앞에서부터 하나씩 출력 shift : 배열 맨 앞 요소를 가져와서 원본 배열에서 삭제
        // +=  ex) a += 1 ==>  a = a+1

        if(currentTxt.length !== 0){
        //currenTxt의 길이가 (배열이)0 이 아니라면 == 출력해야할 단아가 남았다.
        // !== 아니다 ||    = 오른쪽것을 왼쪽에   ||  대입 == 같다

        setTimeout(writeTxt, Math.floor(Math.random() * 100))
        // 무작위로 글자의 타이핑 속도를 정함
        //setTimeout(딜레이(시작시간을 정함)),setInterval(반복),clear(반복제거)
        } else {
            //currentTxt 길이가 0이다 == 배열 안에 있는 모든 텍스트가 전부 출력이 되었다.
            currentTxt = spanEl.textContent.split("");
            //텍스트를 지우기 위해서 화면에 표시된 텍스트를 가져와서 단어단어를 분리
            setTimeout(deleteTxt, 3000)
            //3초 후 텍스트 지우기
        }
    }
    function deleteTxt(){
        //shift <-----> pop
        currentTxt.pop() //배열에 있는 요소를 끝에서부터 하나씩 삭제
        spanEl.textContent = currentTxt.join('') // 현재 배열에 있는 요소를 하나의 문자열로 합쳐서 삭제된것처럼 보임
        if(currentTxt.length !==0){
            setTimeout(deleteTxt, Math.floor(Math.random()*100))
            // 만약에 값이 남아있으면 deleteTxt()함수를 호출하고 호출시간은 0~100 랜덤으로 돌리겠다.
        }else {
            //모든 배열이 pop에 의해서 삭제되면 실행
            index = (index + 1) % txtArr.length;
            // %(나머지), /(나누기)
            currentTxt = txtArr[index].split("")
            writeTxt();
        }
    }
    writeTxt()
})();


// scroll 했을 때 header
const headerEl = document.querySelector('header')

window.addEventListener('scroll', function(){
    // requestAnimationFrame(반복되는 함수)
    requestAnimationFrame(scrollCheck)
});
function scrollCheck(){
    let browserScrollY =  window.scrollY ? window.scrollY : window.pageYOffset
    // 삼항연산자 (if문이랑 비슷)
    // x ? y : z 
    if(browserScrollY > 0) {
        // scroll 했다 !
        headerEl.classList.add('active') 
    } else {
        // scroll 없다 !
        headerEl.classList.remove('active')
    }
}

// 애니메이션 스크롤 이동 ( 메뉴를 클릭하면 해당 영역으로 이동하기)
// const ____ = _____________________
const animationMove = function(selector){
    // 1. selector(매개변수)로 이동할 대상 요소를 가져오기
    const targetEl = document.querySelector(selector)
    // 2. 현재 브라우저 스크롤 정보 y값 (세로)
    const bScrollY = window.pageYOffset;
    // 3. 이동할 대상의 위치 y값 
    const targetScrollY = targetEl.getBoundingClientRect().top + bScrollY
    //  ____.get~~~~~~ : ____  요소의 상대적인 위치정보를 제공
    // 4. 스크롤 이동
    window.scrollTo({ top: targetScrollY, behavior: 'smooth'})
}

// 스크롤 이벤트 연결하기
// ---> button 태그에 data-~~~~ 속성을 지정해둔 2가지 속성을 연결
const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]')
for(let i = 0; i < scrollMove.length; i++){
    scrollMove[i].addEventListener('click',function(){
        const target = this.dataset.target;
        animationMove(target)
    })
}

