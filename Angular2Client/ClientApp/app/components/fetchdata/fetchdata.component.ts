import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TestService } from '../Services/testService.service';
@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html'),
    providers: [TestService]
})
export class FetchDataComponent implements OnInit{
    public forecasts: WeatherForecast[];
   
    constructor(http: Http, private testService: TestService) {
        http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json();
        });

   
    }

    ngOnInit() { this.testService.test(); }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
