import { PagerModel } from "./PagerModel.js";

export class List {
    constructor() {
        /* singleton */
        if (List.instance) {
            return List.instance;
        }
        List.instance = this;
    }//constructor

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    set_data(data) {
        List.data = data;
        return this;
    }//set_data

    /**
     * 
     */
    init() {
        // this.reset();
        List.fill();
    }//init

    /**
     * 
     */
    reset() {
        const $list = document.getElementsByClassName("list")?.[0];
        $list.innerHTML = "";
    }//reset

    static async fill() {
        const $list = document.getElementsByClassName("list")?.[0];
        const $$itemRemain = $list.querySelectorAll(".item");

        /* remove */
        if ($$itemRemain.length) {
            await List.remove_remain($$itemRemain);
        }

        /* slice data */
        const items = List.get_items();

        /* fill items */
        items.forEach((item) => {
            const $item = List.make_item(item);
            $list.appendChild($item);
            const $wrap = $item.querySelector(".item-inner-wrap") || $item;
            $wrap.animate([
                {
                    transform:"translateX(100%)",
                    opacity:0,
                },
                {
                    transform:"translateX(0%)",
                    opacity:1,
                }
            ], {
                duration: 400,
                easing: "linear",
                fill: "both"
            });
        });
    }//fill

    static remove_remain($$itemRemain) {
        const length = $$itemRemain.length;
        return new Promise((res, rej) => {
            for (let i = 0; i < length; i++) {
                const $itemRemain = $$itemRemain[i];
                const $wrap = $itemRemain.querySelector(".item-inner-wrap") || $itemRemain;
                const ani = $wrap.animate([
                    { opacity: 1, },
                    { opacity: 0, },
                    {
                        transform: "translateX(-100%)",
                        opacity: 0,
                    }
                ], {
                    duration: 600,
                    easing: "linear",
                    fill: "both"
                });
                ani.addEventListener("finish", () => {
                    $itemRemain.remove();
                    if (i === length - 1) { res("끝") }
                });
            }//for

        });
    }//remove_remain 

    /**
     * 
     * @returns 
     */
    static get_items() {
        const start = (PagerModel.curr - 1) * 4;
        const end = PagerModel.curr * 4
        const items = List.data.slice(start, end);
        console.log(items);
        return items;
    }//get_items

    /**
     * 
     * @param {*} item 
     */
    static make_item(item) {
        const { star, peopleCount, title, content, date } = item;
        /* item */
        const $item = document.createElement("LI");
        $item.classList.add("item");

        /* wrap */
        const $wrap = document.createElement("DIV");
        $wrap.classList.add("item-inner-wrap");
        $item.appendChild($wrap);

        /* 별 */
        const $star = List.make_star({ star, peopleCount });
        $wrap.appendChild($star);

        /* 텍스트 */
        const $text = List.make_text({ title, content });
        $wrap.appendChild($text);

        /* 버튼 + 날짜 */
        const $info = List.make_info(date);
        $wrap.appendChild($info);

        /* 최종 */
        return $item;
    }//make_item

    /**
     * 
     * @param {*} param0 
     * @returns 
     */
    static make_star({ star, peopleCount }) {
        const $sect = document.createElement("SECTION");
        $sect.classList.add("star-sect");

        /* star */
        const $star = document.createElement("ARTICLE");
        $star.classList.add("star");
        $sect.appendChild($star);

        /* star-bg */
        $star.appendChild(List.make_star_text({ isShow: false }));
        /* star-sw */
        $star.appendChild(List.make_star_text({ isShow: true, score: star }));

        /* score */
        const $score = document.createElement("ARTICLE");
        $score.classList.add("star-score");
        $sect.appendChild($score);

        /* score-num */
        const $num = document.createElement("SPAN");
        $num.classList.add("star-score-num");
        $num.textContent = star;
        $score.appendChild($num);

        /* score-whole */
        const $whole = document.createElement("SPAN");
        $whole.classList.add("star-score-whole");
        $whole.textContent = ` (${peopleCount})`;
        $score.appendChild($whole);

        return $sect;
    }//make_star

    static make_star_text({ isShow = false, score }) {
        const $stars = document.createElement("DIV");
        $stars.classList.add(isShow ? "star-sw" : "star-bg");
        if (isShow) {
            $stars.style.setProperty("--sw", score);
        }
        $stars.textContent = "★★★★★";
        return $stars;
    }

    /**
     * 
     * @param {*} param0 
     * @returns 
     */
    static make_text({ title, content }) {
        const $text = document.createElement("SECTION");
        $text.classList.add('text');

        const $title = document.createElement("P");
        $title.classList.add("text-title");
        $title.textContent = title;
        $text.appendChild($title);

        const $content = document.createElement("DIV");
        $content.classList.add("text-content");
        $content.textContent = content;
        $text.appendChild($content);

        return $text;
    }//make_text

    /**
     * 
     * @param {*} date 
     * @returns 
     */
    static make_info(date) {
        const $info = document.createElement("SECTION");
        $info.classList.add("info");

        const $btn = document.createElement("BUTTON");
        $btn.classList.add("info-btn");
        $btn.textContent = "자세히 보기";
        $info.appendChild($btn);

        const $date = document.createElement("P");
        $date.classList.add("info-date");
        $date.textContent = date;
        $info.appendChild($date);

        return $info;
    }//make_info
}//class-List