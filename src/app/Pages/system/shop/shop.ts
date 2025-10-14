import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  limited?: boolean;
  onSale?: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  xpBonus?: number;
  streakBonus?: number;
  aqchaBonus?: number;
  originalPrice?: number;
  usageCount?: number;
  rating?: number;
  reviewCount?: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  reward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration: number;
}

interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  expiresAt: Date;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface SortOption {
  id: 'name' | 'price' | 'rarity';
  name: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shop implements OnInit, OnDestroy {
  // Data
  currentStudent: any = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  achievements: Achievement[] = [];
  toasts: Toast[] = [];
  cartItems: Product[] = [];
  specialOffers: SpecialOffer[] = [];
  purchaseHistory: number[] = [];

  // UI State
  isDarkMode = false;
  cartOpen = false;
  quickViewProduct: Product | null = null;
  showAchievementPopup = false;
  unlockedAchievement: Achievement | null = null;
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: 'name' | 'price' | 'rarity' = 'name';
  searchQuery = '';
  activeCategory = 'all';
  mobileMenuOpen = false;
  isMobile = window.innerWidth <= 768;

  // Derived UI Data
  categories: Category[] = [];
  sorts: SortOption[] = [
    { id: 'name', name: 'Alfabet' },
    { id: 'price', name: 'Narx' },
    { id: 'rarity', name: 'Nodirlik' }
  ];

  recentlyPurchased: number | null = null;

  private observer: MutationObserver | null = null;
  private toastId = 0;

  ngOnInit() {
    this.initializeData();
    this.setupThemeObserver();
    this.loadStudentData();
    this.updateCategories();
    this.detectMobile();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  @HostListener('window:resize')
  onResize() {
    this.detectMobile();
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.closeCart();
    this.closeQuickView();
    this.closeAchievementPopup();
    this.mobileMenuOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      this.focusSearch();
    }
  }

  private detectMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private initializeData() {
    this.products = this.generateProducts();
    this.achievements = this.generateAchievements();
    this.specialOffers = this.generateSpecialOffers();
    this.filteredProducts = [...this.products];
  }

  private generateProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Premium O'quvchilar Kitobi",
        price: 15,
        description: "O'qish samaradorligini 200% oshiruvchi maxsus darslik",
        image: 'assets/images/products/book.jpg',
        category: 'books',
        featured: true,
        rarity: 'epic',
        xpBonus: 100,
        usageCount: 254,
        rating: 4.8,
        reviewCount: 89
      },
      {
        id: 2,
        name: "Maxsus Qalam Seti",
        price: 8,
        description: "Yozishni qulay qiluvchi 12 rangli qalamlar",
        image: 'assets/images/products/pen.jpg',
        category: 'tools',
        popular: true,
        rarity: 'rare',
        streakBonus: 1,
        usageCount: 187,
        rating: 4.6,
        reviewCount: 45
      },
      {
        id: 3,
        name: "Premium Yozuv Daftari",
        price: 12,
        description: "Mustahkam va go'zal eslatmalar daftari",
        image: 'assets/images/products/notebook.jpg',
        category: 'tools',
        new: true,
        rarity: 'rare',
        aqchaBonus: 5,
        originalPrice: 15,
        usageCount: 142,
        rating: 4.7,
        reviewCount: 32
      },
      {
        id: 4,
        name: "Ilmiy Kalkulyator",
        price: 25,
        description: "Ilmiy hisob-kitoblar uchun maxsus kalkulyator",
        image: 'assets/images/products/calculator.jpg',
        category: 'tools',
        rarity: 'epic',
        xpBonus: 50,
        usageCount: 98,
        rating: 4.9,
        reviewCount: 67
      },
      {
        id: 5,
        name: "Rangli Markerlar Seti",
        price: 6,
        description: "24 ta rangli markerlar to'plami",
        image: 'assets/images/products/markers.jpg',
        category: 'tools',
        onSale: true,
        rarity: 'common',
        originalPrice: 8,
        usageCount: 203,
        rating: 4.5,
        reviewCount: 28
      },
      {
        id: 6,
        name: "Smart Stol Lampasi",
        price: 35,
        description: "Aqlli sensorli stol lampasi",
        image: 'assets/images/products/lamp.jpg',
        category: 'premium',
        featured: true,
        rarity: 'legendary',
        xpBonus: 150,
        streakBonus: 2,
        usageCount: 76,
        rating: 4.9,
        reviewCount: 54
      }
    ];
  }

  private generateAchievements(): Achievement[] {
    return [
      {
        id: 1,
        title: "Birinchi Xarid",
        description: "Birinchi marta mahsulot xarid qilish",
        reward: 50,
        unlocked: false
      },
      {
        id: 2,
        title: "Kolleksioner",
        description: "5 ta turli mahsulot xarid qilish",
        reward: 100,
        unlocked: false
      },
      {
        id: 3,
        title: "Premium O'quvchi",
        description: "Premium mahsulot xarid qilish",
        reward: 150,
        unlocked: false
      }
    ];
  }

  private generateSpecialOffers(): SpecialOffer[] {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return [
      {
        id: 1,
        title: "Boshlang'ich Set",
        description: "Barcha boshlang'ich asboblar",
        oldPrice: 45,
        newPrice: 32,
        expiresAt: tomorrow
      }
    ];
  }

  private setupThemeObserver() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.observer = new MutationObserver(() => {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
    });
    this.observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
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
      this.currentStudent.dailyEarnings = this.currentStudent.dailyEarnings || 0;
      
      this.purchaseHistory = this.currentStudent.purchases;
      
      localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    }
  }

  private updateCategories() {
    this.categories = [
      { id: 'all', name: 'Barchasi', count: this.products.length },
      { id: 'books', name: 'Kitoblar', count: this.getCategoryCount('books') },
      { id: 'tools', name: 'Asboblar', count: this.getCategoryCount('tools') },
      { id: 'premium', name: 'Premium', count: this.getCategoryCount('premium') }
    ];
  }

  getFilteredProducts(): Product[] {
    let filtered = this.products;

    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.activeCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rarity':
          const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3, mythic: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        default:
          return 0;
      }
    });

    return filtered;
  }

  setCategory(id: string) {
    this.activeCategory = id;
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  closeCart() {
    this.cartOpen = false;
  }

  closeCartIfOverlay(event: Event) {
    if ((event.target as HTMLElement).classList.contains('cart-modal')) {
      this.closeCart();
    }
  }

  buyProduct(product: Product) {
    if (!this.canAfford(product)) {
      this.showToast('error', 'Aqcha yetarli emas', 
        `Sizda ${this.currentStudent.aqcha} AQCHA bor, kerak ${product.price} AQCHA`);
      return;
    }

    this.currentStudent.aqcha -= product.price;
    this.currentStudent.purchases.push(product.id);
    this.currentStudent.totalSpent += product.price;
    
    if (product.xpBonus) {
      this.currentStudent.xp += product.xpBonus;
    }
    if (product.streakBonus) {
      this.currentStudent.streak += product.streakBonus;
    }

    this.recentlyPurchased = product.id;
    this.purchaseHistory.push(product.id);

    localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    
    this.showToast('success', 'Muvaffaqiyatli xarid!', 
      `${product.name} muvaffaqiyatli sotib olindi!`);
    
    this.checkAchievements();
    
    setTimeout(() => {
      this.recentlyPurchased = null;
    }, 600);
  }

  canAfford(product: Product): boolean {
    return this.currentStudent?.aqcha >= product.price;
  }

  handleImageError(event: Event, product: Product) {
    const imgElement = event.target as HTMLImageElement;
    const fallbackImages: { [key: string]: string } = {
      book: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop',
      pen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop',
      notebook: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
      calculator: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=300&h=200&fit=crop',
      markers: 'https://images.unsplash.com/photo-1626464910042-923dc837e4b9?w=300&h=200&fit=crop',
      lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop'
    };

    const name = product.name.toLowerCase();
    const type = Object.keys(fallbackImages).find(k => name.includes(k)) || 'book';
    imgElement.src = fallbackImages[type];
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.showToast('success', 'Savatga qo\'shildi', 
      `${product.name} savatga muvaffaqiyatli qo'shildi`);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    const total = this.getCartTotal();
    
    if (this.currentStudent.aqcha < total) {
      this.showToast('error', 'Aqcha yetarli emas', 
        `Savatdagi mahsulotlar uchun ${total} AQCHA kerak`);
      return;
    }

    this.currentStudent.aqcha -= total;
    this.cartItems.forEach(item => {
      this.currentStudent.purchases.push(item.id);
      this.currentStudent.totalSpent += item.price;
    });

    localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    
    this.showToast('success', 'Xarid muvaffaqiyatli!', 
      `Siz ${this.cartItems.length} ta mahsulot sotib oldingiz`);
    
    this.cartItems = [];
    this.closeCart();
    this.checkAchievements();
  }

  checkAchievements() {
    this.achievements.forEach(achievement => {
      if (!achievement.unlocked && this.isAchievementUnlocked(achievement)) {
        this.unlockAchievement(achievement);
      }
    });
  }

  isAchievementUnlocked(achievement: Achievement): boolean {
    switch (achievement.id) {
      case 1:
        return this.purchaseHistory.length >= 1;
      case 2:
        const uniqueProducts = new Set(this.purchaseHistory).size;
        return uniqueProducts >= 5;
      case 3:
        return this.purchaseHistory.some(purchaseId => {
          const product = this.products.find(p => p.id === purchaseId);
          return product?.category === 'premium';
        });
      default:
        return false;
    }
  }

  unlockAchievement(achievement: Achievement) {
    achievement.unlocked = true;
    achievement.unlockedAt = new Date();
    this.unlockedAchievement = achievement;
    this.showAchievementPopup = true;
    
    this.currentStudent.aqcha += achievement.reward;
    localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    
    this.showToast('success', 'Yutuq ochildi!', 
      `${achievement.title} - ${achievement.reward} AQCHA mukofoti`);
    
    setTimeout(() => {
      this.closeAchievementPopup();
    }, 5000);
  }

  closeAchievementPopup() {
    this.showAchievementPopup = false;
    this.unlockedAchievement = null;
  }

  getLevel(): number {
    return Math.floor((this.currentStudent?.xp || 0) / 100) + 1;
  }

  getLevelProgress(): number {
    return ((this.currentStudent?.xp || 0) % 100);
  }

  getDailyEarnings(): number {
    return this.currentStudent?.dailyEarnings || 0;
  }

  getStreakBonus(): number {
    const streak = this.currentStudent?.streak || 0;
    return Math.min(streak * 2, 50);
  }

  getXPToNextLevel(): number {
    return 100 - (this.currentStudent?.xp || 0) % 100;
  }

  getTotalSpent(): number {
    return this.currentStudent?.totalSpent || 0;
  }

  getItemsBought(): number {
    return this.purchaseHistory.length;
  }

  getTotalSavings(): number {
    return this.products
      .filter(p => p.originalPrice && this.purchaseHistory.includes(p.id))
      .reduce((sum, p) => sum + (p.originalPrice! - p.price), 0);
  }

  getPlayerRank(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }

  calculateDiscount(product: Product): number {
    if (!product.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }

  getRarityText(rarity: string): string {
    const rarityMap: { [key: string]: string } = {
      common: 'Oddiy',
      rare: 'Noyob',
      epic: 'Epik',
      legendary: 'Afsonaviy',
      mythic: 'Mifik'
    };
    return rarityMap[rarity] || rarity;
  }

  getToastIcon(type: string): string {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type as keyof typeof icons] || '💡';
  }

  showToast(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) {
    const toast: Toast = {
      id: ++this.toastId,
      type,
      title,
      message,
      duration: 5000
    };

    this.toasts.push(toast);

    setTimeout(() => {
      this.removeToast(toast.id);
    }, toast.duration);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  quickView(product: Product) {
    this.quickViewProduct = product;
  }

  closeQuickView() {
    this.quickViewProduct = null;
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.featured);
  }

  getSpecialOffers(): SpecialOffer[] {
    return this.specialOffers.filter(offer => offer.expiresAt > new Date());
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
  }

  sortProducts(criteria: 'name' | 'price' | 'rarity') {
    this.sortBy = criteria;
  }

  clearFilters() {
    this.searchQuery = '';
    this.activeCategory = 'all';
    this.sortBy = 'name';
  }

  focusSearch() {
    const searchInput = document.querySelector('.search input') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  }

  hasUnlockedAchievements(): boolean {
    return this.achievements.some(ach => ach.unlocked && 
      (!ach.unlockedAt || (new Date().getTime() - ach.unlockedAt.getTime()) < 24 * 60 * 60 * 1000));
  }

  getRecentAchievement(): Achievement | null {
    const recent = this.achievements
      .filter(ach => ach.unlocked && ach.unlockedAt)
      .sort((a, b) => b.unlockedAt!.getTime() - a.unlockedAt!.getTime())[0];
    
    return recent || null;
  }

  showAchievements() {
    this.showToast('info', 'Yutuqlar', 'Yutuqlar paneli ochiladi...');
  }

  scrollCarousel(direction: number) {
    // Not used in simplified design, but kept for compatibility
    const track = document.querySelector('.carousel-track') as HTMLElement;
    if (track) {
      track.scrollLeft += direction * 300;
    }
  }

  getNextOfferExpiry(): string {
    const now = new Date();
    const nextOffer = this.specialOffers
      .filter(offer => offer.expiresAt > now)
      .sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime())[0];
    
    if (!nextOffer) return '';
    
    const diff = nextOffer.expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}soat ${minutes}min`;
  }

  claimOffer(offer: SpecialOffer) {
    if (this.currentStudent.aqcha >= offer.newPrice) {
      this.currentStudent.aqcha -= offer.newPrice;
      localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
      this.showToast('success', 'Taklif olindi!', 
        `${offer.title} muvaffaqiyatli sotib olindi`);
    } else {
      this.showToast('error', 'Aqcha yetarli emas', 
        `Taklif uchun ${offer.newPrice} AQCHA kerak`);
    }
  }
}