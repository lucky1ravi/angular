import { Component, OnInit } from '@angular/core';
import { ConsumerVo } from '../models/consumer-vo';
import { ConsumerService } from '../services/consumer.service';
import { SelectItem, MenuItem, Message, Growl, GrowlModule } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {TreeNode} from 'primeng/primeng';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  consumersVo: ConsumerVo[];
  cols: any[];
  selectedConsumersVo: ConsumerVo[];
  selectedConsumersCrn: string[];
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

  //files: TreeNode[];
  selectedFiles: TreeNode[];
  uniqueFiles: TreeNode[];

  constructor(private consumerService: ConsumerService, private cookieService: CookieService) {
    
   }

  ngOnInit() {
    this.selectedConsumersCrn = [];
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
        { field: 'customerFirstName', header: 'Customer Details' },
        { field: 'saleLeadOwnerFullName', header: 'Sales Lead Owner' },
        { field: 'serviceProviderFirstName', header: 'Lead Owner' },
        { field: 'addr1', header: 'Street Address' },
        { field: 'city', header: 'City and State' },
        { field: 'crn', header: 'CRN' },
        { field: 'zip', header: 'Zip' },
        { field: 'bn', header: 'Company' },
        { field: 'customerPhone', header: 'Phone Number' },
        { field: 'customerEmail', header: 'Email' },
        { field: 'status', header: 'Status' },
        { field: 'annualElectricBillI18n', header: 'Annul Electric Bill' },
        { field: 'billtype', header: 'Bill Type' },
        { field: 'currentAnnualConsumption', header: 'Current Annual Consumption inkWh' },
        { field: 'lastupdate', header: 'Last Update' },
        { field: 'utilityName', header: 'Utility Name' },
        { field: 'rateName', header: 'Rate Name' },
        { field: 'type', header: 'Type' },
        { field: 'nextActionDate', header: 'Next Action Date' },
        { field: 'createI18n', header: 'Created Date' },
        { field: 'source', header: 'Lead Source' },
        { field: 'lastQuoteAmount', header: 'Last Quote' },
        { field: 'starRating', header: 'Rating out of 5' }
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
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteConsumer() }
  ];

 
  }
  // This method will extract the distinct lead owner.
  extractLeadOwner(){ 
    this.leadOwnerUnique = [];
    
    this.uniqueFiles = [];
    // var parent = <TreeNode>{};
    // parent.label = "Team Member";
    // parent.data = "Team Member";
    // parent.expanded = true;
    // parent.expandedIcon = "fa-folder-open";

    
    for (let index = 0; index < this.consumersVo.length; index++) {
      var item = <SelectItem>{};
      // var childran:  TreeNode;
      item.label = this.consumersVo[index].serviceProviderFirstName;
      item.value = this.consumersVo[index].serviceProviderFirstName;
      // childran.label = this.consumersVo[index].serviceProviderFirstName;
      // childran.data = this.consumersVo[index].serviceProviderFirstName;
      var bool = true;
      for (let j = 0; j < this.leadOwnerUnique.length; j++) {
        if(item.label === this.leadOwnerUnique[j].label){
          bool = false;
          break;
        }
      }
      if(bool){
        this.leadOwnerUnique.push(item);
        //children.push(childran);
        // this.uniqueFiles.push(childran);
      }
    }
    //parent.children = children;
  
  }

  viewConsumer(consumerVo: ConsumerVo) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Consumer Selected', detail: consumerVo.accountId + ' - ' + consumerVo.customerFirstName });
    
}

deleteConsumer() {
  console.log(this.selectedConsumersCrn.length);
  if(this.selectedConsumersCrn.length === 0){
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Please select at least one Consumer to delete.', detail: ''});
    return;
  }
 
  if (confirm("Are you sure you want to delete selected Consumer(s)?")){
  let request = {"crn": this.selectedConsumersCrn}
 console.log(request);
  this.consumerService.deleteConsumer(request)
    .subscribe(response => {
      let index = -1;
      for (let i = 0; i < this.consumersVo.length; i++) {
        for(let j=0; j< this.selectedConsumersCrn.length; j++){
          if (this.consumersVo[i].crn == this.selectedConsumersCrn[j]) {
            index = i;
            this.selectedConsumersCrn.splice(j,1);
            console.log(this.selectedConsumersCrn);
            break;
        }
        }
        this.consumersVo.splice(index, 1);
    }
   

    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Consumer(s) Deleted Successfully.', detail: ''});}
    );  
  }
  
}

  onRowSelect(event) {
    //alert(event.data.crn);
    this.selectedConsumersCrn.push(event.data.crn);
   console.log(this.selectedConsumersCrn);
}

onRowUnselect(event) {
  this.selectedConsumersCrn.forEach( (item, index) => {
    if(item === event.data.crn) this.selectedConsumersCrn.splice(index,1);
  });
  
  console.log(this.selectedConsumersCrn);
}

reset() {
  this.first = 0;
}
onYearChange(event, dt) {
  if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
  }

  this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'lastQuoteAmount', 'lt');
  }, 250);
}

}
