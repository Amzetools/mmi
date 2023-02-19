import { Component, Input, ViewChild } from '@angular/core';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable, of, filter } from 'rxjs';
import { aioTableLabels, aioTableData } from 'src/static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from '../../apps/aio-table/customer-create-update/customer-create-update.component';
import { Customer } from '../../apps/aio-table/interfaces/customer.model';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { ProductService } from 'src/app/services/product.service';
import { AfterViewInit} from '@angular/core';

import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from '../../../data-table/data-table-datasource';
import { Router } from '@angular/router';
@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})

export class DashboardAnalyticsComponent {



  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */

  customers: Customer[];
   products: any[]
   productCount: number

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatTable) table!: MatTable<DataTableItem>;
   dataSource: DataTableDataSource;
 
   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
   displayedColumns = ['id', 'name'];
 
   constructor(private productService: ProductService,private router: Router) {
     this.dataSource = new DataTableDataSource();
   }
 
   ngOnInit(){
    this.productService.getProducts().subscribe((res) => {
      this.products = res.data.fieldData
      console.log(this.products,
        "here")
      this.productCount = res.data.totalCount
      console.log(res.data.length)
    })
   }

   viewProduct(id){
    console.log(id)
    this.router.navigate([`details/${id}`])
   }
 

}