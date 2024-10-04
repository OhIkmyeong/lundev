import { List } from "./List.js";
import { Pager } from "./Pager.js";

(async function(){
    /* json fetch */
    const data = await fetch("./dummy.json").then(res=>res.json()).then(json=>json.list);
    
    /* reset - pager */
    new Pager()
    .set_data_length(data?.length)
    .init();

    /* reset - list */
    new List()
    .set_data(data)
    .init();

}())