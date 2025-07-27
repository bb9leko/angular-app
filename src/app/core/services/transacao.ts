export interface Transacao {
  id?: number;
  dataEvento: string;
  corretora: string;
  classificacaoAtivo: string;
  ticket: string;
  compraOUVenda: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  valorTaxaLiquidacao: number;
  valorTaxasEmolumentos: number;    
  valorImpostos: number;
  outrosValoresCobrados?: number;
  valorCorretagem: number;
  valorTotalComCustosEDespesas: number;    
}