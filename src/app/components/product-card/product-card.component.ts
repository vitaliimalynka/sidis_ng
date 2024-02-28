import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from 'app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() cardData: Product | null = null

  

}
