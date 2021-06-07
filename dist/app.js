"use strict";
console.log('watch');
const formElements = document.getElementById('project-input');
const listElements = document.getElementById('app');
const importNode = document.importNode(formElements.content, true);
const element = importNode.firstElementChild;
const title = element.querySelector('.title');
const description = element.querySelector('.description');
const people = element.querySelector('.people');
const projectListElements = document.getElementById('project-list');
const divElement = document.getElementById('app');
const validate = (validateValue) => {
    let isValid = true;
    let message = [];
    if (validateValue.required) {
        isValid = isValid && validateValue.value.toString().trim().length !== 0;
    }
    if (validateValue.minLength != null && typeof validateValue.value === 'string') {
        isValid = isValid && validateValue.value.length >= validateValue.minLength;
    }
    message.push('minlength error');
    if (validateValue.maxLength != null && typeof validateValue.value === 'string') {
        isValid = isValid && validateValue.value.length <= validateValue.maxLength;
    }
    message.push('maxLength errr');
    if (validateValue.min != null && typeof validateValue.value === 'number') {
        isValid = isValid && validateValue.value >= validateValue.min;
    }
    message.push('min error');
    if (validateValue.max != null && typeof validateValue.value === 'number') {
        isValid = isValid && validateValue.value <= validateValue.max;
    }
    message.push('max error');
    console.log(message);
    return isValid;
};
const attach = () => {
    listElements.insertAdjacentElement('beforebegin', element);
};
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
const storeValue = () => {
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
const submitHandler = (event) => {
    event.preventDefault();
    const gatherValue = storeValue();
    if (Array.isArray(gatherValue)) {
        const [title, discription, people] = gatherValue;
        console.log(title, discription, people);
    }
};
element.addEventListener('submit', submitHandler);
const projectInput = () => {
    element.id = 'user-input';
    attach();
};
const active = new ProjectList('active');
const finished = new ProjectList('finished');
projectInput();
//# sourceMappingURL=app.js.map