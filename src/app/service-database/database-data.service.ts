import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Dish } from 'src/Dish';

@Injectable({
  providedIn: 'root'
})
export class DatabaseDataService {
  dishesList!: Observable<any>;
  testDishes!: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.dishesList = this.getDishList();
    this.testDishes = this.db.list('dishesList').snapshotChanges();
   }

  getDishList(){
    return this.db.list('dishesList').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        // @ts-ignore
        return new Dish(key, data.name, data.cuisine, data.type, data.category, data.ingredients, data.quantity, data.ordered, data.price, data.description, data.images, data.rating, []);
      })
    }));
  }

  removeDishFromDB(key: string){
    const dishList = this.db.list('dishesList')
    dishList.remove(key);
  }

  addDishToDB(dish: Dish){
    const dishList = this.db.list('dishesList');
    dishList.push(dish);
  }

  changeRatingInDB(key: string, value: number){
    const dishList = this.db.list('dishesList');
    dishList.update(key, {rating: value});
  }
}
