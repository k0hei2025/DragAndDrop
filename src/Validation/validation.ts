//namespace App {
       import { validation } from '../variables/AllVariables.js'        
                       export  const validate=(validateValue : validation)=>{
   
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
              // }                          
