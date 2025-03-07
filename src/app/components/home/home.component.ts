import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductservicesService } from '../../services/productservices.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstThreeProducts: Product[] = [];

  constructor(private productService: ProductservicesService) {}

  ngOnInit(): void {
    this.productService.getFirstThreeProducts().subscribe(products => {
      this.firstThreeProducts = products;
    });
  }
}