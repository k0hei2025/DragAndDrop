import { validate } from '../Validation/validation.js';
import { description, people, title, } from "../variables/AllVariables.js";
export const storeValue = () => {
    const enterTitle = title.value;
    const enterDescription = description.value;
    const enterPeople = people.value;
    const titleValidateValue = {
        value: enterTitle,
        required: true,
    };
    const descriptionValidateValue = {
        value: enterDescription,
        required: true,
        minLength: 5,
    };
    const peopleValidationValue = {
        value: +enterPeople,
        required: true,
        min: 1,
        max: 5
    };
    if (!validate(titleValidateValue)
        || !validate(descriptionValidateValue)
        || !validate(peopleValidationValue)) {
        console.log(titleValidateValue, descriptionValidateValue, peopleValidationValue);
        console.log(enterTitle, enterDescription, enterPeople);
        alert('Invalid input or please try again');
        return;
    }
    else {
        console.log('submit');
        return [enterTitle, enterDescription, +enterPeople];
    }
};
//# sourceMappingURL=store.js.map