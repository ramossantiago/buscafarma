import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen/imagen';
import { ImagenMiniaturaPipe } from './imagen-miniatura/imagen-miniatura';
@NgModule({
	declarations: [ImagenPipe,
    ImagenMiniaturaPipe],
	imports: [],
	exports: [ImagenPipe,
    ImagenMiniaturaPipe]
})
export class PipesModule {}
