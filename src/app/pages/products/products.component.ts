import { ChangeDetectionStrategy, Component } from '@angular/core';
import IProduct from 'app/interfaces/product';
import { Product } from 'app/models/product';

const mokeCard: IProduct = {
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 100.95,
  image:  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {  
  public products: Product[] = []

  constructor () {
    this.products.push(mokeCard)
  }

  ngOninit() {

  }

}
