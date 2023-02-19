import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Link } from '../../../@vex/interfaces/link.interface';
import { scaleIn400ms } from '../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { contactsData } from '../../../static-data/contacts';
import { trackById } from '../../../@vex/utils/track-by';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../@vex/animations/scale-fade-in.animation';
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'vex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ProductListComponent implements OnInit {
   isLoading: boolean =  true;
   products = [];
   contacts = contactsData;
  filteredContacts$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('activeCategory')),
    map(activeCategory => {
      switch (activeCategory) {
        case 'all': {
          return contactsData;
        }

        case 'starred': {
          return contactsData.filter(c => c.starred);
        }

        default: {
          return [];
        }
      }
    })
  );

  links: Link[] = [
    {
      label: 'All Products',
      route: '../all'
    },
  ];

  trackById = trackById;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private cd: ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((product) => {
      if(product.data){
        this.isLoading = false
        this.products = product.data.fieldData
        console.log(this.products,"here")
        this.cd.markForCheck();
      }
    })
  }
  
  productDetails(id) {
    console.log(id)
    this.router.navigate([`details/${id}`])
  }
}

