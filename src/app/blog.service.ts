import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  fetchBlogs() {
    return this.http.get('assets/corejavaproject.xml', { responseType: 'text' }).pipe(
      map(response => {
        console.log('XML Response:', response);
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'application/xml');
  
        // Check if the XML document has parsing errors.
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          throw new Error('Error parsing XML: ' + parserError.textContent);
        }
  
        const blogs: any = [];
        const blogNodes = xmlDoc.querySelectorAll('Blog');
        console.log('Blog Nodes:', blogNodes);
  
        blogNodes.forEach((blogNode: Element) => {
          const idNode = blogNode.querySelector('id');
          const nameNode = blogNode.querySelector('name');
          const linkNode = blogNode.querySelector('link');
  
          if (idNode && nameNode && linkNode) {
            blogs.push({
              id: idNode.textContent ? idNode.textContent.trim() : '',
              name: nameNode.textContent ? nameNode.textContent.trim() : '',
              link: linkNode.textContent ? linkNode.textContent.trim() : ''
            });
          }
        });
        return blogs;
      }),
      catchError(error => {
        console.error('Error fetching or parsing XML:', error);
        return throwError(error);
      })
    );
  }
  
  
}
