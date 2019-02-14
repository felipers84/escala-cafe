import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'escala-cafe';

  duplas = [

    'Paulo Guyss / Tenylson',
    'Marcela / Itaquera',
    'Cleiton / PauLoL',
    'Renato / Claudius',
    'Gilson / Vismar',
    'Andrew / Shiba',
    'Felipe Campos / Armando',
    'Tibério / Itaquera'
  ];

  escala: Array<[Date, String]>;

  projetarEscala(dataInicial: Date, dataFinal: Date, equipeInicial: string) {
    let ponteiroData = dataInicial;
    let retorno = new Array<[Date, String]>();
    let ponteiroEquipe = this.duplas.indexOf(equipeInicial);
    while (ponteiroData <= dataFinal) {
      if ([0, 1, 2, 3].find(diaSemana => diaSemana === ponteiroData.getDay())) {
        retorno.push([ponteiroData, this.duplas[ponteiroEquipe]]);
        ponteiroEquipe++;
        if (ponteiroEquipe === this.duplas.length) {
          ponteiroEquipe = 0;
        }
      }
      ponteiroData.setDate(ponteiroData.getDate() + 1);
    }
    this.escala = retorno;
  }

  ngOnInit() {
    let dataFinal = new Date();
    dataFinal = dataFinal.setDate(new Date().getDate() + 100);
    this.projetarEscala(new Date(), dataFinal, 'Renato / Claudius');
  }


}
