import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  sites: any[] = [];
  selectedSite: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/assets/data.json').subscribe(data => {
      this.sites = data as any[];
    });
  }

  onSelect(site: any) {
    this.selectedSite = site;
  }

  getKey(linkObj: any): string {
    return Object.keys(linkObj)[0];
  }

  selectedListItem: any = null;

  selectListItem(item: any) {
    this.selectedListItem = item;
  }
}
