import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Transacao } from '../services/transacao';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AtivosResultado, Item, Ativo } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl;
  private apiUrlTransacoes: string = environment.apiUrlTransacoes;
  //private readonly apiUrl = 'http://localhost:8081/transacao/listaTransacoes';
  
  listar(): Observable<Transacao[]> { 
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacao/listaTransacoes`);
  }

   inserirTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/transacao/insereTransacao`, transacao);
  }

  //buscar(valorDigitado: string): Observable<Item[]> {
  //  const params = new HttpParams().append('q', valorDigitado)
  //  return this.http.get<AtivosResultado>(this.apiUrlTransacoes, { params }).pipe(
  //    tap(retornoAPI => console.log('Fluxo do tap', retornoAPI)),
  //    map(resultado => resultado.items),
  //    tap(resultado => console.log('Fluxo após o map', resultado))
  //  )
  //}
  buscarAtivos(valorDigitado: string): Observable<Ativo[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<Ativo[]>(this.apiUrlTransacoes, { params }).pipe(
      tap(retornoAPI => console.log('Fluxo do tap', retornoAPI)),
      // Remova o map(resultado => resultado.items)
      tap(resultado => console.log('Fluxo após o map', resultado))
    );
  }

}
