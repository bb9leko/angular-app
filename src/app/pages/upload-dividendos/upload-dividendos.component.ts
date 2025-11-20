// src/app/pages/upload-dividendos/upload-dividendos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DividendosService } from '../../core/services/dividendos.service';

@Component({
  selector: 'app-upload-dividendos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './upload-dividendos.component.html',
  styleUrl: './upload-dividendos.component.scss'
})
export class UploadDividendosComponent {
  arquivoSelecionado: File | null = null;
  nomeArquivo: string = '';
  uploading: boolean = false;
  uploadProgress: number = 0;

  constructor(
    private dividendosService: DividendosService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // Mudança para CSV
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      this.arquivoSelecionado = file;
      this.nomeArquivo = file.name;
      this.mostrarMensagem('Arquivo CSV selecionado com sucesso!', 'success');
    } else {
      this.mostrarMensagem('Por favor, selecione apenas arquivos CSV', 'error');
      this.limparArquivo();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Mudança para CSV
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        this.arquivoSelecionado = file;
        this.nomeArquivo = file.name;
        this.mostrarMensagem('Arquivo CSV selecionado com sucesso!', 'success');
      } else {
        this.mostrarMensagem('Por favor, selecione apenas arquivos CSV', 'error');
      }
    }
  }

  uploadArquivo(): void {
    if (!this.arquivoSelecionado) {
      this.mostrarMensagem('Por favor, selecione um arquivo primeiro', 'error');
      return;
    }

    console.log('Iniciando upload do arquivo:', this.arquivoSelecionado.name);
    console.log('Tamanho do arquivo:', this.arquivoSelecionado.size, 'bytes');

    this.uploading = true;
    this.uploadProgress = 0;

    // Simular progresso
    const progressInterval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 90) {
        clearInterval(progressInterval);
      }
    }, 200);

    this.dividendosService.uploadArquivo(this.arquivoSelecionado).subscribe({
      next: (response) => {
        clearInterval(progressInterval);
        this.uploadProgress = 100;
        setTimeout(() => {
          this.uploading = false;
          this.uploadProgress = 0;
          this.mostrarMensagem('CSV processado com sucesso!', 'success');
          this.limparArquivo();
        }, 500);
      },
      error: (erro) => {
        clearInterval(progressInterval);
        this.uploading = false;
        this.uploadProgress = 0;
        console.error('Erro no upload:', erro);
        
        // Tratamento específico de erro baseado na resposta
        const mensagemErro = erro.error?.message || erro.error || 'Erro ao processar CSV. Tente novamente.';
        this.mostrarMensagem(mensagemErro, 'error');
      }
    });
  }

  limparArquivo(): void {
    this.arquivoSelecionado = null;
    this.nomeArquivo = '';
    this.uploadProgress = 0;
    
    // Limpar o input file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private mostrarMensagem(mensagem: string, tipo: 'success' | 'error'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: tipo === 'success' ? 'snack-success' : 'snack-error'
    });
  }
}