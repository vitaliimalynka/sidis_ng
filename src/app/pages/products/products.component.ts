import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import IProduct from 'app/interfaces/product';
import { Product } from 'app/models/product';
import { DataService } from 'app/services/data-sercive.service';
import { Subject, Subscription, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

const mockCard: IProduct = {
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 100.95,
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  public products: Product[] = []
  public subscription1: Subscription | null = null
  public subscription2: Subscription | null = null
  public filteredProducts: Product[] = []
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> | null = null
  private searchTermStream$ = new Subject<string>()

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {
    // this.products.push(mockCard)
  }

  ngOnInit() {
    this.subscription1 = this.dataService.getProducts().subscribe(data => {
      this.products = data
      this.filteredProducts = this.products
      this.cdr.markForCheck()
    })
    this.subscription2 = this.searchTermStream$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterProducts(searchTerm)
      })
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe()
    this.subscription2?.unsubscribe()
  }

  public onCardSelected(product: Product) {
    console.log(product)
  }

  public searchProducts() {
    if (this.searchInput) {
      const searchTerm = (this.searchInput.nativeElement as HTMLInputElement).value
      this.searchTermStream$.next(searchTerm)
    }
  }

  private filterProducts(searchTerm: string) {
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      this.filteredProducts = this.products
    }
    this.cdr.markForCheck()
  }

}
