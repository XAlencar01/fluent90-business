# Fluent 90 · Business English

Sistema de aulas e treinos de inglês profissional para sair do básico e chegar a uma entrevista de emprego em inglês em 12 semanas. Feito primeiro para o celular.

## O que tem
- **Nivelamento** de 20 perguntas (A1 a C1)
- **Trilha de 12 semanas**: gramática aplicada ao trabalho, frases-chave com áudio, exercícios e tarefa de fala
- **Flashcards** com repetição espaçada (frases das aulas, phrasal verbs e vocabulário corporativo)
- **Shadowing, pronúncia e ditado** com correção automática da fala
- **Simulador de entrevista** com 15 perguntas reais e métricas (duração, palavras por minuto, vícios de linguagem)
- **Escrita** com prompt pronto para correção por IA
- **Erros clássicos de brasileiros** e guia de método e imersão

## Como rodar
Site estático, sem build e sem dependências.

- **Local (Windows):** dê dois cliques em `iniciar.bat` (precisa de Python) e abra `http://localhost:5500`.
- **Qualquer hospedagem estática** (Vercel, Netlify, GitHub Pages): publique a pasta como está; a entrada é `index.html`.

O reconhecimento de voz usa a Web Speech API e funciona em HTTPS no Chrome, Edge e Safari. O progresso fica salvo no navegador (`localStorage`); use **Perfil → Exportar/Importar** para levar de um aparelho para outro.

## Estrutura
```
index.html      página principal
css/style.css   estilos (tema claro e escuro, layout de celular)
js/data.js      conteúdo do curso (aulas, perguntas, frases)
js/app.js       app: rotas, treinos, voz, repetição espaçada
fluent90.html   versão para hospedar no claude.ai (com sincronização)
```
