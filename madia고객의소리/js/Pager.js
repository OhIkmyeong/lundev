import { List } from "./List.js";
import { PagerModel } from "./PagerModel.js";

export class Pager {
    #dataLength;

    constructor() {
        this.$curr = document.getElementsByClassName("pager-number-curr")?.[0];
        this.$all = document.getElementsByClassName("pager-number-all")?.[0];
        this.$btnPrev = document.getElementsByClassName("pager-btn-prev")?.[0];
        this.$btnNext = document.getElementsByClassName("pager-btn-next")?.[0];
        this.currSave = null;
    }

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    set_data_length(dataLength) {
        this.#dataLength = dataLength;
        return this;
    }//set_data

    /**
     * 
     * @returns 
     */
    init() {
        /* cacul */
        PagerModel.cacul_initial(this.#dataLength);
        this.currSave = PagerModel.curr;

        /* display */
        this.display_curr_all();
        this.change_pager_btn();

        /* (EVENT) */
        this.$btnPrev.addEventListener("click", () => {
            PagerModel.currDecrease();
            if(!this.on_click_btn_common()) return;
        });
        this.$btnNext.addEventListener("click", () => {
            PagerModel.currIncrease();
            if(!this.on_click_btn_common()) return;
        });

        /* 최종 */
        return this;
    }//init

    /**
     * 
     * @returns 
     */
    on_click_btn_common = () => {
        if (this.currSave === PagerModel.curr){return false;}
        console.log("변화 시작 accept");
        this.currSave = PagerModel.curr;
        this.display_curr_all();
        this.change_pager_btn();
        List.fill();
        return true;
    }//on_click_btn_common

    /**
     * 
     * @param {*} curr 
     * @param {*} all 
     */
    display_curr_all() {
        this.$curr.textContent = PagerModel.curr ?? "${1}";
        this.$all.textContent = PagerModel.all ?? "${999}";
    }//display_curr_all

    /**
     * 이전/다음 버튼 스타일 off로 바꾸기 및 disabled 설정
     */
    change_pager_btn(){
        if(this.currSave === 1){
            this.$btnPrev.classList.add("off");
            this.$btnNext.classList.remove("off");
            this.$btnPrev.disabled = true;
            this.$btnNext.disabled = false;
        }else if(this.currSave === PagerModel.all){
            this.$btnPrev.classList.remove("off");
            this.$btnNext.classList.add("off");
            this.$btnPrev.disabled = false;
            this.$btnNext.disabled = true;
        }else{
            this.$btnPrev.classList.remove("off");
            this.$btnNext.classList.remove("off");
            this.$btnPrev.disabled = false;
            this.$btnNext.disabled = false;
        }
    }//change_pager_btn
}//class-Pager