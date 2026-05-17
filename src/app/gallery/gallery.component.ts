import { Component, ChangeDetectionStrategy, HostListener, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../service/gallery.service';
import { SeoService } from '../service/seo.service';


type GalleryItem = {
  main_url: string;        // image file (large enough for preview)
  thumbnail_url?: string;     // optional smaller thumbnail (falls back to src)
  alt?: string;
  w?: number;         // optional original width (for future use)
  h?: number;         // optional original height
  credit?: string;    // optional caption/credit
  udated_at?: string;
};

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  // Masonry image list (mix sizes freely). Update paths to your assets.
  images: GalleryItem[] = [
  ];

  // Lightbox state
  previewOpen = false;
  currentIndex = 0;

  route: ActivatedRoute = inject(ActivatedRoute);
  galleryService = inject(GalleryService);
  private cdr = inject(ChangeDetectorRef);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'गैलरी | काली खोली धाम की तस्वीरें — जय बाबा मोहन राम',
      description: 'काली खोली धाम और बाबा मोहन राम के मंदिर की तस्वीरें देखें। भक्तों के दर्शन, पूजा और धाम के दृश्य।',
      keywords: 'काली खोली धाम गैलरी, बाबा मोहन राम फोटो, Kali Kholi mandir, gallery',
    });
    this.galleryService.getGallery().subscribe({
      next: (gal) => {
        if (gal) {
          if ('data' in gal) {
            this.images = gal.data;
            console.log(this.images);
            this.cdr.markForCheck();
          }
        }
        
      },
      error: (error) => {
        this.cdr.markForCheck();
      },
    });
  }

  

  openPreview(i: number) {
    this.currentIndex = i;
    this.previewOpen = true;
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = 'hidden';
    }
  }

  closePreview() {
    this.previewOpen = false;
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = '';
    }
  }

  next() {
    if (!this.images.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    if (!this.images.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Keyboard controls for accessibility
  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!this.previewOpen) return;
    if (e.key === 'Escape') this.closePreview();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  // convenience getters
  get active(): GalleryItem | null {
    return this.images[this.currentIndex] ?? null;
  }

  // Stop click propagation inside modal content
  stop(e: Event) { e.stopPropagation(); }
}
