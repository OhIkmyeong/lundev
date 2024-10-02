const $slider = document.querySelector(".slider");
const $pager = document.querySelector(".pager");
const $btnPrev = document.querySelector(".btn-prev");
const $btnNext = document.querySelector(".btn-next");


const LENGTH = 10;
let idxCurr = 0;

/* 슬라이더 넓이 설정 */
$slider.style.width = `${600 * LENGTH}px`

/* 아이템 및 페이저 채워넣기 */
for (let idx = 0; idx < LENGTH; idx++) {
    /* 아이템 */
    const $item = make_item(idx);
    $slider.appendChild($item);
    if (idx === 0) {
        const $itemLast = make_item(LENGTH - 1);
        $slider.prepend($itemLast);
    } else if (idx === LENGTH - 1) {
        const $itemFirst = make_item(0);
        $slider.appendChild($itemFirst);
    }

    /* 페이저 */
    const $btnPager = make_pager(idx);
    $pager.appendChild($btnPager);
    $btnPager.addEventListener("click", () => {
        idxCurr = idx;
        toggle_pager();
        move_slide();
    });
}

/* 최초 움직이기 */
move_slide();

$btnPrev.addEventListener("click",async ()=>{
    idxCurr--;
    console.log(idxCurr);
    if(idxCurr < 0){
        await move_slide_then_reset();
    }else{
        move_slide();
    }
    toggle_pager();
});
$btnNext.addEventListener("click",async ()=>{
    idxCurr++;
    if(idxCurr >= LENGTH - 1){
        await move_slide_then_reset();
    }else{
        move_slide();
    }
    toggle_pager();
});

/* --------------------------- */
function toggle_pager() {
    const $$sib = $pager.querySelectorAll(".pager-btn");
    const idxCurrFinal = idxCurr < 0 ? LENGTH - 1 : (idxCurr >= LENGTH - 1 ? 0 : idxCurr);
    Array.prototype.forEach.call($$sib,($sib,idx)=>{
        $sib.classList.toggle("on", idxCurrFinal === idx);
    });
}//toggle_pager

function make_item(idx) {
    const $item = document.createElement("LI");
    $item.classList.add("slider-item");
    const $content = document.createElement("DIV");
    $content.textContent = idx;
    $item.appendChild($content);
    return $item;
}//make_item

function make_pager(idx) {
    const $btnPager = document.createElement("BUTTON");
    $btnPager.classList.add("pager-btn");
    if (idx === 0) { $btnPager.classList.add("on"); }
    $btnPager.dataset.idx = idx;
    return $btnPager;
}

function move_slide() {
    return $slider.animate([
        { transform: `translateX(${(idxCurr + 1) * -600}px)` }
    ], {
        duration: 500,
        fill: "both",
        easing: "linear"
    });
}//move_slide

async function move_slide_then_reset(){
    /* 눈속임 해주고 */
    const ani = move_slide();

    ani.addEventListener("finish",()=>{
        /* 변수값 맞추고 */
        if(idxCurr < 0){
            idxCurr = LENGTH - 1 
        }else if(idxCurr >= LENGTH - 1){
            idxCurr = 0;
        }

        /* 원위치 */
        $slider.animate([
            { transform: `translateX(${(idxCurr + 1) * -600}px)` }
        ], {
            duration: 10,
            fill: "both",
            easing: "steps(1)"
        });
    });
}//move_slide_then_reset