import { Injectable } from "@angular/core";
import { BehaviorSubject, type Observable } from "rxjs";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductservicesService {
  private products: Product[] = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      description: "Zapatillas deportivas para hombre",
      productType: "Bambas - Hombre",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4329d447-d48e-4886-8585-b73355c52cda/NIKE+DUNK+LOW+RETRO.png",
    },
    {
      id: 2,
      name: "Nike Air Force",
      price: 130,
      description: "Zapatillas deportivas para mujer",
      productType: "Bambas - Mujer",
      onSale: false,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/pfuxaajxqlm4plydjcaa/W+AF1+SAGE+LOW.png",
    },
    {
      id: 3,
      name: "Nike Sportswear",
      price: 80,
      description: "Camiseta deportiva para hombre",
      productType: "Ropa - Hombre",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a200f9ed-aefe-4f27-89c0-dc861f23c0e1/W+NIKE+V2K+RUN.png",
    },
    {
      id: 4,
      name: "Nike Sportswear",
      price: 80,
      description: "Camiseta deportiva para hombre",
      productType: "Ropa - Hombre",
      onSale: true,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a200f9ed-aefe-4f27-89c0-dc861f23c0e1/W+NIKE+V2K+RUN.png",
    },
  ];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  private filteredProductsSubject = new BehaviorSubject<Product[]>([])

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
    this.productsSubject.next([...this.products]);
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable()
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.filteredProductsSubject.asObservable()
  }

  addProduct(product: Product): void {
    const existingProductIndex = this.products.findIndex((p) => p.id === product.id)
    if (existingProductIndex !== -1) {
      // Update existing product
      this.products[existingProductIndex] = product
    } else {
      // Add new product
      this.products.push(product)
    }
    this.updateProducts()
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id)
  }

  searchProducts(searchTerm: string): void {
    if (!searchTerm) {
      this.resetSearch()
      return
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase()
    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseSearchTerm) ||
        product.description.toLowerCase().includes(lowercaseSearchTerm) ||
        product.productType.toLowerCase().includes(lowercaseSearchTerm),
    )

    this.filteredProductsSubject.next(filteredProducts)
  }

  resetSearch(): void {
    this.filteredProductsSubject.next([...this.products])
  }

  private updateProducts(): void {
    this.productsSubject.next([...this.products])
    this.filteredProductsSubject.next([...this.products])
  }

  getFirstThreeProducts(): Product[] {
    return this.products.slice(0, 3)
  }
}