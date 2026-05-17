import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-aarti',
  templateUrl: './aarti.component.html',
  styleUrl: './aarti.component.css'
})
export class AartiComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'बाबा मोहन राम की आरती | Aarti — जय बाबा मोहन राम',
      description: 'बाबा मोहन राम की पूर्ण आरती पढ़ें। "जगमग-जगमग जोत जगी है, मोहन आरती होन लगी है।" भक्ति और श्रद्धा के साथ बाबा की आरती करें।',
      keywords: 'बाबा मोहन राम आरती, Baba Mohan Ram Aarti, मोहन आरती, भक्ति',
    });
  }
}
