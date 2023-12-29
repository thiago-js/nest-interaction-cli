# NIC (Nest Interaction CLI)

## Sobre o Projeto

O NIC (Nest Interaction CLI) é uma ferramenta de linha de comando simples, porém poderosa, projetada para agilizar a criação de projetos baseados em templates de funções Lambda. Esta ferramenta facilita a padronização e a eficiência na inicialização de novos projetos, garantindo consistência e qualidade no desenvolvimento.

## Características

- **Criação Rápida**: Gere novos projetos Lambda em segundos.
- **Fácil de Usar**: Interface de linha de comando simples e intuitiva.
- **Opção de Detalhamento**: Use `-v` ou `--verbose` para um relatório detalhado dos arquivos gerados durante a criação do projeto.
- **Funcionalidade de Schema do Template**: Especifique um schema para personalizar a criação do seu projeto.

## Funcionalidade de Schema do Template

O NIC permite a especificação de um schema de template para a criação do projeto. Você pode usar um schema de duas maneiras:

1. **Schema Padrão**: Se um arquivo chamado `schema.txt` estiver presente no diretório atual, o NIC o usará automaticamente.
2. **Schema Personalizado**: Use a opção `-p` para especificar um caminho personalizado para o arquivo de schema. Por exemplo:
   ```bash
   nic create [nome-do-projeto] -p ./base/schema.txt
   ```

### Formato do Schema

O arquivo `schema.txt` deve seguir um formato específico, usando snake case para os nomes das propriedades e indicando os tipos de dados. Além disso, você pode marcar campos como opcionais usando um `?`. Aqui está um exemplo de como o schema pode ser estruturado:

```
country_uid: ?string
country: number
country_name: string
language_id: string
language_code: string
currency: string
iso_code: string
timezone: string
```

## Como Começar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão X.X ou superior)
- [Git](https://git-scm.com/)

### Instalação

```bash
# Clone este repositório
git clone https://github.com/thiago-js/nest-interaction-cli.git
# Vá para a pasta do projeto
cd nic
# Instale as dependências
npm install
# Link para usar globalmente
npm link
```

## Uso

```bash
# Para gerar um novo projeto Lambda
nic create [nome-do-projeto]
# Para um relatório detalhado dos arquivos gerados
nic create [nome-do-projeto] -v
# Para especificar um caminho personalizado para o schema
nic create [nome-do-projeto] -p ./base/schema.txt
# Para ajuda
nic --help
```

## Contribuições

:rocket: [thiago simao](thiago-js)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
