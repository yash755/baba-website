import { ExperienceService } from '../service/experience.service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../model/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  experienceService = inject(ExperienceService);
  experiences: Experience[] = [];

  constructor() {

   this.experienceService.getExperiences().subscribe({
      next: (exp) => {
        if (exp) {
          if ('data' in exp) {
            this.experiences = exp.data;
            console.log(this.experiences);
          }
        }
        
      },
      error: (error) => {
        
      },
    });
  }

}
