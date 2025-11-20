export interface Ativo { 
    id: number,
    classificacaoAtivo: string;
    compraOUVenda: string;
    corretora: string;
    dataEvento: string;
    outrosValoresCobrados: number;
    quantidade: number;
    ticket: string;
    valorCorretagem: number;
    valorImpostos: number;
    valorTaxaLiquidacao: number;
    valorTaxasEmolumentos: number;
    valorTotal: number;
    valorTotalComCustosEDespesas: number;    
    valorUnitario: number;
}

export interface Item {
    ativo: Ativo;
}

export interface AtivosResultado { 
    items: Item[];
    totalItems: number
}

export interface AtivoConsolidado extends Ativo {
  quantidadeTotal: number;
  valorTotalConsolidado: number;
  precoMedio: number;
  numeroTransacoes: number;
}

export interface Dividendos {
  id?: number;
  produto: string;
  pagamento: string; 
  tipoEvento: string;
  quantidade: number;
  precoUnitario: number;
  valorLiquido: number;
}