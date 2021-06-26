import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormationService } from 'app/services/formation.service';

@Component({
  selector: 'app-show-formation',
  templateUrl: './show-formation.component.html',
  styleUrls: ['./show-formation.component.css']
})
export class ShowFormationComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','libele','status','dateAjout','action'];
  dataSource:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formationService:FormationService){}

  ngAfterViewInit() {
    
    this.formationService.getformations().subscribe(data=>{
    console.log(data);
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

