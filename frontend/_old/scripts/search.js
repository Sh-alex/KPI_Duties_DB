"use strict";
/*
$("#btn-toggle-extended-search").click(e => {
    let el = $(".box--search-form");
    if(el.hasClass("search-extended")) {
        el.addClass("search-min");
        el.removeClass("search-extended");
    } else {
        el.removeClass("search-min");
        el.addClass("search-extended");
    }
});
*/
$(".btn--collapse-box").click(function(e) {
    let thisBtn = $(this),
        thisBox = thisBtn.closest(".box"),
        btnIcon = thisBtn.find(".fa");
    if(thisBox.hasClass("collapsed-box")) {
        thisBox.removeClass("collapsed-box");
        btnIcon
            .removeClass("fa-plus")
            .addClass("fa-minus");

    } else {
        thisBox.addClass("collapsed-box");
        btnIcon
            .removeClass("fa-minus")
            .addClass("fa-plus");
    }
});

$(".inp-name-block").on("change", '[name="radio-type-of-occup-name-inp"]', function (e) {
    let radioBtn = $(e.target),
        classNameMltiselect = "inp-name-block--radio-uses-multiselect",
        classNameInput = "inp-name-block--radio-uses-input",
        inpNameBlock = radioBtn.closest(".inp-name-block")   ;
    if(radioBtn.hasClass(classNameMltiselect)) {
        inpNameBlock
            .removeClass(classNameInput)
            .addClass(classNameMltiselect);
    } else if(radioBtn.hasClass(classNameInput)){
        inpNameBlock
            .removeClass(classNameMltiselect)
            .addClass(classNameInput);
    } else {
        inpNameBlock
            .addClass(classNameMltiselect)
            .addClass(classNameInput);
    }
});
