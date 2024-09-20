import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AartiComponent } from './aarti/aarti.component';
import { ChalisaComponent } from './chalisa/chalisa.component';
import { InfoComponent } from './info/info.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ExperienceComponent } from './experience/experience.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },

  {path: 'info', component: InfoComponent},
  { 
    path: 'aarti', 
    component: AartiComponent 
  },
  { 
    path: 'chalisa', 
    component: ChalisaComponent 
  },
  { 
    path: 'gallery', 
    component: GalleryComponent 
  },
  { 
    path: 'experience', 
    component: ExperienceComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
