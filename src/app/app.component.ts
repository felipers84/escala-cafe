import { Component, OnInit } from '@angular/core';

const GOOGLE_CALENDAR_URL = 'https://www.google.com/calendar/render';

// 'https://www.google.com/calendar/render?action=TEMPLATE&text=tetes&location=&details=&dates=20190221T040000Z/20190221T040000Z'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'escala-cafe';

  duplas = [
    'Paulo Guyss / Tenylson',
    'Junior',
    'Maurício / Itaquera',
    'Cleiton / PauLoL',
    'Renato / Claudius',
    'Gilson / Vismar',
    'Felipe Campos / Armando',
    'Tibério / Shiba',
    'Telles / Andrew',
    'Jônatas / Elielma'
  ];

  escala: Array<[Date, String]>;

  projetarEscala(dataInicial: Date, dataFinal: Date, equipeInicial: string) {
    let segundaFeira = this.pegarSegundaFeiraDaSemana(new Date());
    let ponteiroData = dataInicial;
    let retorno = new Array<[Date, String]>();
    let ponteiroEquipe = this.duplas.indexOf(equipeInicial);
    while (ponteiroData.setHours(0, 0, 0, 0) <= dataFinal.setHours(0, 0, 0, 0)) {
      if ([1, 2, 3, 4, 5].find(diaSemana => diaSemana === ponteiroData.getDay())) {
        if (ponteiroData >= segundaFeira) {
          retorno.push([new Date(ponteiroData), this.duplas[ponteiroEquipe]]);
        }
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
  pegarSegundaFeiraDaSemana = (data: Date) => {
    data = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    let segunda = data.getDate() - data.getDay() + (data.getDay() ? 1 : -6);
    return new Date(data.setDate(segunda));
  };
  gerarLinkGoogleCalendar = (data: Date, coitados: string) => {
    const addParam = (url, key, value, joinChar?) => `${url}${joinChar}${key}=${encodeURI(value).replace(/%20/g, '+')}`;
    const dataISO = (data: Date) => data.toISOString().replace(/[^\w\s]/gi, '').replace(/000Z$/g, 'Z');
    const inicio = data.setHours(7, 0, 0, 0) ? dataISO(data) : '';
    const fim = data.setHours(18, 0, 0, 0) ? dataISO(data) : '';
    const endereco = 'R. José Camacho, 585 - Olaria, Porto Velho - RO, 76801-330';

    let url = addParam(GOOGLE_CALENDAR_URL, 'action', `TEMPLATE`, '?');
    url = addParam(url, 'text', `Fazer o café! ${coitados}`, '&');
    url = addParam(url, 'dates', `${inicio}/${fim}`, '&');
    url = addParam(url, 'ctz', 'America/Porto_Velho', '&');
    url = addParam(url, 'details', `Ver a escala completa:  ${window.location.href}`, '&');
    url = addParam(url, 'location', endereco, '&');
    url = addParam(url, 'trp', `false`, '&');
    url = addParam(url, 'sf', `true`, '&');
    return url;
  };

  ngOnInit() {
    let dataFinal = new Date();
    dataFinal.setDate(new Date().getDate() + 365);
    this.projetarEscala(new Date(2019, 4, 23), dataFinal, 'Paulo Guyss / Tenylson');
  }


}
