import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import IProduct from 'app/interfaces/product';
import { Product } from 'app/models/product';
import { DataService } from 'app/services/data-sercive.service';
import { Subscription } from 'rxjs';

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
  public subscription: Subscription | null = null

  constructor (
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    ) { 
    // this.products.push(mokeCard)
  }

  ngOnInit() {
    this.dataService.getProducts().subscribe(data => {
      this.products = data
      this.cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
