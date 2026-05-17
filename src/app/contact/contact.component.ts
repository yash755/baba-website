import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'संपर्क करें | Contact — जय बाबा मोहन राम',
      description: 'जय बाबा मोहन राम वेबसाइट से संपर्क करें। अपना अनुभव साझा करें या कोई सुझाव दें।',
    });
  }
}
