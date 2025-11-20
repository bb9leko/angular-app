import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dividendos } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class DividendosService {
  private apiUrl = `${environment.apiUrl}/api/dividendos`;

  constructor(private http: HttpClient) { }

  uploadArquivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    console.log('Enviando para:', `${this.apiUrl}/upload`);
    console.log('Arquivo:', file.name, file.size, file.type);
    
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      responseType: 'text'  
    });
  }

  listarDividendos(): Observable<Dividendos[]> {
    return this.http.get<Dividendos[]>(`${this.apiUrl}`);
  }
}