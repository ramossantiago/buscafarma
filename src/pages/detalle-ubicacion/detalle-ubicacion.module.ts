import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleUbicacionPage } from './detalle-ubicacion';

@NgModule({
  declarations: [
    DetalleUbicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleUbicacionPage),
  ],
})
export class DetalleUbicacionPageModule {}
