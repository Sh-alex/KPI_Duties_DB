//HACK: функція для сумісності react-widgets.DateTimePicker з redux-forms
export default function fixReactWidgetsDatepickerBlur (event, input) {
    event.target = {value: input.value};
    input.onBlur(event);
};