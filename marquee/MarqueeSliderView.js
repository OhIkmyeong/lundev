export class MarqueeSliderView {
    /**
     * 
     * @returns 
     */
    static make_wrap() {
        const $wrap = document.createElement("DIV");
        $wrap.classList.add("slider-wrap");
        return $wrap;
    }//make_wrap

    /**
     * 
     * @returns 
     */
    static make_slider(INFO = {}) {
        const { itemCount, itemWidth, itemHeight, itemGap, isReverse, time } = INFO;

        const $slider = document.createElement("UL");
        $slider.classList.add("slider");
        $slider.style.setProperty("--_time", time);
        $slider.style.setProperty("--_gap", itemGap);
        $slider.style.setProperty("--_count", itemCount);
        $slider.style.setProperty("--_wid-item", itemWidth);
        $slider.style.setProperty("--_hei-item", itemHeight);

        const widFull = (itemCount - 1) * parseInt(itemWidth);
        const widGap = (itemCount - 1) * parseInt(itemGap);
        $slider.style.width = `${widFull + widGap}px`

        if(isReverse){$slider.classList.add("slider-move-reverse");}

        return $slider;
    }//make_slider

    /**
     * 
     * @param {Number} itemCount 
     */
    static make_items(itemCount) {
        const $frag = document.createDocumentFragment();

        for (let i = 0; i < itemCount; i++) {
            const $item = document.createElement("LI");
            $item.classList.add("slider-item");
            $item.textContent = i + 1;
            $item.style.setProperty("--_i", i);
            $frag.appendChild($item);
        }//for

        return $frag;
    }//make_items
}//class-MarqueeSliderView