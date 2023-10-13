import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  //this is for Json File calling and using into main component html file wihtout using service class
  sites: any[] = [];
  selectedSite: any;

  //this is for xml file calling and parsing using service class
  blogs: any[] = [];
  selectedBlogContent:any;

  constructor(private blogService: BlogService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/assets/data.json').subscribe(data => {
      this.sites = data as any[];
      
      // Display links for the first site (Core Java) by default
      if (this.sites && this.sites.length > 0) {
        this.selectedSite = this.sites[0];
        this.selectedListItem = this.sites[0];
      }
    });


    //this is for the Xml file content
    this.blogService.fetchBlogs().subscribe(data => {
      //this.blogs = data;
      // Automatically select the first blog to display initially
      //this.loadBlogContent(this.blogs[0].link);
      console.log('Fetched Blogs:', data);
      this.blogs = data;
      if (this.blogs && this.blogs.length > 0) {
          console.log('Loading content for blog:', this.blogs[0]);
          this.loadBlogContent(this.blogs[0].link);
      }
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


  //this below code is access of xml file from assets using Blog Service class 
  onXmlSelect(blogLink: string) {
    this.loadBlogContent(blogLink);
  }
  //this BlogContent is from Xml file instead of Projects I made it blog but the html file are for Project
  private loadBlogContent(link: string) {
    this.http.get(link, { responseType: 'text' }).subscribe(content => {
      this.selectedBlogContent = content;
    });
  }
}

