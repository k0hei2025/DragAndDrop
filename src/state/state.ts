//namespace App { 
import { projectStatus } from '../variables/AllVariables.js'

       export        class StateManagement {
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
                  export         const projectState = StateManagement.getInstance();
   
//}
