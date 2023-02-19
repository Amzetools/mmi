import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class DeliveryDetailsComponent implements OnInit {
shipmentDetails = []
loopedDetails;
id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.id= this.route.snapshot.params['id']
    this.shipmentDetails  = JSON.parse(localStorage.getItem("shipments"))
    console.log("Details",this.shipmentDetails)
    const filteredDetails = this.shipmentDetails.filter(detail => detail.shipping_number === this.id);
    if (filteredDetails.length > 0) {
      console.log("Matching shipment details:", filteredDetails[0]);
      this.loopedDetails = filteredDetails[0]
      console.log(this.loopedDetails,"looped")
    } else {
      console.log("No shipment found with shipping number");
    }
  }

}
