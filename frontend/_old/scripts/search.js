"use strict";

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

$(".btn--collapse-box").click(function(e) {
    let thisBtn = $(this),
        thisBox = thisBtn.closest(".box"),
        collapsibleElements = thisBox.find(".box-body").add(".box-footer"),
        //boxSearchForm = $(".box--search-form"),
        btnIcon = thisBtn.find(".fa");
    if(thisBox.hasClass("collapsed-box")) {
        thisBox.removeClass("collapsed-box");
        collapsibleElements.slideDown();
        btnIcon
            .removeClass("fa-minus")
            .addClass("fa-plus");
    } else {
        thisBox.addClass("collapsed-box");
        collapsibleElements.slideUp();
        btnIcon
            .removeClass("fa-plus")
            .addClass("fa-minus");
    }
});

$(".inp-name-block").on("change", '[name="radio-type-of-occup-name-inp"]', function (e) {
    let radioBtn = $(e.target),
        classNamemMltiselect = "inp-name-block--radio-uses-multiselect",
        classNamemInput = "inp-name-block--radio-uses-input",
        inpNameBlock = radioBtn.closest(".inp-name-block")   ;
    if(radioBtn.hasClass(classNamemMltiselect)) {
        inpNameBlock
            .removeClass(classNamemInput)
            .addClass(classNamemMltiselect);
    } else {
        inpNameBlock
            .removeClass(classNamemMltiselect)
            .addClass(classNamemInput);
    }
});
