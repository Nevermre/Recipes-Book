import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub : Subscription;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost :PlaceholderDirective
  constructor(private authService:AuthService,
    private router:Router,
    private componentFactoryResolver:ComponentFactoryResolver){}
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit(form: NgForm){
    this.isLoading = true
    if(!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData>

    if(!this.isLoginMode){
      authObs = this.authService.signup(email,password)

    }
    else{
      authObs = this.authService.login(email,password)

    }
    authObs.subscribe(responseData =>{
      console.log(responseData)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    },
    errorMessage =>{
      this.error=errorMessage

      this.showErrorAlert(errorMessage)
      this.isLoading = false
    })
    form.reset()
  }
  onHandleError(){
    this.error = null
  }

  private showErrorAlert(message:string){
    //const alertComponent = new AlertComponent()
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear()
    const componentRef = hostViewContainer.createComponent(alertCmpFactory)
    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe()
      hostViewContainer.clear()
    })
  }
  ngOnDestroy(): void {
    if(this.closeSub)
      this.closeSub.unsubscribe()
  }
}
