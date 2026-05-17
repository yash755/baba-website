import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AartiComponent } from './aarti/aarti.component';
import { ChalisaComponent } from './chalisa/chalisa.component';
import { InfoComponent } from './info/info.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ExperienceComponent } from './experience/experience.component';
import { DetailStoryComponent } from './detail-story/detail-story.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },

  { path: 'info', component: InfoComponent },
  { path: 'aarti', component: AartiComponent },
  { path: 'chalisa', component: ChalisaComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'detail-story/:title/:id', component: DetailStoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: 'info' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
