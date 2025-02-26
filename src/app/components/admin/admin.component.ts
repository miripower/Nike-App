import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductservicesService } from '../../services/productservices.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productForm: FormGroup
  isUpdateMode = false

  constructor(
    private fb: FormBuilder,
    private ProductservicesService: ProductservicesService,
  ) {
    this.productForm = this.fb.group({
      id: ["", [Validators.required, Validators.min(1)]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: ["", [Validators.required, Validators.min(0)]],
      description: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      productType: ["", Validators.required],
      onSale: [false],
      image: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.productForm.get("id")?.valueChanges.subscribe((id) => {
      if (id) {
        this.loadProduct(id)
      }
    })
  }

  loadProduct(id: number): void {
    const product = this.ProductservicesService.getProductById(id)
    if (product) {
      this.productForm.patchValue(product)
      this.isUpdateMode = true
    } else {
      this.resetForm()
    }
  }

  resetForm(): void {
    this.productForm.reset({
      id: this.productForm.get("id")?.value,
      onSale: false,
    })
    this.isUpdateMode = false
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value
      this.ProductservicesService.addProduct(product)
      this.resetForm()
    }
  }

  deleteProduct(): void {
    const id = this.productForm.get("id")?.value
    this.ProductservicesService.deleteProduct(id)
    this.resetForm()
  }
}