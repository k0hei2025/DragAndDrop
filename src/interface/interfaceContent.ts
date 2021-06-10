 //namespace App {

            export   interface Draggable  {

                              dragStartHandler(value : DragEvent) : void
                              dragEndHandler (value : DragEvent ): void
                           }
                  export         interface DragTarget {
                             dropHandler(value : DragEvent ): void;
                             dragLeaveHandler(value  : DragEvent) : void;
                             dragOverHandler(value : DragEvent) :void
                           }
                           
//}
