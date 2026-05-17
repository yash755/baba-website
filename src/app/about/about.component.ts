import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'हमारे बारे में | About — जय बाबा मोहन राम',
      description: 'जय बाबा मोहन राम वेबसाइट के बारे में जानें। यह साइट बाबा मोहन राम के भक्तों के लिए बनाई गई है — आरती, चालीसा, और भक्त अनुभव एक स्थान पर।',
    });
  }
}
