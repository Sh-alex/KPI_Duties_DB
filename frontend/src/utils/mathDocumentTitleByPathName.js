export default function mathDocumentTitleByPathName(pathname) {
    switch(pathname) {
        case '\/add':
            return 'Додати нову посаду. Автоматизована інформаційна система "Класифікатор посад"';
        case '\/search':
            return 'Пошук посад. Автоматизована інформаційна система "Класифікатор посад"';
        case '\/ctrldict':
            return 'Контроль списків. Автоматизована інформаційна система "Класифікатор посад"';
        default:
            return 'Автоматизована інформаційна система "Класифікатор посад"';
    }
}