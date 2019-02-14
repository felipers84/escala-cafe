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
    while (ponteiroData.getDate() <= dataFinal.getDate()) {
      if ([1, 2, 3, 4, 5].find(diaSemana => diaSemana === ponteiroData.getDay())) {
        retorno.push([new Date(ponteiroData), this.duplas[ponteiroEquipe]]);
        ponteiroEquipe++;
        if (ponteiroEquipe === this.duplas.length) {
          ponteiroEquipe = 0;
        }
      }
      ponteiroData.setDate(ponteiroData.getDate() + 1);
    }
    this.escala = retorno;
  }

  formatarData = (data: Date) => `${(data.getDate())}/${data.getMonth() + 1}/${data.getFullYear()}`;
  dataInformadaEhDiaAtual = (data: Date) => (data.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0));

  ngOnInit() {
    let dataFinal = new Date();
    dataFinal.setDate(new Date().getDate() + 365);
    this.projetarEscala(new Date(2019, 1, 12), dataFinal, 'Marcela / Itaquera');
  }


}
