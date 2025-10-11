import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class Shop implements OnInit, OnDestroy {
  currentStudent: any = null;
  message = '';
  isDarkMode: boolean = false;
  private themeSubscription: any;
  
  floatingItems = Array(15).fill(0).map((_, i) => i + 1);

  products: Product[] = [
    { 
      id: 1, 
      name: "O'quvchilar Kitobi", 
      price: 3, 
      description: "O'qish samaradorligini oshiruvchi maxsus darslik", 
      image: 'assets/images/products/book.jpg' 
    },
    { 
      id: 2, 
      name: "Maxsus Qalam", 
      price: 1, 
      description: "Yozishni qulay qiluvchi rangli qalam", 
      image: 'assets/images/products/pen.jpg' 
    },
    { 
      id: 3, 
      name: "Yozuv Daftar", 
      price: 2, 
      description: "Mustahkam va go'zal eslatmalar daftari", 
      image: 'assets/images/products/notebook.jpg' 
    },
    { 
      id: 4, 
      name: "Kalkulyator", 
      price: 4, 
      description: "Matematika uchun qulay va samarali", 
      image: 'assets/images/products/calculator.jpg' 
    },
    { 
      id: 5, 
      name: "Rangli Markerlar", 
      price: 2, 
      description: "Chiroyli va rangli yozuvlar uchun", 
      image: 'assets/images/products/markers.jpg' 
    },
    { 
      id: 6, 
      name: "Stol Lampasi", 
      price: 5, 
      description: "O'qish paytida ko'zni charchatmaydigan", 
      image: 'assets/images/products/lamp.jpg' 
    }
  ];

  private fallbackImages: { [key: string]: string } = {
    'book': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=150&fit=crop',
    'pen': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=150&fit=crop',
    'notebook': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=150&fit=crop',
    'calculator': 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=300&h=150&fit=crop',
    'markers': 'https://officemax.uz/media/uploads/2_1qhUjic.jpg',
    'lamp': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=150&fit=crop'
  };

  ngOnInit() {
    this.loadStudentData();
    this.setupTheme();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private loadStudentData() {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      this.currentStudent = JSON.parse(studentData);
      if (this.currentStudent.diamonds !== undefined) {
        this.currentStudent.aqcha = this.currentStudent.diamonds;
        delete this.currentStudent.diamonds;
        localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
      }
      if (!this.currentStudent.aqcha) {
        this.currentStudent.aqcha = 0;
      }
    }
  }

  private setupTheme() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    
    this.themeSubscription = setInterval(() => {
      const newTheme = localStorage.getItem('theme') === 'dark';
      if (newTheme !== this.isDarkMode) {
        this.isDarkMode = newTheme;
      }
    }, 1000);
  }

  handleImageError(event: any, product: Product) {
    const productType = this.getProductType(product.name);
    event.target.src = this.fallbackImages[productType] || this.fallbackImages['book'];
  }

  private getProductType(productName: string): string {
    const name = productName.toLowerCase();
    if (name.includes('kitob') || name.includes('book')) return 'book';
    if (name.includes('qalam') || name.includes('pen')) return 'pen';
    if (name.includes('daftar') || name.includes('notebook')) return 'notebook';
    if (name.includes('kalkulyator') || name.includes('calculator')) return 'calculator';
    if (name.includes('marker') || name.includes('markers')) return 'markers';
    if (name.includes('lampa') || name.includes('lamp')) return 'lamp';
    return 'book';
  }

  buyProduct(product: Product): void {
    if (this.currentStudent.aqcha >= product.price) {
      this.currentStudent.aqcha -= product.price;
      localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
      
      this.message = `Tabriklaymiz! ${product.name} xarid qildingiz!`;
      
      setTimeout(() => {
        this.message = '';
      }, 3000);
      
    } else {
      this.message = `Aqcha yetarli emas. Sizda ${this.currentStudent.aqcha} AQCHA bor, kerak ${product.price} AQCHA`;
      
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}