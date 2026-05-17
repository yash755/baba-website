import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class SiteFooterComponent {
  year = new Date().getFullYear();
}
