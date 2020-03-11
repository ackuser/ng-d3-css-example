import { LineChartComponent } from './line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';


const routes: Routes = [
  { path: 'line', component: LineChartComponent },
  { path: 'bar', component: BarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
