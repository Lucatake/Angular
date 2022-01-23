import { Pipe, PipeTransform } from '@angular/core';

import { FiltroArrayPipe } from './filtro-array.pipe';

@Pipe({
  name: 'filtroArrayImpuro',
  //indicar pipe impuro
  pure: false
})
//para utilizar herança
export class FiltroArrayImpuroPipe extends FiltroArrayPipe {
}
