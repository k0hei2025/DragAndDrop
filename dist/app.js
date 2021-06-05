"use strict";
console.log('watch');
const projectInput = () => {
    const formElements = document.getElementById('project-input');
    const listElements = document.getElementById('app');
    const attach = () => {
        listElements.insertAdjacentElement('afterbegin', element);
    };
    const importNode = document.importNode(formElements.content, true);
    const element = importNode.firstElementChild;
    attach();
};
projectInput();
//# sourceMappingURL=app.js.map