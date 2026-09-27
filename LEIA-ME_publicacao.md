# Site Iolam Júnior Engenharia — pacote para publicação

Site estático (HTML/CSS/JS), sem banco de dados nem dependências externas. Fontes auto-hospedadas.

## Estrutura
- `index.html` — página inicial (escolha Construtora / Consultoria)
- `construtora.html`, `consultoria.html`, `contato.html`, `404.html`
- `assets/` — CSS, JS, imagens otimizadas (versões 800 px e 1600 px), fontes
- `sitemap.xml`, `robots.txt`, `llms.txt`, `site.webmanifest`, `favicon.ico`

## Como publicar no domínio ijengenharia.com
O Google Workspace não hospeda arquivos HTML próprios (o Google Sites não aceita este código).
Opções gratuitas que funcionam com o domínio comprado no Google:

1. **Firebase Hosting (Google)** — recomendado por ficar no ecossistema Google.
   `npm i -g firebase-tools` → `firebase login` → `firebase init hosting` (pasta pública = esta pasta, single-page = não)
   → `firebase deploy` → em "Hosting > Adicionar domínio personalizado" informar `ijengenharia.com` e criar os registros DNS indicados (no Google Domains / Squarespace Domains, ou onde o DNS estiver).
2. **Cloudflare Pages** ou **Netlify** — arrastar a pasta no painel, depois apontar o domínio (registros A/CNAME informados pelo painel).

Após publicar:
- Google Search Console: adicionar a propriedade `ijengenharia.com`, enviar `https://ijengenharia.com/sitemap.xml`.
- Criar o **Perfil da Empresa no Google (Google Business Profile)** com o mesmo nome, telefone e e-mail do site e o link do site — é o principal fator para "construtora em Fortaleza / Aquiraz / Eusébio / Maracanaú".
- Bing Webmaster Tools: importar da Search Console (alimenta o ChatGPT/Copilot).

## Como atualizar conteúdo
Os textos estão diretamente nos arquivos HTML. Para trocar uma foto, substitua o arquivo em `assets/img/` mantendo o nome
(versão grande até 1600 px e versão `-sm` até 800 px).
