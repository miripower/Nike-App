import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductservicesService } from '../../services/productservices.service';
import { Product } from '../../interfaces/product.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products$: Observable<Product[]>

  constructor(private ProductservicesService: ProductservicesService) {
    this.products$ = this.ProductservicesService.getProducts()
  }

ngOnInit(): void {}
}
