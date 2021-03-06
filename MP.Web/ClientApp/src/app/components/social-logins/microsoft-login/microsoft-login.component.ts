import { Component, OnInit, Inject } from '@angular/core';
import { BaseLoginComponent } from '../base-login.component';
import { PwaHelper } from '../../../helpers/pwa.helper';

@Component({
  selector: 'app-microsoft-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.scss']
})
export class MicrosoftLoginComponent extends BaseLoginComponent implements OnInit {
  constructor(@Inject('EXTERNAL_URL') externalUrl: string, pwaHelper: PwaHelper) {
    super(externalUrl, 'Microsoft', pwaHelper);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dispose();
  }
}
