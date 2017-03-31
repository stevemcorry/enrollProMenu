import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

//Filters
import { ActionFilter } from './actionFilter';
import { ContactFilter } from './contactFilter';
import { Filter } from './filter';

//Pages
import { Actions } from '../pages/actions/actions';
import { Goals } from '../pages/goals/goals';
import { Pipeline } from '../pages/pipeline/pipeline';
import { Marketing } from '../pages/marketing/marketing';
import { More } from '../pages/more/more';
import { Messages } from '../pages/messages/messages';


//Modals
import { AddAction } from '../modals/add-action/add-action';
import { AddContact } from '../modals/add-contact/add-contact';
import { AddTags } from '../modals/add-tags/add-tags';
import { ChooseActionContact } from '../modals/choose-action-contact/choose-action-contact';
import { ChooseContacts } from '../modals/choose-contacts/choose-contacts';
import { EditContact } from '../modals/edit-contact/edit-contact';
import { EmailLogin } from '../modals/email-login/email-login';
import { FBLogin } from '../modals/fb-login/fb-login';
import { GoogleLogin } from '../modals/google-login/google-login';
import { LoginModal } from '../modals/login/login';
import { MarketOptions } from '../modals/market-options/market-options';
import { MarketDrip } from '../modals/market-drip/market-drip';
import { MarketEmail } from '../modals/market-email/market-email';
import { MarketSocial } from '../modals/market-social/market-social';
import { MarketText } from '../modals/market-text/market-text';
import { PipelineChoose } from '../modals/pipeline-choose/pipeline-choose';
import { SpecificAction } from '../modals/specific-action/specific-action';
import { SpecificProspect } from '../modals/specific-prospect/specific-prospect';

@NgModule({
  declarations: [
    MyApp,

    //Filters
    ActionFilter,
    ContactFilter,
    Filter,

    //Pages
    Actions,
    Goals,
    Marketing,
    More,
    Messages,
    Pipeline,

    //Modals
    AddAction,
    AddContact,
    AddTags,
    ChooseActionContact,
    ChooseContacts,
    EditContact,
    EmailLogin,
    FBLogin,
    GoogleLogin,
    LoginModal,
    MarketOptions,
    MarketDrip,
    MarketEmail,
    MarketSocial,
    MarketText,
    PipelineChoose,
    SpecificAction,
    SpecificProspect,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //Pages
    Actions,
    Goals,
    Marketing,
    More,
    Messages,
    Pipeline,

    //Modals
    AddAction,
    AddContact,
    AddTags,
    ChooseActionContact,
    ChooseContacts,
    EditContact,
    EmailLogin,
    FBLogin,
    GoogleLogin,
    LoginModal,
    MarketOptions,
    MarketDrip,
    MarketEmail,
    MarketSocial,
    MarketText,
    PipelineChoose,
    SpecificAction,
    SpecificProspect,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
