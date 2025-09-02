export interface Ativo { 
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