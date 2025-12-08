import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Transacao } from '../services/transacao';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ativo, AtivoConsolidado } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl;
  private apiUrlTransacoes: string = environment.apiUrlTransacoes;
  private apiUrlTransacoesConsolidado: string = environment.apiUrlTransacoesConsolidado;
  
  listar(): Observable<Transacao[]> { 
    return this.http.get<Transacao[]>(`${this.apiUrl}/listar/transacoes`);
  }

  inserirTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/transacao/insereTransacao`, transacao);
  }

  buscarAtivos(valorDigitado: string): Observable<Ativo[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<Ativo[]>(this.apiUrlTransacoes, { params }).pipe(
      tap(retornoAPI => console.log('Fluxo do tap', retornoAPI)),
      tap(resultado => console.log('Fluxo após o map', resultado))
    );
  }

  buscarAtivosConsolidado(): Observable<AtivoConsolidado[]> {
     return this.http.get<AtivoConsolidado[]>(this.apiUrlTransacoesConsolidado).pipe(
      tap(retornoAPI => console.log('Fluxo do tap', retornoAPI)),
      map(response => response || []),
      tap(resultado => console.log('Fluxo após o map', resultado))
    );
  }

  editarTransacao(transacao: Transacao): Observable<Transacao> {
    const url = `${this.apiUrl}/transacao/editarTransacao/${transacao.id}`;
    return this.http.put<Transacao>(url, transacao);
  }  

  excluirTransacao(id: number): Observable<Transacao> {
    const url = `${this.apiUrl}/transacao/excluirTransacao/${id}`;
    return this.http.delete<Transacao>(url);
  }

  buscarPorId(id: number): Observable<Transacao> {
    const url = `${this.apiUrl}/transacao/buscarTransacaoPorId/${id}`;
    return this.http.get<Transacao>(url);
  }

}
