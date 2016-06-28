"use strict";

$("#btn-toggle-extended-search").click(e => {
    let el = $(".search-form-inner");
    if(el.hasClass("search-extended")) {
        el.addClass("search-min");
        el.removeClass("search-extended");
    } else {
        el.removeClass("search-min");
        el.addClass("search-extended");
    }
});
