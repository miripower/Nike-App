import { Injectable, signal, WritableSignal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductservicesService {
  private products: WritableSignal<Product[]> = signal([
    {
      id: 1,
      name: "Nike Air Force 1 '07",
      price: 119.99,
      description: "6 colores",
      productType: "Bambas - Hombre",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/AIR+FORCE+1+%2707.png",
    },
    {
      id: 2,
      name: "Nike Air Force 1 Low",
      price: 159.99,
      description: "1 color",
      productType: "Bambas - Mujer",
      onSale: false,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0b58e370-a5d5-4283-b54f-1cbd72d925cf/AIR+FORCE+1+LOW+SP.png",
    },
    {
      id: 3,
      name: "Nike Sportswear Club Fleece",
      price: 59.99,
      description: "5 colores",
      productType: "Ropa - Hombre",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/684aca16-6b8d-40b8-b203-6e77088d353f/M+NSW+CLUB+CRW+BB.png",
    },
    {
      id: 4,
      name: "Nike Sportswear Tech Fleece Windrunner",
      price: 119.99,
      description: "4 colores",
      productType: "Ropa - Mujer",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d4847995-4174-47e6-9535-26694b30c482/W+NSW+TCH+FLC+WR+FZ+HDY+2.png",
    },
  ]);

  deleteProduct(id: number): void {
    this.products.set(this.products().filter((p) => p.id !== id));
  }

  getProducts(): Observable<Product[]> {
    return of([...this.products()]);
  }

  addProduct(product: Product): void {
    this.products.set([
      ...this.products().filter(p => p.id !== product.id), 
      product
    ]);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  getFirstThreeProducts(): Observable<Product[]> {
    return of([...this.products().slice(0, 3)]);
  }
}
