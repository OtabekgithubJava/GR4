import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// last updated in 04.10.2025 15:19


interface Student {
  id: number;
  name: string;
  username: string;
  password: string;
  image: string; // Faqat image qoldi
  level: string;
  diamonds: number; // yangi
  months: {
    [key: string]: {
      davomat: number;
      uy_vazifa: number;
      tasks: number;
      jarima: number; // Yangi qo'shilgan maydon
    }
  };
}

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-system',
  standalone: false,
  templateUrl: './system.html',
  styleUrls: ['./system.scss']
})
export class System implements OnInit {
  isCollapsed = false;
  isDarkMode = false;
  isMobile = false;
  currentStudent: Student | null = null;
  totalJarima: number = 0; // Yangi qo'shilgan maydon

  menuItems: MenuItem[] = [
    { title: 'Bosh Sahifa', path: '/system/home', icon: 'fas fa-home' },
    { title: 'Reyting', path: '/system/rating', icon: 'fas fa-chart-line' },
    { title: 'Profil', path: '/system/profile', icon: 'fas fa-user' },
    { title: 'Do\'kon', path: '/system/shop', icon: 'fas fa-store'}
    // Yangi menyu elementi

  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadStudentData();
    // heloooo
    this.loadThemePreference();
    this.applyTheme();
    this.calculateTotalJarima(); // Yangi funksiya
    
    // Har 1 soniyada localStorage tekshirib turish
    setInterval(() => {
      this.checkThemeChange();
    }, 1000);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isCollapsed = false;
    }
  }

  private loadStudentData() {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      this.currentStudent = JSON.parse(studentData);
    }
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // LocalStorage'dagi theme qiymati o'zgarganligini tekshirish
  private checkThemeChange() {
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = this.isDarkMode ? 'dark' : 'light';
    
    if (savedTheme !== currentTheme) {
      this.loadThemePreference();
      this.applyTheme();
    }
  }

  private calculateTotalJarima() {
    if (this.currentStudent && this.currentStudent.months) {
      this.totalJarima = Object.values(this.currentStudent.months)
        .reduce((total, month) => total + (month.jarima || 0), 0);
    }
  }

  onMobileNavClick() {
    // Mobile nav item bosilganda ishlaydi
  }

  logout() {
    localStorage.removeItem('studentId');
    localStorage.removeItem('currentStudent');
    this.router.navigate(['/login']);
  }

  calculateTotalXP(): number {
  if (!this.currentStudent || !this.currentStudent.months) return 0;

  let totalXP = 0;
  for (const monthKey in this.currentStudent.months) {
    if (this.currentStudent.months.hasOwnProperty(monthKey)) {
      const monthData = this.currentStudent.months[monthKey];
      totalXP += monthData.davomat + monthData.uy_vazifa + monthData.tasks - monthData.jarima;
    }
  }
  return totalXP;
}


  convertXpToDiamonds(): void {
  if (!this.currentStudent) return;
  
  const conversionRate = 1000;
  const totalXP = this.calculateTotalXP();

  if (totalXP >= conversionRate) {
    const diamondsEarned = Math.floor(totalXP / conversionRate);
    this.currentStudent.diamonds = (this.currentStudent.diamonds || 0) + diamondsEarned;

    // Adjust XP: Here assuming XP reset after conversion, can be adapted
    // If XP is stored differently, update accordingly.
    this.resetOrAdjustXPAfterConversion();

    // Save changes
    localStorage.setItem('currentStudent', JSON.stringify(this.currentStudent));
    
    alert(`Successfully converted XP to ${diamondsEarned} diamonds!`);
  } else {
    alert('Not enough XP for conversion!');
  }
}

// You may implement this method to clear or reduce student's XP after conversion
private resetOrAdjustXPAfterConversion() {
  // Example: reset all monthly XP-related fields
  if (!this.currentStudent) return;
  for (const month in this.currentStudent.months) {
    this.currentStudent.months[month].tasks = 0;
    this.currentStudent.months[month].uy_vazifa = 0;
    this.currentStudent.months[month].davomat = 0;
    this.currentStudent.months[month].jarima = 0;
  }
}


}