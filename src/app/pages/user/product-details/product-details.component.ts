import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'vex-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProductDetailsComponent  implements OnInit {
   id: any;
   productDetail: any;
   isLoading: boolean = true;
  constructor(private route: ActivatedRoute,private router : Router,private productService: ProductService) {
    
  }
  ngOnInit(): void {
    this.id= this.route.snapshot.params['id']

    this.productService.getSingleProduct(this.id).subscribe((res) => {
          if(res.data) {
            this.isLoading = false;
            this.productDetail = res.data.fieldData[0];
            console.log(this.productDetail,"here")
          }
    })
  }
 
}
