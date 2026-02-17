import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'excluir-transacao/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'editar-transacao/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'busca-ativo',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'investimento-form',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'busca-ativo-consolidado',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'upload-dividendos',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];