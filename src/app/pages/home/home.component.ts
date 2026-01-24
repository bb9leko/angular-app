import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Estatísticas do dashboard (estas podem ser conectadas aos seus serviços)
  portfolioValue = 0;
  totalReturn = 0;
  monthlyDividends = 0;
  totalAssets = 0;

  constructor() {
    // Aqui você pode injetar seus serviços e carregar os dados reais
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // TODO: Implementar chamadas para seus serviços
    // Exemplo:
    // this.transacaoService.getPortfolioValue().subscribe(value => this.portfolioValue = value);
    // this.dividendosService.getMonthlyDividends().subscribe(dividends => this.monthlyDividends = dividends);
  }

  // Métodos utilitários para formatação
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatPercentage(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  }
}