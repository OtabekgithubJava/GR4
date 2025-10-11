import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Shop implements OnInit {
  currentStudent: any = null;
  message = '';
  
  particles = Array(25).fill(0).map((_, i) => i + 1);
  
  floatingDots = Array(50).fill(0).map((_, i) => i + 1);

  products: Product[] = [
    {
      id: 1,
      name: "O'quvchilar uchun Kitob",
      price: 3,
      description: "Muvaffaqiyatli o'qish uchun maxsus tanlangan darslik.",
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    },
    {
      id: 2,
      name: 'Maxsus Qalam',
      price: 1,
      description: 'Yozishni yanada qulay qiluvchi maxsus qalam.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    },
    {
      id: 3,
      name: 'Yozuv daftar',
      price: 2,
      description: 'Qimmatbaho eslatmalar uchun mustahkam daftar.',
      image: 'https://images.unsplash.com/photo-1517840901100-8179e20d97c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    },
    {
      id: 4,
      name: 'Kalkulyator',
      price: 4,
      description: 'Matematika uchun qulay va samarali kalkulyator.',
      image: 'https://images.unsplash.com/photo-1587145820134-3d8e7e3983f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    }
  ];

  ngOnInit() {
    const studentData = localStorage.getItem('currentStudent');
    if(studentData){
      this.currentStudent = JSON.parse(studentData);
      if (!this.currentStudent.diamonds) {
        this.currentStudent.diamonds = 0;
      }
    }
  }

  buyProduct(product: Product): void {
    if (this.currentStudent.diamonds >= product.price) {
      this.currentStudent.diamonds -= product.price;
      localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
      this.message = `Siz ${product.name} xarid qildingiz!`;
      
      setTimeout(() => {
        this.message = '';
      }, 4000); 
    } else {
      this.message = 'Do\'kon uchun etarli diamondsingiz yo\'q.';
      
      setTimeout(() => {
        this.message = '';
      }, 4000); 
    }
  }
}