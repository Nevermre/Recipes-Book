import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false
  private userSub: Subscription

  constructor(private dataStorageService:DataStorageService,
    private authService: AuthService){}
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated= !!user
    })
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  onLogout(){
    this.authService.logout()
  }

}
