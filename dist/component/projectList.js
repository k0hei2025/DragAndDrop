import { projectState } from "../state/state.js";
import { element, listElements, } from '../variables/AllVariables.js';
export class ProjectList {
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
                    li.className = 'dragthing';
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
export const attach = () => {
    listElements.insertAdjacentElement('beforebegin', element);
};
//# sourceMappingURL=projectList.js.map