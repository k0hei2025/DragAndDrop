console.log('watch')

type status = 'active'|'completed'

type  projectStatus  = 'active' | 'completed'

interface Draggable  {

   dragStartHandler(value : DragEvent) : void
   dragEndHandler (value : DragEvent ): void
}
interface DragTarget {
  dropHandler(value : DragEvent ): void;
  dragLeaveHandler(value  : DragEvent) : void;
  dragOverHandler(value : DragEvent) :void
}

class Project{
 constructor(
    id : string ,
    title : string ,
    description : any,
    people : number,
    status : status ){

 }
}

class StateManagement {
   checkStatus : projectStatus = 'active';
   private pushInput : any[] = [];
   private getList : any[] = [];
   private static instance : StateManagement;
      

   static getInstance(){
      if (this.instance){
         return this.instance
      }
      this.instance = new StateManagement();
      return this.instance;
   }


  
  public addInput=(title : string , description : string , people : number, status : projectStatus) =>{
 

   let dataPacket : {
      id : string,
      title : string , 
      description : string,
      people : number
      status : projectStatus
   } = {
      id : Math.random().toString(),
      title : title,
      description : description,
      people : people,
      status : status
   }

   this.checkStatus = status

        this.pushInput.push(dataPacket)
        console.log(...this.pushInput)
      }


    public  getListOfProject(){
       return  [...this.pushInput]
      }
}

const projectState = StateManagement.getInstance();




// element.addEventListener('submit',submitHandler)
const formElements = document.getElementById('project-input')!as HTMLTemplateElement;
const listElements = document.getElementById('app') as HTMLDivElement;
const importNode = document.importNode(formElements.content , true);
               
const element = importNode.firstElementChild as HTMLFormElement;
const title = element.querySelector('.title')! as HTMLInputElement;
const description = element.querySelector('.description')! as HTMLInputElement
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

class ProjectList implements Draggable , DragTarget {
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
     this.configure();
   } 
     
   dragStartHandler(event : DragEvent){
      console.log(event)
   }
             
    dragEndHandler(_ : DragEvent){
      console.log('Drag End');
    }
    
    

    dragOverHandler(_ : DragEvent){
      let re =  this.element;
      console.log(re);
          const listEl = this.element.querySelector('ul')! as HTMLUListElement;
      console.log(listEl);
      listEl.classList.add('droppable')
     console.log(listEl)
    }

     dragLeaveHandler(_ : DragEvent){
      // const listEl = this.element.querySelector('ul')!;
      // listEl.classList.remove('droppable');
     }

  
     dropHandler(_ : DragEvent){}

    configure(){
       this.element.addEventListener('dragstart' , this.dragStartHandler);
       this.element.addEventListener('dragend' , this.dragEndHandler);
       this.element.addEventListener('dragover',this.dragOverHandler);
       this.element.addEventListener('dragleave',this.dragLeaveHandler);
       this.element.addEventListener('drop',this.dropHandler);
       
    }

   private renderContent() {
     const listId = `${this.type}-projects-list`;
     this.element.querySelector('ul')!.id = listId;
     this.element.querySelector('h2')!.textContent =
       this.type.toUpperCase() + ' PROJECTS';
     
    

   }
   renderInput(){
      
      const projects = projectState.getListOfProject();
      let listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement

      
      projects.filter(statusName=>{
       
         if (projectState.checkStatus === 'active'){
             
            console.log(projectState.checkStatus)


             listEl = document.getElementById(`${projectState.checkStatus}-projects-list`)! as HTMLUListElement
     
              listEl.innerHTML = '';
          
            
            

            for (let list of projects ){
               let li = document.createElement('li')!
               li.draggable=true;
               let heading = document.createElement('h2')!;
               heading.style.color = '#ff0062'
               let people = document.createElement('p')!;
               people.style.color = 'grey' 

               let description = document.createElement('b')!
               description.style.fontWeight = '900px'
              
               if (list){
                  li.value = list.id;
                  
                  heading.textContent = list.title;
                  people.textContent = `${list.people} person assigned `;
                 
                  description.textContent = list.description 
                   li.appendChild(heading);
                  
                   li.appendChild(description);
                   li.appendChild(people);

                   listEl.appendChild(li);
                   console.log(people.textContent)
                  }
         }
       } 
       console.log('runnnig')
      })
     
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
                    projectState.addInput(title , discription , people , 'active')       
                    
                    
                    active.renderInput();
                    finished.renderInput();
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


