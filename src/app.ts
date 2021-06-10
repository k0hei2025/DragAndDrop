// / <reference path="interface/interfaceContent.ts"/>
// / <reference path="variables/AllVariables.ts" />
// / <reference path="state/state.ts"/>
// / <reference path='Validation/validation.ts'/>
// / <reference path ="component/store.ts" />
// / <reference path="component/submitHandler.ts"/>
// / <reference path="component/projectList.ts"/>

// by es6 Imports
 import {DragTarget , Draggable} from './interface/interfaceContent'
 import {description , divElement , element , formElements , importNode ,listElements ,people ,projectListElements ,projectStatus ,status ,title , typeProject ,validation } from './variables/AllVariables.js'
 import {StateManagement , projectState} from './state/state.js'
 import {validate} from './Validation/validation.js'
 import {ProjectList , attach} from './component/projectList.js'
 import {storeValue} from './component/store.js'


namespace App{
   console.log('watch')

   class Project{
    constructor(
       id : string ,
       title : string ,
       description : any,
       people : number,
       status : status ){
   
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

 const active =    new ProjectList('active');
  const finished  = new ProjectList('finished');
  
   projectInput();
   
   
   
}
