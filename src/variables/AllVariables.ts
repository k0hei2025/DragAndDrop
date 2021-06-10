// namespace App {


  export type status = 'active'|'completed'
   
  export type  projectStatus  = 'active' | 'completed'
   
              export  const formElements = document.getElementById('project-input')!as HTMLTemplateElement;
             export  const listElements = document.getElementById('app') as HTMLDivElement;
             export  const importNode = document.importNode(formElements.content , true);
                              
             export  const element = importNode.firstElementChild as HTMLFormElement;
             export  const title = element.querySelector('.title')! as HTMLInputElement;
              export const description = element.querySelector('.description')! as HTMLInputElement
              export const people =  element.querySelector('.people')! as HTMLInputElement;
               
               
               
               // list elements  variable 
               
             export  const projectListElements = document.getElementById('project-list')! as HTMLTemplateElement ;
             export  const divElement = document.getElementById('app')! as HTMLDivElement
               
               
               // type customs 
               
            export   type typeProject = 'active' | 'finished'
               
           export    type validation = { 
                              value : string | number,
                              required? : boolean,
                              minLength? : number,
                              maxLength? : number,
                              min? : number , 
                              max?: number
               }
                
//}