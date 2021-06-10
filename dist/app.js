import { element } from './variables/AllVariables.js';
import { projectState } from './state/state.js';
import { ProjectList, attach } from './component/projectList.js';
import { storeValue } from './component/store.js';
var App;
(function (App) {
    console.log('watch');
    class Project {
        constructor(id, title, description, people, status) {
        }
    }
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
})(App || (App = {}));
//# sourceMappingURL=app.js.map