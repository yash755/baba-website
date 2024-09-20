import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../service/gallery.service';
import { Album } from '../model/album';
import { GalleryModule, Gallery, GalleryRef, ImageItem, GalleryConfig } from 'ng-gallery';
import { LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  standalone: true,
  imports: [GalleryModule]
})
export class GalleryComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  galleryService = inject(GalleryService);
  album: Album[] = [];
  


  constructor(private gallery: Gallery) {}

  ngOnInit() {
    const galleryRef = this.gallery.ref('myGallery');

    const config: GalleryConfig = {
      autoPlay: true,
      imageSize: 'contain',
      dots: true,


      
    };

    

    this.galleryService.getGallery().subscribe({
      next: (gal) => {
        if (gal) {
          if ('data' in gal) {
            this.album = gal.data;
            console.log(this.album);
            for (let i=0; i<this.album.length; i++) {
              galleryRef.addImage({ src: this.album[i].main_url, thumb: this.album[i].main_url });
            }
            // galleryRef.load([
            //   new ImageItem({ src: "https://pixabay.com/get/gb74d0a513a3b2594e24072cd9a5c50a8f2e18948299c132816fd1744f14998eebb45aabac60c4dd534af6ec2a2e127db_1280.jpg", thumb: "https://cdn.pixabay.com/photo/2023/10/15/15/29/pumpkins-8317227_150.jpg" }),
            //   new ImageItem({ src: "https://pixabay.com/get/gb74d0a513a3b2594e24072cd9a5c50a8f2e18948299c132816fd1744f14998eebb45aabac60c4dd534af6ec2a2e127db_1280.jpg", thumb: "https://cdn.pixabay.com/photo/2023/10/15/15/29/pumpkins-8317227_150.jpg" }),
            //   // ... more items
            // ]);
            galleryRef.setConfig(config)
          }
        }
        
      },
      error: (error) => {
        
      },
    });

    

  }

}

