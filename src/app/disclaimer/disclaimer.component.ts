import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Disclaimer | अस्वीकरण — जय बाबा मोहन राम',
      description: 'जय बाबा मोहन राम वेबसाइट का अस्वीकरण। यह एक भक्ति साइट है और किसी भी चिकित्सा या कानूनी सलाह का विकल्प नहीं है।',
    });
  }
}
