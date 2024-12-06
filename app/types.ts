export type VideoItem = {
  id: number;
  uaid: string;
  yid: string;
  titulo: string;
  descricao: string;
  duracao: string,
  letra_legenda: number;
}

export type VideoPage = {
  pags: number;
  linhas: VideoItem[];
}
