import { Component, OnInit } from '@angular/core';
import { ConsumerVo } from '../models/consumer-vo';
import { ConsumerService } from '../services/consumer.service';
import { SelectItem, MenuItem, Message, Growl, GrowlModule } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  consumersVo: ConsumerVo[];
  cols: any[];
  selectedConsumersVo: ConsumerVo[];
  selectedConsumerVo: ConsumerVo;
  contextItems: MenuItem[];
  yearFilter: number;
  yearTimeout: any;
  first: number = 0;
  types: SelectItem[];
  billTypes: SelectItem[];
  msgs: Message[];
  loading: boolean;
  leadOwnerUnique: SelectItem[];
  consumerUrl = environment.nactUiBaseUrl + "enactUI/partners/ajax/service_partner.html#page/service_partner/sp_lead_details_inner_content1?crn=";
  homePageUrl = environment.nactUiBaseUrl + "enactUI/partners/ajax/service_partner.html#page/sp_index";
  projectPageUrl = environment.nactUiBaseUrl + "enactUI/partners/ajax/service_partner.html#page/scheduler/s1";
  managePageUrl = environment.nactUiBaseUrl + "enactUI/partners/ajax/service_partner.html#page/franchisee/create_new_member";
  cookies: {};
  constructor(private consumerService: ConsumerService, private cookieService: CookieService) {
    
   }

  ngOnInit() {
   this.cookies = this.cookieService.getAll();
    
    this.loading = true;
    setTimeout(() => {
      this.consumerService.getListOfProjects()
    .subscribe(response => {
      this.consumersVo = response; 
      this.loading = false;
      this.extractLeadOwner();
    }
    );
      
    }, 1000);
    
      this.cols = [
        { field: 'c_fn', header: 'Customer Details' },
        { field: 'slo_fullname', header: 'Sales Lead Owner' },
        { field: 'sp_fn', header: 'Lead Owner' },
        { field: 'addr1', header: 'Street Address' },
        { field: 'city', header: 'City and State' },
        { field: 'crn', header: 'CRN' },
        { field: 'zip', header: 'Zip' },
        { field: 'bn', header: 'Company' },
        { field: 'c_phone', header: 'Phone Number' },
        { field: 'c_email', header: 'Email' },
        { field: 'status', header: 'Status' },
        { field: 'annual_electric_bill_i18n', header: 'Annul Electric Bill' },
        { field: 'bill_type', header: 'Bill Type' },
        { field: 'current_annual_consumption', header: 'Current Annual Consumption inkWh' },
        { field: 'lastupdate', header: 'Last Update' },
        { field: 'utilityName', header: 'Utility Name' },
        { field: 'rateName', header: 'Rate Name' },
        { field: 'type', header: 'Type' },
        { field: 'next_action_date', header: 'Next Action Date' },
        { field: 'create_i18n', header: 'Created Date' },
        { field: 'source', header: 'Lead Source' },
        { field: 'last_quote_amount', header: 'Last Quote' },
        { field: 'star_rating', header: 'Rating out of 5' }
    ];
    //this is hard coded as of now later we need to get every value from the response received from back end.
    this.types=[
      { label: 'All Types', value: null },
      { label: 'Residential', value: 'Residential' },
      { label: 'Commercial', value: 'Commercial' }
    ];
     //this is hard coded as of now later we need to get every value from the response received from back end.
     this.billTypes=[
      { label: 'Bill Types', value: null },
      { label: 'Annual', value: 'annual' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'Green', value: 'green' }
    ];
   
    this.contextItems = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewConsumer(this.selectedConsumerVo) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteSingleConsumer(this.selectedConsumerVo) }
  ];

 
  }
  // This method will extract the distinct lead owner.
  extractLeadOwner(){ 
    this.leadOwnerUnique = [];
   
    for (let index = 0; index < this.consumersVo.length; index++) {
      var item = <SelectItem>{};
      item.label = this.consumersVo[index].sp_fn;
      item.value = this.consumersVo[index].sp_fn;
      var bool = true;
      for (let j = 0; j < this.leadOwnerUnique.length; j++) {
        if(item.label === this.leadOwnerUnique[j].label){
          bool = false;
          break;
        }
      }
      if(bool){
        this.leadOwnerUnique.push(item);
      }
    }
  }

  viewConsumer(consumerVo: ConsumerVo) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Consumer Selected', detail: consumerVo.account_id + ' - ' + consumerVo.c_fn });
}

deleteSingleConsumer(consumerVo: ConsumerVo) {
  if (confirm("Are you sure you want to delete " + consumerVo.c_fn + "?")){
  var crnArray = [];
  crnArray.push(consumerVo.crn);
  let search = new URLSearchParams();
 
  let request = {"crn": crnArray}
 console.log(request);
  this.consumerService.deleteSingleConsumer(request)
    .subscribe(response => {
      let index = -1;
      for (let i = 0; i < this.consumersVo.length; i++) {
        if (this.consumersVo[i].crn == consumerVo.crn) {
            index = i;
            break;
        }
    }
    this.consumersVo.splice(index, 1);

    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Consumer Deleted', detail: consumerVo.account_id + ' - ' + consumerVo.c_fn });}
    );  
  }
  
}

  onRowSelect(event) {
    //this.selectedConsumersVo = event.data;
}

reset() {
  this.first = 0;
}
onYearChange(event, dt) {
  if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
  }

  this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'last_quote_amount', 'lt');
  }, 250);
}

}
