import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  keywords?: string;
}

const SITE_NAME = 'जय बाबा मोहन राम';
const BASE_URL = 'https://jaibabamohanram.co.in';
const DEFAULT_IMAGE = `${BASE_URL}/assets/praying_hands_main.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private router = inject(Router);

  update(config: SeoConfig): void {
    const fullTitle = config.title;
    const url = `${BASE_URL}${this.router.url}`;
    const image = config.image ?? DEFAULT_IMAGE;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
