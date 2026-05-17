import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Experience } from '../model/experience';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienceService } from '../service/experience.service';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from '../service/seo.service';

interface StoryDetail {
  slug?: string;
  title: string;
  name: string;
  place: string;
  created_at: string;        // ISO date e.g. 2025-07-12
  quote?: string;         // optional highlight line
  count: number;          // initial reads
  experience: string;         // paragraphs
  prev_link?: string;
  next_link?: string;
  tags?: string[];
}

// const STORY_JSON: StoryDetail = {
//   slug: 'naukri-ka-chamatkar',
//   title: 'नौकरी का चमत्कार',
//   author: 'राहुल शर्मा',
//   location: 'भिवाड़ी',
//   dateISO: '2025-07-12',
//   quote: '“सच्चे मन से पुकारो — बाबा संकट हर लेते हैं।”',
//   reads: 1234,
//   body: [
//     'वर्षों की मेहनत के बावजूद नौकरी नहीं लग रही थी। मन में निराशा घर कर गई थी। एक दिन किसी मित्र ने कहा—“सच्चे मन से बाबा मोहन राम को पुकारो, राह मिल जाएगी।” मैंने रोज़ सुबह-शाम “जय बाबा मोहन राम 🔱🙏” का जाप शुरू किया।',
//     'कुछ ही दिनों में एक पुरानी कंपनी से इंटरव्यू का कॉल आया। जो पद मैं वर्षों से चाहता था, उसी पद के लिए अवसर मिला। इंटरव्यू में वही प्रश्न पूछे गए जिनकी मैंने तैयारी की थी। आश्चर्यजनक रूप से उसी शाम ऑफर लेटर भी मिल गया।',
//     'यह संयोग नहीं था—यह बाबा की कृपा थी। आज भी जब ऑफिस जाता हूँ तो पहला कदम बाबा के चरणों में वंदन कर ही रखता हूँ। जो भी कठिनाई में है, आस्था के साथ बाबा को पुकारो—रास्ता अवश्य खुलता है।'
//   ],
//   prevLink: '/experience/bimari-se-mukti',
//   nextLink: '/experience/vyapar-me-unnati',
//   tags: ['नौकरी', 'रोज़गार', 'कृपा']
// };

type CommentItem = { name: string; city?: string; text: string; ts: number };

@Component({
  selector: 'app-experience-detail',
  templateUrl: './detail-story.component.html',
  styleUrls: ['./detail-story.component.css'], // ✅ plural
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailStoryComponent implements OnInit {

  story!: StoryDetail;
  copyStatus = '';
  comments: CommentItem[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  experienceService = inject(ExperienceService);
  private seo = inject(SeoService);
  private cdr = inject(ChangeDetectorRef);
  loading = true; 
  id = '';

  constructor(
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
            this.experienceService.getDetailExperience(id).subscribe({
      next: (exp) => {
        if ('data' in exp) {
        this.story = exp.data;
        this.loading = false;
        const desc = (this.story.experience ?? '').replace(/<[^>]*>/g, '').slice(0, 150);
        this.seo.update({
          title: `${this.story.title} — बाबा मोहन राम का चमत्कार`,
          description: desc || `${this.story.title} — बाबा मोहन राम के भक्त की सच्ची कहानी।`,
          keywords: `${this.story.title}, बाबा मोहन राम, भक्त अनुभव, चमत्कार`,
        });
        this.cdr.markForCheck();
        this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollTop();
      });
        }
      },
      error: (error) => {
        
        this.cdr.markForCheck();
        
      },
    });
      }
    });



    // ✅ Load comments (browser only)
    this.comments = this.hasLocalStorage() ? this.loadComments() : [];
  }


  private scrollTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // === Share / Copy ===
  async share(): Promise<void> {
    const url = this.getHref();
    const title = this.story?.title ?? document?.title ?? '';
    try {
      if (this.hasNavigatorShare()) {
        await (navigator as any).share({ title, url });
        this.copyStatus = '';
      } else if (this.hasClipboard()) {
        await navigator.clipboard.writeText(url);
        this.flashStatus('लिंक कॉपी हो गया');
      }
    } catch { /* ignore user-cancel */ }
  }

  async copyLink(): Promise<void> {
    if (!this.hasClipboard()) return;
    try {
      await navigator.clipboard.writeText(this.getHref());
      this.flashStatus('लिंक कॉपी हो गया');
    } catch {
      this.flashStatus('कॉपी नहीं हो पाया');
    }
  }

  // === Comments (localStorage demo, no FormsModule needed) ===
  onSubmitComment(nameEl: HTMLInputElement, cityEl: HTMLInputElement, textEl: HTMLTextAreaElement): void {
    const text = (textEl?.value ?? '').trim();
    if (text.length < 2) return;

    const item: CommentItem = {
      name: ((nameEl?.value ?? '') || 'अनाम').trim(),
      city: (cityEl?.value ?? '').trim() || undefined,
      text,
      ts: Date.now()
    };

    const list = this.hasLocalStorage() ? this.loadComments() : [];
    list.unshift(item);
    this.saveComments(list);
    this.comments = list;

    // reset
    if (nameEl) nameEl.value = '';
    if (cityEl) cityEl.value = '';
    if (textEl) textEl.value = '';
  }

  // === Helpers ===
  private commentsKey(): string {
    return `comments:${this.story.slug}`;
  }

  private loadComments(): CommentItem[] {
    if (!this.hasLocalStorage()) return [];
    try {
      const raw = localStorage.getItem(this.commentsKey());
      return raw ? (JSON.parse(raw) as CommentItem[]) : [];
    } catch {
      return [];
    }
  }

  private saveComments(items: CommentItem[]): void {
    if (!this.hasLocalStorage()) return;
    localStorage.setItem(this.commentsKey(), JSON.stringify(items));
  }

  private flashStatus(msg: string): void {
    this.copyStatus = msg;
    setTimeout(() => (this.copyStatus = ''), 1500);
  }

  private hasLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  private hasClipboard(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText;
  }
  private hasNavigatorShare(): boolean {
    return typeof navigator !== 'undefined' && typeof (navigator as any).share === 'function';
  }
  private getHref(): string {
    return typeof window !== 'undefined' ? window.location.href : '';
  }

  // Format date to dd-MM-yyyy (without DatePipe dependency)
  formatDate(iso: string): string {
    const d = new Date(iso);
    if (isNaN(+d)) return iso;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    return `${dd}-${mm}-${yy}`;
  }
}
