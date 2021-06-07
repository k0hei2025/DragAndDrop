console.log('watch')

// element.addEventListener('submit',submitHandler)
const formElements = document.getElementById('project-input')!as HTMLTemplateElement;
const listElements = document.getElementById('app') as HTMLDivElement;
const importNode = document.importNode(formElements.content , true);
               
const element = importNode.firstElementChild as HTMLFormElement;
const title = element.querySelector('.title')! as HTMLInputElement;
const description = element.querySelector('.description')! as HTMLTextAreaElement;
const people =  element.querySelector('.people')! as HTMLInputElement;



// list elements  variable 

const projectListElements = document.getElementById('project-list')! as HTMLTemplateElement ;
const divElement = document.getElementById('app')! as HTMLDivElement


// type customs 

type typeProject = 'active' | 'finished'

type validation = { 
               value : string | number,
               required? : boolean,
               minLength? : number,
               maxLength? : number,
               min? : number , 
               max?: number
}


const validate=(validateValue : validation)=>{
   let isValid = true;
  let message : string[] = [];
  
   if (validateValue.required){
                  isValid = isValid && validateValue.value.toString().trim().length!==0
   }
   if(validateValue.minLength!=null && typeof validateValue.value==='string'){
                  isValid = isValid && validateValue.value.length >= validateValue.minLength;
             
   }
   
   message.push('minlength error')
   if (validateValue.maxLength!=null&& typeof validateValue.value === 'string'){
                  isValid = isValid && validateValue.value.length <= validateValue.maxLength;
                  
   }
   message.push('maxLength errr')
   if (validateValue.min !=null && typeof validateValue.value === 'number'){
                  isValid = isValid && validateValue.value >= validateValue.min
               
                 }
                 message.push('min error')
   if (validateValue.max !=null && typeof validateValue.value === 'number'){
                  isValid = isValid && validateValue.value <= validateValue.max
                  
                 }
                 message.push('max error')
       console.log(message)
   return isValid;
   
  }

const attach=()=>{
   listElements.insertAdjacentElement('beforebegin', element)
}

// const projectList=(type : typeProject)=>{

//    let importedNode = document.importNode(projectListElements.content , true );
//    const element = importedNode.firstElementChild as HTMLElement;
//     console.log(element);
//    element.id = `${type}-projects`;
//      attach();
//      console.log(element)
//   let listId ;
//   listId = `${type}-projects-list`;
//     element.querySelector('ul')!.id = listId;
//    element.querySelector('h2')!.textContent =`${listId.toUpperCase()} PROJECTS`
  
// }
       
class ProjectList {
   templateElement: HTMLTemplateElement;
   hostElement: HTMLDivElement;
   element: HTMLElement;
 
   constructor(private type: 'active' | 'finished') {
     this.templateElement = document.getElementById(
       'project-list'
     )! as HTMLTemplateElement;
     this.hostElement = document.getElementById('app')! as HTMLDivElement;
 
     const importedNode = document.importNode(
       this.templateElement.content,
       true
     );
     this.element = importedNode.firstElementChild as HTMLElement;
     this.element.id = `${this.type}-projects`;
     this.attach();
     this.renderContent();
   }
 
   private renderContent() {
     const listId = `${this.type}-projects-list`;
     this.element.querySelector('ul')!.id = listId;
     this.element.querySelector('h2')!.textContent =
       this.type.toUpperCase() + ' PROJECTS';
     
    

   }
 
   private attach() {
      this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
const storeValue=():[string , string , number] | void => {
               const enterTitle = title.value;
                const enterDescription = description.value;
                const enterPeople = people.value;
               
                const titleValidateValue : validation = {
                  value : enterTitle,
                  required :true,
                 
                 
                  
   }
   
   
   const descriptionValidateValue : validation = {
                  value : enterDescription,
                  
                  required :true,
                  
                  minLength : 5,
                  
                  
   }
   
   
   const peopleValidationValue : validation = {
                  value : +enterPeople,
                  
                  required :true,
                  min:1,
                  max:5
                  
   }
                if ( !validate(titleValidateValue) 
                || !validate( descriptionValidateValue) 
                || !validate(peopleValidationValue)  ){
                   console.log(titleValidateValue , descriptionValidateValue , peopleValidationValue)
                   console.log(enterTitle , enterDescription , enterPeople)
                               alert('Invalid input or please try again' );
                                 return;
                              } else {
                                             console.log('submit')
                return [enterTitle , enterDescription , +enterPeople];
             }
             }
             
             

const submitHandler=(event : Event)=>{
            
              
               event.preventDefault();
             
            // console.log(title.value , description.value , people.value)
              const gatherValue = storeValue();
              if (Array.isArray(gatherValue)){
                             const [title , discription , people] = gatherValue
                             console.log(title , discription , people);
              }
}

element.addEventListener('submit',submitHandler)

const projectInput=()=>{

   element.id = 'user-input';
               
               attach();

             
}
const active = new ProjectList('active');
const finished  =new ProjectList('finished');
// projectList('active')
// projectList('finished')
projectInput();



// // Validation
// interface Validatable {
//    value: string | number;
//    required?: boolean;
//    minLength?: number;
//    maxLength?: number;
//    min?: number;
//    max?: number;
//  }
 
//  function validate(validatableInput: Validatable) {
//    let isValid = true;
//    if (validatableInput.required) {
//      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
//    }
//    if (
//      validatableInput.minLength != null &&
//      typeof validatableInput.value === 'string'
//    ) {
//      isValid =
//        isValid && validatableInput.value.length >= validatableInput.minLength;
//    }
//    if (
//      validatableInput.maxLength != null &&
//      typeof validatableInput.value === 'string'
//    ) {
//      isValid =
//        isValid && validatableInput.value.length <= validatableInput.maxLength;
//    }
//    if (
//      validatableInput.min != null &&
//      typeof validatableInput.value === 'number'
//    ) {
//      isValid = isValid && validatableInput.value >= validatableInput.min;
//    }
//    if (
//      validatableInput.max != null &&
//      typeof validatableInput.value === 'number'
//    ) {
//      isValid = isValid && validatableInput.value <= validatableInput.max;
//    }
//    return isValid;
//  }
 
//  // autobind decorator
//  function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//    const originalMethod = descriptor.value;
//    const adjDescriptor: PropertyDescriptor = {
//      configurable: true,
//      get() {
//        const boundFn = originalMethod.bind(this);
//        return boundFn;
//      }
//    };
//    return adjDescriptor;
//  }
 
//  // ProjectList Class
//  class ProjectList {
//    templateElement: HTMLTemplateElement;
//    hostElement: HTMLDivElement;
//    element: HTMLElement;
 
//    constructor(private type: 'active' | 'finished') {
//      this.templateElement = document.getElementById(
//        'project-list'
//      )! as HTMLTemplateElement;
//      this.hostElement = document.getElementById('app')! as HTMLDivElement;
 
//      const importedNode = document.importNode(
//        this.templateElement.content,
//        true
//      );
//      this.element = importedNode.firstElementChild as HTMLElement;
//      this.element.id = `${this.type}-projects`;
//      this.attach();
//      this.renderContent();
//    }
 
//    private renderContent() {
//      const listId = `${this.type}-projects-list`;
//      this.element.querySelector('ul')!.id = listId;
//      this.element.querySelector('h2')!.textContent =
//        this.type.toUpperCase() + ' PROJECTS';
     
//    }
 
//    private attach() {
//      this.hostElement.insertAdjacentElement('beforeend', this.element);
//    }
//  }
 
//  // ProjectInput Class
//  class ProjectInput {
//    templateElement: HTMLTemplateElement;
//    hostElement: HTMLDivElement;
//    element: HTMLFormElement;
//    titleInputElement: HTMLInputElement;
//    descriptionInputElement: HTMLInputElement;
//    peopleInputElement: HTMLInputElement;
 
//    constructor() {
//      this.templateElement = document.getElementById(
//        'project-input'
//      )! as HTMLTemplateElement;
//      this.hostElement = document.getElementById('app')! as HTMLDivElement;
 
//      const importedNode = document.importNode(
//        this.templateElement.content,
//        true
//      );
//      this.element = importedNode.firstElementChild as HTMLFormElement;
//      this.element.id = 'user-input';
 
//      this.titleInputElement = this.element.querySelector(
//        '#title'
//      ) as HTMLInputElement;
//      this.descriptionInputElement = this.element.querySelector(
//        '#description'
//      ) as HTMLInputElement;
//      this.peopleInputElement = this.element.querySelector(
//        '#people'
//      ) as HTMLInputElement;
 
//      this.configure();
//      this.attach();
//    }
 
//    private gatherUserInput(): [string, string, number] | void {
//      const enteredTitle = this.titleInputElement.value;
//      const enteredDescription = this.descriptionInputElement.value;
//      const enteredPeople = this.peopleInputElement.value;
 
//      const titleValidatable: Validatable = {
//        value: enteredTitle,
//        required: true
//      };
//      const descriptionValidatable: Validatable = {
//        value: enteredDescription,
//        required: true,
//        minLength: 5
//      };
//      const peopleValidatable: Validatable = {
//        value: +enteredPeople,
//        required: true,
//        min: 1,
//        max: 5
//      };
 
//      if (
//        !validate(titleValidatable) ||
//        !validate(descriptionValidatable) ||
//        !validate(peopleValidatable)
//      ) {
//        alert('Invalid input, please try again!');
//        return;
//      } else {
//        return [enteredTitle, enteredDescription, +enteredPeople];
//      }
//    }
 
//    private clearInputs() {
//      this.titleInputElement.value = '';
//      this.descriptionInputElement.value = '';
//      this.peopleInputElement.value = '';
//    }
 
//    @autobind
//    private submitHandler(event: Event) {
//      event.preventDefault();
//      const userInput = this.gatherUserInput();
//      if (Array.isArray(userInput)) {
//        const [title, desc, people] = userInput;
//        console.log(title, desc, people);
//        this.clearInputs();
//      }
//    }
 
//    private configure() {
//      this.element.addEventListener('submit', this.submitHandler);
//    }
 
//    private attach() {
//      this.hostElement.insertAdjacentElement('afterbegin', this.element);
//    }
//  }
 
//  const prjInput = new ProjectInput();
//  const activePrjList = new ProjectList('active');
//  const finishedPrjList = new ProjectList('finished');
 