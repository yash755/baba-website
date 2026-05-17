import { ExperienceService } from '../service/experience.service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Experience } from '../model/experience';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeoService } from '../service/seo.service';

interface Story {
  title: string;
  name: string;
  place: string;
  updated_at: string;
  excerpt: string;
  count: number;
  id: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private seo = inject(SeoService);

  route: ActivatedRoute = inject(ActivatedRoute);
  experienceService = inject(ExperienceService);
  experiences: Experience[] = [];

  query = '';
  page = 1;
  pageSize = 6;
  pageSizeOptions = [6, 9, 12, 18];
  loading = true;

  stories: Story[] = [];

  ngOnInit(): void {
    this.seo.update({
      title: 'भक्तों के अनुभव | Devotee Stories — जय बाबा मोहन राम',
      description: 'बाबा मोहन राम के भक्तों के सच्चे अनुभव और चमत्कारी कथाएँ पढ़ें। नौकरी, स्वास्थ्य, परिवार — बाबा की कृपा से जीवन बदला। 22+ कहानियाँ।',
      keywords: 'बाबा मोहन राम अनुभव, भक्त कथाएँ, चमत्कार, Baba Mohan Ram stories',
    });

    this.experienceService.getExperiences().subscribe({
      next: (exp) => {
        if (exp && 'data' in exp) {
          this.stories = exp.data;
          this.loading = false;
          this.cdr.markForCheck();
        }
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  get filtered(): Story[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.stories;
    return this.stories.filter(s => {
      const hay = [s.title, s.name, s.place, s.updated_at, s.excerpt].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  get total(): number { return this.filtered.length; }
  get totalPages(): number { return Math.max(1, Math.ceil(this.total / this.pageSize)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paged(): Story[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  onQueryChange(v: string) { this.query = v; this.page = 1; }
  onPageSizeChange(v: string | number) { this.pageSize = Number(v); this.page = 1; }
  goToPage(n: number) { if (n >= 1 && n <= this.totalPages) this.page = n; }
  prev() { this.goToPage(this.page - 1); }
  next() { this.goToPage(this.page + 1); }
  trackByTitle = (_: number, s: Story) => s.title;
}
