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
import { aioTableLabels, aioTableData } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from '../../../pages/apps/aio-table/customer-create-update/customer-create-update.component';
import { Customer } from '../../../pages/apps/aio-table/interfaces/customer.model';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
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
export class ShipmentsComponent {
shipments = []

  // tableColumns: TableColumn<Order>[] = [
  //   {
  //     label: '',
  //     property: 'status',
  //     type: 'badge'
  //   },
  //   {
  //     label: 'PRODUCT',
  //     property: 'name',
  //     type: 'text'
  //   },
  //   {
  //     label: '$ PRICE',
  //     property: 'price',
  //     type: 'text',
  //     cssClasses: ['font-medium']
  //   },
  //   {
  //     label: 'DATE',
  //     property: 'timestamp',
  //     type: 'text',
  //     cssClasses: ['text-secondary']
  //   }
  // ];
  // tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Users',
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
    },
    {
      name: 'Sessions',
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
    },
  ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  pageViewsSeries: ApexAxisChartSeries = [{
    name: 'Page Views',
    data: [405, 800, 200, 600, 105, 788, 600, 204]
  }];

  uniqueUsersSeries: ApexAxisChartSeries = [{
    name: 'Unique Users',
    data: [356, 806, 600, 754, 432, 854, 555, 1004]
  }];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    },
    colors: ['#ff9800']
  });
  // dialog: any;
  // customers: any;
  // subject$: any;
  // selection: any;
  // dataSource: any;


  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'SKU', property: 'sku', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Description', property: 'description', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Category', property: 'category', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Contact', property: 'contact', type: 'button', visible: false },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new UntypedFormControl();
  filteredShipments = [];

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,private pr:ProductService,private router: Router,) {
    this.searchCtrl.valueChanges.subscribe(searchText => {
      if (searchText.trim() === '') {
        this.filteredShipments = this.shipments;
      } else {
        this.filteredShipments = this.shipments.filter(shipment =>
          shipment.shipping_number.includes(searchText) ||
          shipment.customer_c.includes(searchText) ||
          shipment.shipto_phone.includes(searchText) ||
          shipment.shipto_code.includes(searchText)
        );
      }
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(aioTableData.map(customer => new Customer(customer)));
  }

  ngOnInit() {
    this.pr.getShipment().subscribe((res) => {
      console.log(res.data.fieldData.fieldData);
      this.shipments = res.data.fieldData.fieldData;
      this.dataSource.data = this.shipments;
      this.filteredShipments = this.shipments
      localStorage.setItem("shipments",JSON.stringify(this.shipments))
    });
    
    this.getData().subscribe(customers => {
      this.customers = customers;
    });
    
    this.dataSource = new MatTableDataSource();
    
    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.unshift(new Customer(customer));
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: Customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Customer(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(customer: Customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => this.deleteCustomer(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }
  shipmentDetails(id){
    const url = `pages/shipments/${id}`;
    location.href = url;
  }
}


