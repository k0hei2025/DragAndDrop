"use strict";
console.log('watch');
class Project {
    constructor(id, title, description, people, status) {
    }
}
class StateManagement {
    constructor() {
        this.checkStatus = 'active';
        this.pushInput = [];
        this.getList = [];
        this.addInput = (title, description, people, status) => {
            let dataPacket = {
                id: Math.random().toString(),
                title: title,
                description: description,
                people: people,
                status: status
            };
            this.checkStatus = status;
            this.pushInput.push(dataPacket);
            console.log(...this.pushInput);
        };
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new StateManagement();
        return this.instance;
    }
    getListOfProject() {
        return [...this.pushInput];
    }
}
const projectState = StateManagement.getInstance();
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
        this.configure();
    }
    dragStartHandler(event) {
        console.log(event);
    }
    dragEndHandler(_) {
        console.log('Drag End');
    }
    dragOverHandler(_) {
        let re = this.element;
        console.log(re);
        const listEl = this.element.querySelector('ul');
        console.log(listEl);
        listEl.classList.add('droppable');
        console.log(listEl);
    }
    dragLeaveHandler(_) {
    }
    dropHandler(_) { }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderInput() {
        const projects = projectState.getListOfProject();
        let listEl = document.getElementById(`${this.type}-projects-list`);
        projects.filter(statusName => {
            if (projectState.checkStatus === 'active') {
                console.log(projectState.checkStatus);
                listEl = document.getElementById(`${projectState.checkStatus}-projects-list`);
                listEl.innerHTML = '';
                for (let list of projects) {
                    let li = document.createElement('li');
                    li.draggable = true;
                    let heading = document.createElement('h2');
                    heading.style.color = '#ff0062';
                    let people = document.createElement('p');
                    people.style.color = 'grey';
                    let description = document.createElement('b');
                    description.style.fontWeight = '900px';
                    if (list) {
                        li.value = list.id;
                        heading.textContent = list.title;
                        people.textContent = `${list.people} person assigned `;
                        description.textContent = list.description;
                        li.appendChild(heading);
                        li.appendChild(description);
                        li.appendChild(people);
                        listEl.appendChild(li);
                        console.log(people.textContent);
                    }
                }
            }
            console.log('runnnig');
        });
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
        projectState.addInput(title, discription, people, 'active');
        active.renderInput();
        finished.renderInput();
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