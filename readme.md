### Mostra Clima

Aplicação web que realiza a consulta de dados climáticos na [API Weatherstack ](https://weatherstack.com/) exibindo o resultado e persistindo o histórico de consultas em um back-end ASP .NET 5.0 com um banco de dados SQL Server

#### Tecnologias
- ASP .NET 5.0
- Entity Framework Core
- Swagger
- SQL Server 
- Axios
- Boostrap
- Azure

#### Utilização
- Gerar o banco de dados a partir da migration presente no diretório MostraClima.API com o comando abaixo
```bash
	dotnet ef database update
```
- Abrir a solution MostraClima.API.sln e executar o servidor IIS Express
- Abrir o arquivo index.html presente na pasta MostraClima.Web

#### Live Preview

Foi implementada uma versão do back-end na Azure [Mostra Clima API](https://mostraclima.azurewebsites.net) e uma versão do front-end no Github Pages [Mostra Clima Web](https://xilapa.github.io/MostraClima/), ambos totalmente funcionais e conectados

**ATENÇÃO** : Para o funcionamento correto da página é nescessário habilitar conteúdo misto (HTTP e HTTPS) nesta página dada a uma limitação do plano free da [API Weatherstack ](https://weatherstack.com/), neste link tem um tutorial rápido de como fazer isto.

[https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=pt-BR#task_FF297A08F66E47A588C14FD67C037B3A](https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=pt-BR#task_FF297A08F66E47A588C14FD67C037B3A)



