import { MarqueeSliderView } from "./MarqueeSliderView.js";

/**
 * 마퀴 슬라이더
 */
class MarqueeSlider {
    constructor(setting = {}) {
        this.itemCount = setting?.itemCount;
        this.itemWidth = setting?.itemWidth;
        this.itemHeight = setting?.itemHeight;
        this.isReverse = setting?.isReverse;
        this.itemGap = setting?.itemGap ?? "0px";
        this.time = setting?.time ?? "10s";
    }//constructor

    /**
     * 마퀴슬라이더 만들어 배포
     */
    init(){
        /* wrap */
        const $wrap = MarqueeSliderView.make_wrap();
        
        /* slider */
        const $slider = MarqueeSliderView.make_slider({
            itemCount : this.itemCount,
            itemWidth : this.itemWidth,
            itemHeight : this.itemHeight,
            itemGap : this.itemGap,
            isReverse : this.isReverse,
            time : this.time,
        });
        $wrap.appendChild($slider);
        
        /* fill items */
        const $$item = MarqueeSliderView.make_items(this.itemCount);
        $slider.appendChild($$item);

        /* 움직이기 시작 */
        $slider.classList.add("on");

        /* 최종 */
        return $wrap;
    }//init
}//class-MarqueeSlider

/**
 * 마퀴 슬라이더 생성기
 */
export class MarqueeSliderBuilder {
    constructor() {
        this.setting = {
            itemCount: 0,
            itemWidth: null,
            itemHeight: null,
            isReverse: false,
            time: "10s",
            itemGap: "0px",
        };
    }

    set_count(itemCount = 0) {
        this.setting.itemCount = itemCount;
        return this;
    }//set_count

    set_item_width(itemWidth = 0) {
        this.setting.itemWidth = itemWidth;
        return this;
    }//set_item_width

    set_item_height(itemHeight = 0) {
        this.setting.itemHeight = itemHeight;
        return this;
    }//set_item_height

    is_move_reverse(moveReverse = true) {
        this.setting.isReverse = moveReverse;
        return this;
    }//is_move_reverse

    set_time(time = "10s") {
        this.setting.time = time;
        return this;
    }//set_time

    set_item_gap(itemGap = "0px") {
        this.setting.itemGap = itemGap;
        return this;
    }

    init() {
        return new MarqueeSlider(this.setting).init();
    }//init
}//class-MarqueeSliderBuilder