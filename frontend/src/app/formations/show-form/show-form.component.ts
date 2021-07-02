import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Formation } from 'app/models/formation.model';
import { GlobalVariables } from 'GlobalVariables';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  @Input() formation?:Formation;

  @ViewChild("closeModal") closeModal: ElementRef;
  constructor(private globalVariables:GlobalVariables) { }

  ngOnInit(): void {
    this.formation.image = this.globalVariables.url+"/public/images/formations/"+this.formation.image;
    
  }

  open() {
    document.getElementById("openModalButton").click();
    console.log(this.formation);
  }


}
