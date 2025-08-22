import { ExperienceService } from '../service/experience.service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Experience } from '../model/experience';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';



interface Story {
  title: string;
  name: string;
  place: string;
  updated_at: string;      // ISO or display string
  excerpt: string;
  // href: string;      // router link or URL
  // tags: string[];    // for search/filter
  count: number;
  id:string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {

  private cdr = inject(ChangeDetectorRef);

  route: ActivatedRoute = inject(ActivatedRoute);
  experienceService = inject(ExperienceService);
  experiences: Experience[] = [];

  query = '';
  page = 1;
  pageSize = 6;
  pageSizeOptions = [6, 9, 12, 18];
  loading = true; 

  // --- Data (replace with your API results) ---
  stories: Story[] = [
  ];

  constructor() {

   this.experienceService.getExperiences().subscribe({
      next: (exp) => {
        if (exp) {
          if ('data' in exp) {
            this.stories = exp.data;
            // console.log(this.stories);
            this.loading = false;  
            this.cdr.markForCheck();
          }
        }
        
      },
      error: (error) => {
        this.loading = false;   // hide loader even on error
        this.cdr.markForCheck();
        
      },
    });
  }



  // --- Derived data ---
  get filtered(): Story[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.stories;
    return this.stories.filter(s => {
      const hay = [
        s.title, s.name, s.place, s.updated_at, s.excerpt
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  get total(): number {
    return this.filtered.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paged(): Story[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  // --- UI handlers ---
  onQueryChange(v: string) {
    this.query = v;
    this.page = 1; // reset to first page on search
  }

  onPageSizeChange(v: string | number) {
    this.pageSize = Number(v);
    this.page = 1; // reset to first page
  }

  goToPage(n: number) {
    if (n < 1 || n > this.totalPages) return;
    this.page = n;
  }

  prev() { this.goToPage(this.page - 1); }
  next() { this.goToPage(this.page + 1); }

  trackByTitle = (_: number, s: Story) => s.title;


}
