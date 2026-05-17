import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-chalisa',
  templateUrl: './chalisa.component.html',
  styleUrl: './chalisa.component.css'
})
export class ChalisaComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'बाबा मोहन राम की चालीसा | Chalisa — जय बाबा मोहन राम',
      description: 'बाबा मोहन राम की पूर्ण चालीसा पढ़ें। "जै मन मोहन जग विख्याता, दीन दुखियों के तुम हो दाता।" नित्य पाठ करने से मनोकामना पूर्ण होती है।',
      keywords: 'बाबा मोहन राम चालीसा, Baba Mohan Ram Chalisa, मोहन चालीसा, भक्ति पाठ',
    });
  }
}
