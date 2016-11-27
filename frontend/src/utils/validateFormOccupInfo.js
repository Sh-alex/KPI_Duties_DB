export default function validateFormEditOccupInfo(formFields, props) {
    var errors = {
        name: {
            'occupationGroup': null,
            'clarifiedOccup': null,
            'clarification': null,
            'occupationName': null,
            'occupationNameMin': null
        },
        durations: [ ],
        codes: [ ],
        responsibilities: [ ],
        haveToKnow: [ ],
        qualiffRequir: [ ],
        descriptionDocRef: {
            docName: null,
            docLink: null
        },
        mainInfoDocRef: {
            docName: null,
            docLink: null
        },
    },
        inputtedAnyText = false;

    if(!formFields.name.occupationGroup)
        errors.name.occupationGroup = "Це поле є обов'язковим!";
    if(!formFields.name.clarification && props.fields.includes('name.clarification'))
        errors.name.clarification = "Це поле є обов'язковим!";
    if(!formFields.name.occupationName)
        errors.name.occupationName = "Це поле є обов'язковим!";
    if(!formFields.name.occupationNameMin)
        errors.name.occupationNameMin = "Це поле є обов'язковим!";

    errors.durations = formFields.durations.map( (portion, portionIndex, fullArr) => {
        return {
            start: !portion.start && "Не обрано дати створення посади!",
            stop: portion.stop && (portion.stop < portion.start) && "Дата відміни має бути більшою за дату створення",
        }
    });
    
    errors.codes = formFields.codes.map( (portion, portionIndex, fullArr) => {
        let inputedAnyCode = portion.codeKP || portion.codeETDK || portion.codeZKPPTR || portion.codeDKHP;
        return {
            'portionStartDate': inputedAnyCode && !portion.portionStartDate && "Не обрано дати прийняття Набору кодів!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            // Коди зараз не обов'язкові
            // 'codeKP': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            // 'codeETDK': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            // 'codeZKPPTR': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            // 'codeDKHP': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
        }
    });

    errors.responsibilities = formFields.responsibilities.map( (portion, portionIndex, fullArr) => {
        if(portion.text)
            inputtedAnyText = true;
        return {
            'portionStartDate': portion.text && !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            //'portionEndDate': (fullArr.length > 1 && portionIndex < fullArr.length && !portion.portionEndDate) ? "Для попередніх наборів має бути встановлена дата припинення дії тексту!" : null,
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            // 'text': !portion.text && "Не введено тексту!",
        };
    });
    errors.haveToKnow = formFields.haveToKnow.map( (portion, portionIndex, fullArr) => {
        if(portion.text)
            inputtedAnyText = true;
        return {
            'portionStartDate': portion.text && !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            // 'text': !portion.text && "Не введено тексту!",
        };
    });
    errors.qualiffRequir = formFields.qualiffRequir.map( (portion, portionIndex, fullArr) => {
        if(portion.text)
            inputtedAnyText = true;
        return {
            'portionStartDate': portion.text && !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            // 'text': !portion.text && "Не введено тексту!",
        };
    });

    if(!formFields.mainInfoDocRef.docName)
        errors.mainInfoDocRef.docName = "Це поле є обов'язковим!";
    if(!formFields.mainInfoDocRef.docLink)
        errors.mainInfoDocRef.docLink = "Це поле є обов'язковим!";

    if(inputtedAnyText && !formFields.descriptionDocRef.docName)
        errors.descriptionDocRef.docName = "Це поле є обов'язковим!";
    if(inputtedAnyText && !formFields.descriptionDocRef.docLink)
        errors.descriptionDocRef.docLink = "Це поле є обов'язковим!";

    return errors
}
