$(".inp-name-block").on("change", '[name="radio-type-of-occup-name-inp"]', function (e) {
    let radioBtn = $(e.target),
        classNameMltiselect = "inp-name-block--radio-uses-multiselect",
        classNameInput = "inp-name-block--radio-uses-input",
        inpNameBlock = radioBtn.closest(".inp-name-block")   ;
    if(radioBtn.hasClass(classNameMltiselect)) {
        inpNameBlock
            .removeClass(classNameInput)
            .addClass(classNameMltiselect);
    } else {
        inpNameBlock
            .removeClass(classNameMltiselect)
            .addClass(classNameInput);
    }
});

$(".form-search-similar").on("submit", function (e) {
    e.preventDefault();
    let modal = $(this).closest(".modal-add-info-from-related"),
        classSearchForm = "modal-add-info-from-related--search-form",
        classSearchResults = "modal-add-info-from-related--search-results";

    modal
        .removeClass(classSearchForm)
        .addClass(classSearchResults);
});

$(".btn-back-to-search-form").on("click", function (e) {
    let modal = $(this).closest(".modal-add-info-from-related"),
        classSearchForm = "modal-add-info-from-related--search-form",
        classSearchResults = "modal-add-info-from-related--search-results";

        modal
            .removeClass(classSearchResults)
            .addClass(classSearchForm);
});
