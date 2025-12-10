import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  xpBonus?: number;
  streakBonus?: number;
}

interface Category {
  id: string;
  name: string;
}

interface Toast {
  type: 'success' | 'error';
  message: string;
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
  products: Product[] = [];
  categories: Category[] = [];
  toasts: Toast[] = [];
  purchaseHistory: number[] = [];
  isDarkMode = true;

  ngOnInit() {
    this.initializeData();
    this.loadStudentData();
    this.updateCategories();
  }

  private initializeData() {
    this.products = [
      { id: 1, name: "Essentials Kitoblar", price: 10, description: "Eng kerakli so‘zlar to‘plami (1-4)", image: 'https://www.ieltsbid.in/wp-content/uploads/2020/05/4000essential-english-words.jpg', category: 'books', rarity: 'rare', xpBonus: 1110 },
      { id: 2, name: "The 10X Rule", price: 15, description: "Dunyo qarashni kengaytiruvchi kitob", image: 'https://avatars.mds.yandex.net/i?id=69f3a31fcc45c04ee2ebaa60af50ca736bd1cbf4-4518919-images-thumbs&n=13', category: 'books', rarity: 'epic', xpBonus: 1665 },
      { id: 3, name: "Launch Kitobi", price: 15, description: "Biznesga qiziquvchilar uchun", image: 'https://m.media-amazon.com/images/I/41VbkFTsocL._SL10_UR1600,800_CR200,50,1200,630_CLa%7C1200,630%7C41VbkFTsocL.jpg%7C0,0,1200,630+82,82,465,465_PJAdblSocialShare-Gradientoverlay-largeasin-0to70,TopLeft,0,0_PJAdblSocialShare-AudibleLogo-Large,TopLeft,600,270_OU01_ZBLISTENING%20ON,617,216,52,500,AudibleSansMd,30,255,255,255.jpg', category: 'books', rarity: 'epic', xpBonus: 1665 },

      
      { id: 4, name: "Bo'yoqlar to'plami", price: 2, description: "Maxsus belgilash uchun qulay", image: 'https://t3.ftcdn.net/jpg/04/44/67/92/360_F_444679211_LXlT3DyAcPnj73B1Te8nPkFh3M8ZSZp0.jpg', category: 'stationery', rarity: 'common', xpBonus: 222 },
      { id: 5, name: "Flashkartalar", price: 3, description: "Tez yodlash uchun ideal", image: 'https://clipart-library.com/8300/2368/color-paper-clipart-xl.png', category: 'stationery', rarity: 'common', xpBonus: 333 },
      { id: 6, name: "Maxsus 20ta Daftar", price: 20, description: "1 yillik maktab o'quv yili uchun ideal", image: 'https://i.pinimg.com/originals/b8/09/a0/b809a0e86a63c6a14103aae58f027921.jpg', category: 'stationery', rarity: 'rare', xpBonus: 2220 },
      { id: 7, name: "100 ta Ruchkalar", price: 10, description: "Yillab yetadigan ruchkalar to'plami", image: 'https://i.pinimg.com/originals/b2/ab/59/b2ab59c0eb3572f140e0738dc483c963.jpg', category: 'stationery', rarity: 'rare', xpBonus: 1110 },
    

      { id: 8, name: "Telefon Holder", price: 15, description: "Telefonni qulay ushlab turadi", image: 'https://avatars.mds.yandex.net/i?id=8c121610007e8c62a09aa7247aa96846afad80ce-5569949-images-thumbs&n=13', category: 'devices', rarity: 'common', xpBonus: 1665 },
      { id: 9, name: "Noutbuk Holder", price: 25, description: "Noutbuk uchun ergonomik tayanch", image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/5a6f1615-1589-48f2-a884-6bc1cde804ae.__CR0,0,1464,600_PT0_SX1464_V1___.jpg', category: 'devices', rarity: 'rare', xpBonus: 2775 },
      { id: 10, name: "Aqlli Lampa", price: 15, description: "O‘qish uchun maxsus yoritgich", image: 'assets/images/products/smartlamp.jpg', category: 'devices', rarity: 'epic', xpBonus: 1665 },
      { id: 11, name: "Telefon G'ilofi", price: 7, description: "Telefonni himoyalovchi Apple dizaynidagi g'ilof", image: 'https://avatars.mds.yandex.net/i?id=c0d33515a8bc7bba76049d3f8076ae0edbd3ba2d-4387831-images-thumbs&n=13', category: 'devices', rarity: 'common', xpBonus: 777 },
      { id: 12, name: "Premium USB", price: 8, description: "Tezkor va ishonchli xotira", image: 'https://avatars.mds.yandex.net/i?id=c0c285c96b526c82dffc7d4191b18ab6c475ef63-10330973-images-thumbs&n=13', category: 'devices', rarity: 'rare', xpBonus: 888 },
      { id: 13, name: "67W Zaryadlovchi", price: 9, description: "Juda tez quvvat beruvchi model", image: 'https://trendcase.ru/wa-data/public/site/photo/native-union-int-gan-charger-67-1.jpg', category: 'devices', rarity: 'epic', xpBonus: 999 },


      { id: 114, name: "Mr Otabek O'qish Rejasi", price: 50, description: "Yaxshiroq natijaga chiqish uchun kerak bo'ladigan o'qish tizimi", image: 'https://cdn.freelance.ru/images/att/5448962_900_600.png', category: 'premium', rarity: 'legendary', xpBonus: 5550 },
      { id: 115, name: "Najot Ta'lim Kursi", price: 30, description: "Najot Ta'lim kursidan to'plangan materiallar", image: 'https://cdn-edge.kwork.ru/files/portfolio/t3/82/9805a909d8472b79b39dc27996f03711e4c4ab61-1720559637.jpg', category: 'premium', rarity: 'legendary', xpBonus: 3330 },
      { id: 116, name: "Premium DLS Akkaunt", price: 15, description: "Reklamalarsiz, 2019-yil ochilgan legendarniy accounti (1 oy)", image: 'https://i.pinimg.com/originals/c4/35/dd/c435dda326e97ab8295da161ffc9c067.jpg', category: 'premium', rarity: 'legendary', xpBonus: 1665 },
    ];
  }

  private loadStudentData() {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      this.currentStudent = JSON.parse(studentData);
      if (this.currentStudent.diamonds !== undefined) {
        this.currentStudent.aqcha = this.currentStudent.diamonds;
        delete this.currentStudent.diamonds;
      }
      this.currentStudent.aqcha = this.currentStudent.aqcha || 0;
      this.currentStudent.xp = this.currentStudent.xp || 0;
      this.currentStudent.streak = this.currentStudent.streak || 0;
      this.currentStudent.purchases = this.currentStudent.purchases || [];
      this.currentStudent.totalSpent = this.currentStudent.totalSpent || 0;
      this.purchaseHistory = this.currentStudent.purchases;
      localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    } else {
      this.currentStudent = {
        name: 'Student',
        image: 'assets/default-avatar.jpg',
        aqcha: 0,
        xp: 0,
        purchases: [],
        totalSpent: 0
      };
    }
  }

  private updateCategories() {
    this.categories = [
      { id: 'books', name: 'Kitoblar' },
      { id: 'stationery', name: 'O\'quv qurollari' },
      { id: 'devices', name: 'Qurilmalar' },
      { id: 'premium', name: 'Premium' },
      { id: 'art', name: 'Hali davomi bor...' },
    ];
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => p.category === categoryId);
  }

  canAfford(product: Product): boolean {
    return this.currentStudent.aqcha >= product.price;
  }

  getLevel(): number {
    return Math.floor((this.currentStudent.xp || 0) / 100) + 1;
  }

  getRarityText(rarity: string): string {
    const map: { [key: string]: string } = {
      common: 'Common',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
      mythic: 'Mythic'
    };
    return map[rarity] || rarity;
  }

  buyProduct(product: Product) {
    if (!this.canAfford(product)) {
      this.showToast('error', `You have ${this.currentStudent.aqcha} AQCHA, need ${product.price} AQCHA`);
      return;
    }
    this.currentStudent.aqcha -= product.price;
    this.currentStudent.purchases.push(product.id);
    this.currentStudent.totalSpent += product.price;
    if (product.xpBonus) this.currentStudent.xp += product.xpBonus;
    if (product.streakBonus) this.currentStudent.streak += product.streakBonus;

    localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    this.showToast('success', `${product.name} purchased successfully!`);
    this.purchaseHistory = this.currentStudent.purchases;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  showToast(type: 'success' | 'error', message: string) {
    this.toasts = [{ type, message }];
    setTimeout(() => this.toasts = [], 3000);
  }

  handleImageError(event: Event, product: Product) {
    const img = event.target as HTMLImageElement;
    const fallbacks: Record<string, string> = {
      algebra: 'https://images.unsplash.com/photo-1509228628319-2c7d2c2a5c9f?w=300&h=200&fit=crop',
      history: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop',
      vocab: 'https://images.unsplash.com/photo-1456513074519-7d56872e2b3c?w=300&h=200&fit=crop',
      physics: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      writing: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      biology: 'https://images.unsplash.com/photo-1576086213369-98d0e4a4e160?w=300&h=200&fit=crop',
      sat: 'https://images.unsplash.com/photo-1581092580491-0d92d2d3b9a6?w=300&h=200&fit=crop',

      gelpen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop',
      notebook: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
      highlighter: 'https://images.unsplash.com/photo-1626464910042-923dc837e4b9?w=300&h=200&fit=crop',
      mechanical: 'https://images.unsplash.com/photo-1581092160565-9e5e9c6b6b7a?w=300&h=200&fit=crop',
      stickynotes: 'https://images.unsplash.com/photo-1592492152545-56c90d4d4a8a?w=300&h=200&fit=crop',
      whiteboard: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=300&h=200&fit=crop',
      indexcards: 'https://images.unsplash.com/photo-1592496436124-9d67f8f8d8c2?w=300&h=200&fit=crop',

      calculator: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=300&h=200&fit=crop',
      mouse: 'https://images.unsplash.com/photo-1581093588401-9e8e6d9564c6?w=300&h=200&fit=crop',
      hub: 'https://images.unsplash.com/photo-1581093458797-9d7e8f9a0b1c?w=300&h=200&fit=crop',
      powerbank: 'https://images.unsplash.com/photo-1581092162387-8f7e9f0a1b2c?w=300&h=200&fit=crop',
      webcam: 'https://images.unsplash.com/photo-1581093458401-9e8e6d9564c6?w=300&h=200&fit=crop',
      stand: 'https://images.unsplash.com/photo-1581092920865-9e7f8g9h0i1j?w=300&h=200&fit=crop',
      headphones: 'https://images.unsplash.com/photo-1505740420928-7e6e5f7d6c5b?w=300&h=200&fit=crop',

      lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
      planner: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
      bottle: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
      cushion: 'https://images.unsplash.com/photo-1592492152545-56c90d4d4a8a?w=300&h=200&fit=crop',
      rocketbook: 'https://images.unsplash.com/photo-1581093588401-9e8e6d9564c6?w=300&h=200&fit=crop',
      metalpen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop',
      plant: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&h=200&fit=crop',

      paint: 'https://images.unsplash.com/photo-1579783902614-a3a0a846302a?w=300&h=200&fit=crop',
      pencils: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop',
      canvas: 'https://images.unsplash.com/photo-1544966246-845f2d3e3a9d?w=300&h=200&fit=crop',
      brushes: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=300&h=200&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1581092160565-9e5e9c6b6b7a?w=300&h=200&fit=crop',
      charcoal: 'https://images.unsplash.com/photo-1581092920865-9e7f8g9h0i1j?w=300&h=200&fit=crop',
      pastel: 'https://images.unsplash.com/photo-1579783902614-a3a0a846302a?w=300&h=200&fit=crop',

      puzzle: 'https://images.unsplash.com/photo-1587653915930-4e67b2c23f5c?w=300&h=200&fit=crop',
      logic: 'https://images.unsplash.com/photo-1581093458797-9d7e8f9a0b1c?w=300&h=200&fit=crop',
      rubik: 'https://images.unsplash.com/photo-1581092162387-8f7e9f0a1b2c?w=300&h=200&fit=crop',
      chess: 'https://images.unsplash.com/photo-1581093588401-9e8e6d9564c6?w=300&h=200&fit=crop',
      memory: 'https://images.unsplash.com/photo-1592492152545-56c90d4d4a8a?w=300&h=200&fit=crop',
      sudoku: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
      tangram: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=300&h=200&fit=crop',

      default: 'https://images.unsplash.com/photo-1497633765639-fbc5b79b2b2a?w=300&h=200&fit=crop'
    };

    const name = product.name.toLowerCase();
    let key = 'default';
    for (const [k, _] of Object.entries(fallbacks)) {
      if (name.includes(k)) { key = k; break; }
    }
    img.src = fallbacks[key];
  }
}