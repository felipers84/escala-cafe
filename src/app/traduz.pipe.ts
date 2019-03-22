import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'traduz'} )
export class TraduzPipe implements PipeTransform {
  transform(value: string) {
    switch(value) {
      case 'Monday': return 'Segunda';
      case 'Tuesday': return 'Terça';
      case 'Wednesday': return 'Quarta';
      case 'Thursday': return 'Quinta';
      case 'Friday': return 'Sexta';
      // Vai que...
      case 'Saturday': return 'Sábado';
      case 'Sunday': return 'Domingo';
    }
    return value;
  }

}
