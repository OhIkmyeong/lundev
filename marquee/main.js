import { MarqueeSliderBuilder } from "./MarqueeSlider.js";

const $slider1 = new MarqueeSliderBuilder()
.set_count(10)
.set_item_width("150px")
.set_item_height("50px")
.set_item_gap("20px")
.is_move_reverse(false)
.set_time("10s")
.init();

const $slider2 = new MarqueeSliderBuilder()
.set_count(5)
.set_item_width("300px")
.set_item_height("350px")
.set_item_gap("5px")
.is_move_reverse(true)
.set_time("10s")
.init();

const $slider3 = new MarqueeSliderBuilder()
.set_count(20)
.set_item_width("100px")
.set_item_height("100px")
.set_item_gap("30px")
.is_move_reverse(true)
.set_time("10s")
.init();

document.body.appendChild($slider1);
document.body.appendChild($slider2);
document.body.appendChild($slider3);