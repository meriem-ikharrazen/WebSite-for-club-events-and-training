import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'app/models/content.model';
import { Formation } from 'app/models/formation.model';
import { ContentService } from 'app/services/content.service';
import { FormationService } from 'app/services/formation.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  formation_id = 0;
  formation ?: Formation;
  contents ?: Content[] = [];

  constructor(private route:ActivatedRoute,private formationService:FormationService,
    private contentService:ContentService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.formation_id = params['id'];
      this.formationService.getById(this.formation_id).subscribe((result) => {
        if(result != null){
          this.formation = result;
          console.log("la formation: ")
          console.log(this.formation); 
          this.getAllContent(this.formation);
        }
      });
    });
  }

  getAllContent(formation){
      this.contentService.getAll(formation).subscribe(result=>{
        this.contents = result;
        console.log(this.contents);
      })
  }

  
  photoURL(content) {
    console.log(this.sanitizer.bypassSecurityTrustUrl(content.url))
    return this.sanitizer.bypassSecurityTrustUrl(content.url);
  }


}
