import { Component } from '@angular/core';
import * as formSchema from './triage.json';
import {
  QuestionFactory, Form, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, FormErrorsService
} from 'ng2-openmrs-formentry';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;
  schema: any;
  sections: {} = {};
  formGroup: FormGroup;
  activeTab = 0;
  form: Form;
  stack = [];
  public header: string = 'UMD Demo';
  constructor(private questionFactory: QuestionFactory,
    private formFactory: FormFactory, private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter, private dataSources: DataSources,
    private formErrorsService: FormErrorsService) {
    this.schema = formSchema;
    this.createForm();
  }
  title = 'app';
  createForm() {
    this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);

  }

  onSubmit($event) {

    $event.preventDefault();

    // Set valueProcessingInfo
    this.form.valueProcessingInfo = {
      patientUuid: 'patientUuid',
      visitUuid: 'visitUuid',
      encounterTypeUuid: 'encounterTypeUuid',
      formUuid: 'formUuid',
      encounterUuid: 'encounterUuid',
      providerUuid: 'providerUuid',
      utcOffset: '+0300'
    };

    if (this.form.valid) {

      this.form.showErrors = false;
      let payload = this.encAdapter.generateFormPayload(this.form);
      console.log('encounter payload', payload);

      // Alternative is to populate for each as shown below
      // // generate obs payload
      // let payload = this.obsValueAdapater.generateFormPayload(this.form);
      // console.log('obs payload', payload);

      // // generate orders payload
      // let ordersPayload = this.orderAdaptor.generateFormPayload(this.form);
      // console.log('orders Payload', ordersPayload);

    } else {
      this.form.showErrors = true;
      this.form.markInvalidControls(this.form.rootNode);
    }
  }
}
