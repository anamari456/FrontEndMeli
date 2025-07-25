import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  selectedImage: string = '';
  hoveredImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:8080/api/products/${id}`).subscribe({
        next: (data: any) => {
          this.product = data;
          this.selectedImage = data.images?.[0];
        },
        error: () => {
          console.warn('Product not found. Using mock data.');
          this.product = this.getMockProduct();
          this.selectedImage = this.product.images[0];
        }
      });
    }
  }

  changeImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  setHoveredImage(imageUrl: string) {
    this.hoveredImage = imageUrl;
  }

  clearHoveredImage() {
    this.hoveredImage = null;
  }

  getAverageRating(ratings: number[]): number {
  if (!ratings || ratings.length === 0) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  private getMockProduct() {
    return {
      title: 'Producto no encontrado',
      price: 0,
      description: 'Producto no encontrado',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_746233-MLA46114830679_052021-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_971299-MLA46114830712_052021-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_617623-MLA46114830683_052021-F.webp'
      ],
      paymentMethods: ['Tarjeta de crédito', 'Débito', 'MercadoPago'],
      sellerName: 'xx',
      sellerRating: 0.0,
      availableStock: 0
    };
  }
}