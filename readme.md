# 🚀 Automação de Testes | Portfólio QA

[![Allure Report](https://img.shields.io/badge/Allure_Report-View_Live-brightgreen?logo=allure)](https://entonymaxwell01.github.io/testes-projeto-tcc/)

Este repositório consolida uma estratégia de qualidade de software aplicada a um ecossistema real e completo (Sistema de Gestão de Testes/TCC).

Fugindo de scripts frágeis em sites públicos de demonstração, este projeto utiliza uma aplicação _Full-Stack_ própria (React + Node.js/Prisma) como alvo. Isso garante um ambiente determinístico e demonstra domínio sobre a arquitetura do software, isolamento de dados e engenharia de testes contínuos.

## 🎯 Camadas de Validação e Stack Tecnológica

- **Testes de API (Postman & Newman):** Validação de contratos, _status codes_ e tempo de resposta. A suíte opera de forma encadeada (CRUD completo), utilizando herança de tokens JWT dinâmicos e limpeza de banco autônoma para não gerar lixo de dados.
- **Testes E2E (Playwright):** Automação do caminho crítico da interface gráfica aplicando estritamente o padrão de projeto _Page Object Model (POM)_ e localizadores blindados via `data-testid`. Geração de massa de dados dinâmica utilizando Faker.js para evitar cenários viciados.
- **Testes de Performance (k6):** Scripts de _Load_ e _Spike Testing_ configurados com _thresholds_ para validar a estabilidade e mapear gargalos de infraestrutura nas rotas do backend.
- **CI/CD & Relatórios:** Pipeline completa estruturada com GitHub Actions, orquestrando a subida do backend e banco de dados, reset de massa, execução dos testes (API, UI e Performance) e publicação contínua do relatório de qualidade no [GitHub Pages](https://entonymaxwell01.github.io/testes-projeto-tcc/).

## 📊 Engenharia de Performance e Observabilidade (k6 + Grafana + InfluxDB)

A estabilidade da aplicação sob estresse é validada com **k6**. Os limites de aceitação (Thresholds) estão configurados na esteira de CI/CD para impedir degradação, garantindo que o tempo de resposta em P95 seja inferior a 500ms e a taxa de falha seja menor que 1%.

A infraestrutura de observabilidade foi totalmente conteinerizada (Docker), permitindo a ingestão de métricas em tempo real no banco de séries temporais (**InfluxDB**) e a visualização executiva através de um dashboard customizado no **Grafana**.

<div align="center">
  <img src="./assets/grafana-dashboard.png" alt="Grafana Dashboard k6" width="100%">
  <br>
  <em>Dashboard de Performance em tempo real comprovando a estabilidade da API sob carga com zero falhas.</em>
</div>
