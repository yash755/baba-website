import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';

import { GalleryModule } from 'ng-gallery';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { RouterModule } from '@angular/router';
import { AartiComponent } from './aarti/aarti.component';
import { ChalisaComponent } from './chalisa/chalisa.component';
import { InfoComponent } from './info/info.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ExperienceComponent } from './experience/experience.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxModule } from 'ngx-lightbox';
import { DetailStoryComponent } from './detail-story/detail-story.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SiteFooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AartiComponent,
    ChalisaComponent,
    InfoComponent,
    ExperienceComponent,
    DetailStoryComponent,
    GalleryComponent,
    PrivacyPolicyComponent,
    AboutComponent,
    ContactComponent,
    DisclaimerComponent,
    SiteFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LightboxModule,
    PortalModule,
    ScrollingModule,
    FlexLayoutModule,
    FormsModule,
    DatePipe,
    CommonModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
