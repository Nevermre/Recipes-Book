import { Component } from "@angular/core";

@Component({
  selector:'app-component-spinner',
  template:'<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
  ,
  styleUrls:['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent{

}
