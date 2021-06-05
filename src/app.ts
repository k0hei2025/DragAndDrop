console.log('watch')

const formElements = document.getElementById('project-input')!as HTMLTemplateElement;
const listElements = document.getElementById('app') as HTMLDivElement;



const projectInput=()=>{

               const attach=()=>{
                              listElements.insertAdjacentElement('afterbegin', element)
                }
               
               const importNode = document.importNode(formElements.content , true);
               
               const element = importNode.firstElementChild as HTMLFormElement;
               attach();

             
}

projectInput();