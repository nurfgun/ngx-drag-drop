import { Directive, HostBinding, HostListener } from "@angular/core";
import { DndEvent } from "./dnd-utils";
import { DndDraggableDirective } from "./dnd-draggable.directive";

@Directive( {
  selector: "[dndHandle]"
} )
export class DndHandleDirective {

  @HostBinding( "attr.draggable" )
  draggable = true;

  constructor( private parent:DndDraggableDirective ) {
    parent.draggable = false;
    parent.registerDragHandle( this );
  }

  @HostListener( "dragstart", [ "$event" ] )
  @HostListener( "dragend", [ "$event" ] )
  onDragEvent( event:DndEvent ) {
    if (event.type === 'dragstart') this.parent.draggable = true;
    event._dndUsingHandle = true;
    if (event.type === 'dragend') this.parent.draggable = false;   
  }
}
