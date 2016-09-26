export default function validateFormEditOccupInfo(formFields, props) {
    var errors = {
        name: {
            'occupationGroup': null,
            'clarifiedOccup': null,
            'clarification': null,
            'occupationName': null,
            'occupationNameMin': null
        },
        features: {
            'isIndependent': null,
            'isVirtual': null
        },
        duration: {
            'creatingInStateDate': null,
            'creatingInKPIDate': null
        },
        codes: [ ],
        responsibilities: [ ],
        haveToKnow: [ ],
        qualiffRequir: [ ]
    };
    if(!formFields.name.occupationGroup)
        errors.name.occupationGroup = "Це поле є обов'язковим!";
    if(!formFields.name.clarification && props.fields.includes('name.clarification'))
        errors.name.clarification = "Це поле є обов'язковим!";
    if(!formFields.name.occupationName)
        errors.name.occupationName = "Це поле є обов'язковим!";
    if(!formFields.name.occupationNameMin)
        errors.name.occupationNameMin = "Це поле є обов'язковим!";
    /*
     if(!formFields.duration.creatingInStateDate && !formFields.duration.creatingInKPIDate)
     errors.duration = "Не обрано дат створення посади!";
     */
    errors.codes = formFields.codes.map( (portion, portionIndex, fullArr) => {
        return {
            'portionStartDate': !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            'codeKP': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            'codeETDK': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            'codeZKPPTR': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
            'codeDKHP': !portion.codeKP && !portion.codeETDK && !portion.codeZKPPTR && !portion.codeDKHP && "Не введено жодного з кодів!",
        }
    });

    errors.responsibilities = formFields.responsibilities.map( (portion, portionIndex, fullArr) => {
        return {
            'portionStartDate': !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            //'portionEndDate': (fullArr.length > 1 && portionIndex < fullArr.length && !portion.portionEndDate) ? "Для попередніх наборів має бути встановлена дата припинення дії тексту!" : null,
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            'text': !portion.text && "Не введено тексту!",
            'id': null
        };
    });
    errors.haveToKnow = formFields.haveToKnow.map( (portion, portionIndex, fullArr) => {
        return {
            'portionStartDate': !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            'text': !portion.text && "Не введено тексту!",
            'id': null
        };
    });
    errors.qualiffRequir = formFields.qualiffRequir.map( (portion, portionIndex, fullArr) => {
        return {
            'portionStartDate': !portion.portionStartDate && "Не обрано дати прийняття тексту!",
            'portionEndDate': portion.portionEndDate && (portion.portionStartDate > portion.portionEndDate) && "Дата припинення дії має бути більшою за дату прийняття",
            'text': !portion.text && "Не введено тексту!",
            'id': null
        };
    });

    return errors
}
