## Sobre
O projeto consiste em um portal de vídeos que pode ser executado em infraestrutura própria ou servidores VPS. Inicialmente o projeto terá a capacidade de executar vídeos, áudios e com uma seção própria para notícias. Outra seção importante é uma dedicada a execução de música, onde arquivos com legenda podem ser exibidos de uma maneira que o usuário pode ver um preview das próximas linhas, tendo opções de animações simples.

## Começando
O projeto pode ser executado localmente através do Docker ou clone do repositório.

### Executando localmente
Para executar o projeto localmente é preciso fazer o clone do repositório em sua máquina. Os requisitos são:
* [Bun](https://bun.sh/docs/installation): Runtime JavaScript
* [Git](https://git-scm.com/downloads): Controle de versão para fazer o clone para sua máquina
* [PostgreSQL versão 16 ou superior](https://www.postgresql.org/download/): Sistema Banco de dados usado no projeto. Caso você prefira usar através do docker esse é o [link](https://hub.docker.com/_/postgres)
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/): esse pacote é necessário apenas para deploy ou para execução em infra própria. Também pode ser instalado através do docker

Após instalar o Bun é preciso fazer o clone desse repositório, você pode seguir exemplo:
Criar diretório do projeto:
```bash
mkdir -p ~/dev/uaitube
```

Ir para o diretório criado:
```bash
cd ~/dev/uaitube
```

Clonar projeto:
```bash
git clone git@github.com:vanduir-santana/uaitube.git . 
```

Se estiver executando pela primeira vez é preciso instalar as dependências:
```bash
# no diretório do projeto, execute
bun install
```

A partir desse ponto, sempre que precisar executar, basta digitar dentro do diretório do projeto
```bash
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) 

Esse projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar automaticamente e carregar [Geist](https://vercel.com/font).

## Deploy na sua própria infra ou em um VPS
Seguir os mesmos passos acima, porém instalar e configurar o Nginx como proxy reverso. A maioria dos planso de VPS dá suporte para instalação através do Docker, caso você ache mais apropriado.

## Deploy na Vercel

A maneira mais fácil de implantar seu app Next.js é usando a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

 Verificar a documentação [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
