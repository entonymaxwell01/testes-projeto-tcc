# 🚀 Automação de Testes Corporativos | Portfólio QA

Este repositório consolida uma estratégia de qualidade de software aplicada a um ecossistema real e completo (Sistema de Gestão de Testes/TCC). 

Fugindo de scripts frágeis em sites públicos de demonstração, este projeto utiliza uma aplicação *Full-Stack* própria (React + Node.js/Prisma) como alvo. Isso garante um ambiente determinístico e demonstra domínio sobre a arquitetura do software, isolamento de dados e engenharia de testes contínuos.

## 🎯 Camadas de Validação e Stack Tecnológica

*   **Testes de API (Postman & Newman):** Validação de contratos, *status codes* e tempo de resposta. A suíte opera de forma encadeada (CRUD completo), utilizando herança de tokens JWT dinâmicos e limpeza de banco autônoma para não gerar lixo de dados.
*   **Testes E2E (Playwright):** Automação do caminho crítico da interface gráfica aplicando estritamente o padrão de projeto *Page Object Model (POM)* e localizadores blindados via `data-testid`.
*   **Testes de Performance (k6):** Scripts de *Load Testing* configurados com *thresholds* para validar a estabilidade e mapear gargalos de infraestrutura nas rotas do backend.
*   **Business Driven Development (Robot Framework):** Validação de regras de negócio complexas focada na clareza e rastreabilidade utilizando sintaxe *Keyword-driven*.
*   **CI/CD & Relatórios:** (Em implementação) Execução automatizada via esteira do GitHub Actions com extração de métricas de qualidade e geração de evidências.