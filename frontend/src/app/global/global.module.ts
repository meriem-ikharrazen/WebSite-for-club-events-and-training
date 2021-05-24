import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalRoutes } from './global.routing';

@NgModule({
    imports: [
      RouterModule.forChild(GlobalRoutes),
    ]
})

export class GlobalModule {}
