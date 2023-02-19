import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment  as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
   userId: any;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
      this.userId = localStorage.getItem("UserId")
      // return this.http.get<any>(`${env.baseUrl}/Customers/RelatedProducts?userId=${this.userId}`)    
      return this.http.get<any>(`${env.baseUrl}/Customers/RelatedProducts?userId=4`)    
  }
  getSingleProduct(sku): Observable<any> {
    this.userId = localStorage.getItem("UserId")
    return this.http.get<any>(`${env.baseUrl}/Products/FindProduct?sku=${sku}`)
  }
  getShipment(){
    this.userId = localStorage.getItem("UserId")
    return this.http.get<any>(`https://mmiv2.fancykeyboardapp.com/api/Customers/Shipping?userId=${this.userId}&limit=100&offset=40
    `)
  }
}
