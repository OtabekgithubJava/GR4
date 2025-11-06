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
      { id: 1, name: "Algebra Mastery Workbook", price: 18, description: "300+ practice problems with step-by-step solutions.", image: 'assets/images/products/algebra.jpg', category: 'books', rarity: 'rare', xpBonus: 90 },
      { id: 2, name: "World History Encyclopedia", price: 32, description: "From ancient Rome to modern revolutions.", image: 'assets/images/products/history.jpg', category: 'books', rarity: 'epic', xpBonus: 140 },
      { id: 3, name: "English Vocabulary Builder", price: 14, description: "5000+ words, quizzes, and flashcards.", image: 'assets/images/products/vocab.jpg', category: 'books', rarity: 'common', xpBonus: 40 },
      { id: 4, name: "Physics for High School", price: 25, description: "Mechanics, electricity, and waves explained.", image: 'assets/images/products/physics.jpg', category: 'books', rarity: 'rare', xpBonus: 100 },
      { id: 5, name: "Creative Writing Guide", price: 16, description: "Story structure, dialogue, and editing tips.", image: 'assets/images/products/writing.jpg', category: 'books', rarity: 'common', xpBonus: 50 },
      { id: 6, name: "Biology Lab Manual", price: 28, description: "30+ experiments with full diagrams.", image: 'assets/images/products/biology.jpg', category: 'books', rarity: 'epic', xpBonus: 120 },
      { id: 7, name: "SAT Prep Book", price: 30, description: "Practice tests + strategies for top scores.", image: 'assets/images/products/sat.jpg', category: 'books', rarity: 'epic', xpBonus: 130 },

      { id: 8, name: "Gel Ink Pen Set (12 colors)", price: 10, description: "Smooth, quick-dry, ergonomic grip.", image: 'assets/images/products/gelpen.jpg', category: 'stationery', rarity: 'common' },
      { id: 9, name: "A4 Spiral Notebook", price: 13, description: "200 pages, college-ruled, durable cover.", image: 'assets/images/products/notebook.jpg', category: 'stationery', rarity: 'rare', xpBonus: 35 },
      { id: 10, name: "Neon Highlighters (6-pack)", price: 8, description: "Chisel tip, smear-resistant.", image: 'assets/images/products/highlighter.jpg', category: 'stationery', rarity: 'common' },
      { id: 11, name: "Mechanical Pencil Set (0.5/0.7mm)", price: 9, description: "With refill leads and erasers.", image: 'assets/images/products/mechanical.jpg', category: 'stationery', rarity: 'common' },
      { id: 12, name: "Sticky Notes Cube (400 sheets)", price: 7, description: "Bright colors, strong adhesive.", image: 'assets/images/products/stickynotes.jpg', category: 'stationery', rarity: 'common' },
      { id: 13, name: "Whiteboard Marker Set", price: 11, description: "Low-odor, chisel tip, 8 colors.", image: 'assets/images/products/whiteboard.jpg', category: 'stationery', rarity: 'rare' },
      { id: 14, name: "Index Cards (500 pack)", price: 6, description: "Ruled, perfect for flashcards.", image: 'assets/images/products/indexcards.jpg', category: 'stationery', rarity: 'common' },

      { id: 15, name: "Scientific Calculator FX-991", price: 29, description: "400+ functions, natural display.", image: 'assets/images/products/calculator.jpg', category: 'devices', rarity: 'epic', xpBonus: 110 },
      { id: 16, name: "Wireless Bluetooth Mouse", price: 22, description: "Ergonomic, 1600 DPI, silent click.", image: 'assets/images/products/mouse.jpg', category: 'devices', rarity: 'rare', xpBonus: 60 },
      { id: 17, name: "USB-C Hub 7-in-1", price: 35, description: "HDMI, SD, USB 3.0, PD charging.", image: 'assets/images/products/hub.jpg', category: 'devices', rarity: 'epic', xpBonus: 100 },
      { id: 18, name: "Portable Power Bank 20000mAh", price: 38, description: "Fast charge, dual USB output.", image: 'assets/images/products/powerbank.jpg', category: 'devices', rarity: 'rare', xpBonus: 80 },
      { id: 19, name: "Webcam HD 1080p", price: 45, description: "Auto-focus, built-in mic.", image: 'assets/images/products/webcam.jpg', category: 'devices', rarity: 'epic', xpBonus: 130 },
      { id: 20, name: "Laptop Stand (Aluminum)", price: 30, description: "Adjustable height, cooling vents.", image: 'assets/images/products/stand.jpg', category: 'devices', rarity: 'rare', xpBonus: 70 },
      { id: 21, name: "Noise-Cancelling Headphones", price: 65, description: "Over-ear, 30h battery, ANC.", image: 'assets/images/products/headphones.jpg', category: 'devices', rarity: 'legendary', xpBonus: 200, streakBonus: 2 },

      { id: 22, name: "Smart LED Desk Lamp", price: 48, description: "Touch control, wireless charging base.", image: 'assets/images/products/lamp.jpg', category: 'premium', rarity: 'legendary', xpBonus: 180, streakBonus: 2 },
      { id: 23, name: "Leather Academic Planner", price: 40, description: "Custom name embossed, weekly layout.", image: 'assets/images/products/planner.jpg', category: 'premium', rarity: 'epic', xpBonus: 130 },
      { id: 24, name: "Hydration Tracking Bottle", price: 33, description: "App sync, LED reminder, 750ml.", image: 'assets/images/products/bottle.jpg', category: 'premium', rarity: 'rare', xpBonus: 80 },
      { id: 25, name: "Ergonomic Chair Cushion", price: 42, description: "Memory foam, breathable mesh.", image: 'assets/images/products/cushion.jpg', category: 'premium', rarity: 'rare', xpBonus: 90 },
      { id: 26, name: "Digital Notebook (Rocketbook)", price: 35, description: "Reusable, cloud sync via app.", image: 'assets/images/products/rocketbook.jpg', category: 'premium', rarity: 'epic', xpBonus: 140 },
      { id: 27, name: "Personalized Metal Pen", price: 28, description: "Engraved name, premium ink.", image: 'assets/images/products/metalpen.jpg', category: 'premium', rarity: 'rare', xpBonus: 70 },
      { id: 28, name: "Smart Plant Watering Sensor", price: 55, description: "App alerts, soil moisture monitor.", image: 'assets/images/products/plant.jpg', category: 'premium', rarity: 'legendary', xpBonus: 160 },

      { id: 29, name: "Acrylic Paint Set (24 colors)", price: 25, description: "Non-toxic, vibrant, fast-dry.", image: 'assets/images/products/paint.jpg', category: 'art', rarity: 'rare', xpBonus: 70 },
      { id: 30, name: "Professional Sketch Pencils", price: 12, description: "12 grades from 6H to 8B.", image: 'assets/images/products/pencils.jpg', category: 'art', rarity: 'common' },
      { id: 31, name: "Canvas Panel Pack (5 pcs)", price: 19, description: "30×40 cm, pre-primed.", image: 'assets/images/products/canvas.jpg', category: 'art', rarity: 'rare' },
      { id: 32, name: "Watercolor Brush Set", price: 15, description: "Synthetic bristles, 10 sizes.", image: 'assets/images/products/brushes.jpg', category: 'art', rarity: 'common' },
      { id: 33, name: "Drawing Tablet (Beginner)", price: 50, description: "8x5 in, 8192 pressure levels.", image: 'assets/images/products/tablet.jpg', category: 'art', rarity: 'epic', xpBonus: 150 },
      { id: 34, name: "Charcoal Sketching Kit", price: 18, description: "Pencils, sticks, eraser, sharpener.", image: 'assets/images/products/charcoal.jpg', category: 'art', rarity: 'rare' },
      { id: 35, name: "Oil Pastel Set (36 colors)", price: 20, description: "Blendable, rich pigments.", image: 'assets/images/products/pastel.jpg', category: 'art', rarity: 'rare', xpBonus: 60 },

      { id: 36, name: "World Map Jigsaw Puzzle", price: 16, description: "500 pieces, educational & fun.", image: 'assets/images/products/puzzle.jpg', category: 'games', rarity: 'common', xpBonus: 40 },
      { id: 37, name: "Logic Brain Teaser Set", price: 28, description: "100 challenges, portable case.", image: 'assets/images/products/logic.jpg', category: 'games', rarity: 'epic', xpBonus: 95 },
      { id: 38, name: "Rubik’s Cube 3x3", price: 12, description: "Official competition grade.", image: 'assets/images/products/rubik.jpg', category: 'games', rarity: 'common' },
      { id: 39, name: "Chess & Checkers Set", price: 22, description: "Wooden board, magnetic pieces.", image: 'assets/images/products/chess.jpg', category: 'games', rarity: 'rare', xpBonus: 50 },
      { id: 40, name: "Memory Card Game", price: 10, description: "50 pairs, improves focus.", image: 'assets/images/products/memory.jpg', category: 'games', rarity: 'common' },
      { id: 41, name: "Sudoku Master Book", price: 14, description: "1000 puzzles, 5 difficulty levels.", image: 'assets/images/products/sudoku.jpg', category: 'games', rarity: 'common', xpBonus: 30 },
      { id: 42, name: "Tangram Puzzle Set", price: 18, description: "7 pieces, 100+ shapes to build.", image: 'assets/images/products/tangram.jpg', category: 'games', rarity: 'rare', xpBonus: 55 }
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
      { id: 'books', name: 'Books' },
      { id: 'stationery', name: 'Stationery' },
      { id: 'devices', name: 'Devices' },
      { id: 'premium', name: 'Premium' },
      { id: 'art', name: 'Art Supplies' },
      { id: 'games', name: 'Games & Puzzles' }
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