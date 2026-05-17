import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Privacy Policy | गोपनीयता नीति — जय बाबा मोहन राम',
      description: 'जय बाबा मोहन राम वेबसाइट की गोपनीयता नीति। कुकीज़, विज्ञापन और डेटा उपयोग के बारे में जानें।',
    });
  }
}
