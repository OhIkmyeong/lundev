export class PagerModel{
    constructor(){
        /* singleton */
        if (PagerModel.instance) {
            return PagerModel.instance;
        }
        PagerModel.instance = this;
        
        /*  */
        this.curr = null;
        this.all = null;
    }//constructor

    /**
     * 
     * @param {*} dataLength 
     */
    static cacul_initial(dataLength = 0){
        if(!dataLength){console.warn("no dataLength", dataLength);}
        this.curr = 1;
        this.all = Math.ceil(dataLength / 4);
    }//cacul_initial

    static currIncrease(){
        if(this.curr >= this.all){
            this.curr = this.all;
            return;
        }
        this.curr++;
        console.log("다음페이지", this.curr)
    }//currIncrease

    static currDecrease(){
        if(this.curr <= 1){
            this.curr = 1;
            return;
        }
        this.curr--;
        console.log("이전페이지", this.curr)
    }//currDecrease
}//class-PagerModel