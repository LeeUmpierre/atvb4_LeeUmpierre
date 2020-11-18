import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { ReviewComponent } from './review/review.component';
import { PassagemComponent } from './passagem/passagem.component';
import { HotelComponent } from './hotel/hotel.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {path: './localizacoes', component: LocalizacaoComponent},
  {path: './reviews', component: ReviewComponent},
  {path: './passagens', component: PassagemComponent},
  {path: './hoteis', component: HotelComponent},
  {path: './usuarios', component: UsuarioComponent},
  {path: '**', redirectTo: 'localizacoes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }