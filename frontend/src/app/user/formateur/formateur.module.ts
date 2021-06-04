import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { formateurRoutes } from './formateur.routing';

@NgModule({
    imports: [
      RouterModule.forChild(formateurRoutes),
    ]
})

export class FormateurModule {}
