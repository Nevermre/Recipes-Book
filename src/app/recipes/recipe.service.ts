import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()
     private recipes : Recipe[] =[] //[
    //     new Recipe('Teste',
    //      'Receita de teste',
    //      'https://vovopalmirinha.com.br/wp-content/uploads/2019/06/pao-de-queijo.jpg',
    //      [
    //         new Ingredient("teste",2),
    //         new Ingredient("teste2",3)
    //      ])
    //   ,
    //   new Recipe('Outro Teste',
    //    'Receita de teste',
    //    'https://vovopalmirinha.com.br/wp-content/uploads/2019/06/pao-de-queijo.jpg',
    //    [
    //         new Ingredient("teste",2),
    //         new Ingredient("teste2",3)
    //     ])

    //   ];

    constructor(private slSercice:  ShoppingListService){}
    getRecipes(){
        return this.recipes.slice();
    }
    setRecipes(recipes:Recipe[]){
      this.recipes = recipes
      this.recipesChanged.next(this.recipes.slice())
    }
    addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slSercice.addIngredients(ingredients)
    }
    getRecipe(index:number){
        return this.recipes.slice()[index];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())

    }
    updateRecipe(index:number, newRecipe:Recipe ){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())

    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())

    }
}
