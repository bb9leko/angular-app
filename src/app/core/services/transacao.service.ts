import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transacao } from '../services/transacao';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:8081/transacao/listaTransacoes';
  
  listar(): Observable<Transacao[]> { 
    return this.http.get<Transacao[]>(this.apiUrl);
   }
  //criar(transacao: Transacao): Observable<Transacao> { /*...*/ }
  //editar(transacao: Transacao): Observable<Transacao> { /*...*/ }
  //excluir(id: number): Observable<Transacao> { /*...*/ }
  //buscarPorId(id: number): Observable<Transacao> { /*...*/ }

}
