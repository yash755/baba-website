import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'जय बाबा मोहन राम | काली खोली धाम — नीले घोड़े वाले बाबा',
      description: 'बाबा मोहन राम के भक्तों का आधिकारिक स्थल। आरती, चालीसा, गैलरी और 22 से अधिक भक्तों के अनुभव पढ़ें। काली खोली धाम के बारे में जानें।',
      keywords: 'बाबा मोहन राम, जय बाबा, काली खोली धाम, Baba Mohan Ram, Kali Kholi, bhakti',
    });
  }
}
