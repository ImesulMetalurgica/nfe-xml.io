## Instalação

```sh
$ npm i xml-nfe.io
```

### Construtor

```js
new DistribuicaoDFe(config)
```

- `config` `<Object>`
  - `pfx` `<Buffer>` - [OPCIONAL] - Arquivo **.pfx**. Se o `pfx` não for informado, as propriedades `cert` e `key` passam a ser obrigatórias.
  - `passphrase` `<String>` - [OPCIONAL] - Senha do arquivo **.pfx**.
  - `cert` `<Buffer | String>` - [OPCIONAL] - Conteúdo do _cert.pem_. Essa propriedade fica obrigatória se o `pfx` não for informado.
  - `key` `<Buffer | String>` - [OPCIONAL] - Conteúdo do _key.pem_. Essa propriedade fica obrigatória se o `pfx` não for informado.
  - `cUFAutor` `<String>` - [OBRIGATÓRIO] - Código da UF do autor. Consulte a tabela [códigos UF](#códigos-uf).
  - `cnpj` `<String>` - [OPCIONAL] - CNPJ do interessado no DF-e. Se não informado um CNPJ, será obrigatório informar um CPF.
  - `cpf` `<String>` - [OPCIONAL] - CPF do interessado no DF-e. Se não informado um CPF, será obrigatório informar um CNPJ.
  - `tpAmb` `<String>` - [OBRIGATÓRIO] - Identificação de Ambiente. Informar `'1'` para **Produção** ou `'2'` para **Homologação**.
  - `options` `<Object>` - [OPCIONAL]
    - `requestOptions` `<AxiosRequestConfig>` - [OPCIONAL]
    - `httpsOptions` `<AgentOptions>` - [OPCIONAL]

### Consulta por ultNSU

| Campo    |   Tipo   | Tamanho | Descrição                      |
| :------- | :------: | :-----: | :----------------------------- |
| `ultNSU` | _string_ |  1-15   | Último NSU recebido pelo ator. |

#### Exemplo

```js
const { DistribuicaoDFe } = require('xml-nfe.io')
const fs = require('fs')

const distribuicao = new DistribuicaoDFe({
  pfx: fs.readFileSync('./certificado.pfx'),
  passphrase: 'senha',
  cnpj: '12345678901234',
  cUFAutor: '41',
  tpAmb: '2',
})

const consulta = await distribuicao.consultaUltNSU('000000000000000')

if (consulta.error) {
  throw new Error(consulta.error)
}

console.log(consulta)
```

### Consulta por chNFe

| Campo   |   Tipo   | Tamanho | Descrição                   |
| :------ | :------: | :-----: | :-------------------------- |
| `chNFe` | _string_ |   44    | Chave de acesso específica. |

#### Exemplo

```js
const { DistribuicaoDFe } = require('xml-nfe.io')
const fs = require('fs')

const distribuicao = new DistribuicaoDFe({
  pfx: fs.readFileSync('./certificado.pfx'),
  passphrase: 'senha',
  cnpj: '12345678901234',
  cUFAutor: '41',
  tpAmb: '2',
})

const consulta = await distribuicao.consultaChNFe('Chave NFE')

if (consulta.error) {
  throw new Error(consulta.error)
}

console.log(consulta)
```

### Consulta por NSU

| Campo |   Tipo   | Tamanho | Descrição                           |
| :---- | :------: | :-----: | :---------------------------------- |
| `NSU` | _string_ |  1-15   | Número Sequencial Único específico. |

#### Exemplo

```js
const { DistribuicaoDFe } = require('xml-nfe.io')
const fs = require('fs')

const distribuicao = new DistribuicaoDFe({
  pfx: fs.readFileSync('./certificado.pfx'),
  passphrase: 'senha',
  cnpj: '12345678901234',
  cUFAutor: '41',
  tpAmb: '2',
})

const consulta = await distribuicao.consultaNSU('000000000000049')

if (consulta.error) {
  throw new Error(consulta.error)
}

console.log(consulta)
```

## Manifestação do Destinatário

### Construtor

```js
new RecepcaoEvento(config)
```

- `config` `<Object>`
  - `pfx` `<Buffer>` - [OPCIONAL] - Arquivo **.pfx**. Se o `pfx` não for informado, as propriedades `cert` e `key` passam a ser obrigatórias.
  - `passphrase` `<String>` - [OPCIONAL] - Senha do arquivo **.pfx**.
  - `cert` `<Buffer | String>` - [OPCIONAL] - Conteúdo do _cert.pem_. Essa propriedade fica obrigatória se o `pfx` não for informado.
  - `key` `<Buffer | String>` - [OPCIONAL] - Conteúdo do _key.pem_. Essa propriedade fica obrigatória se o `pfx` não for informado.
  - `cnpj` `<String>` - [OPCIONAL] - CNPJ do interessado no DF-e. Se não informado um CNPJ, será obrigatório informar um CPF.
  - `cpf` `<String>` - [OPCIONAL] - CPF do interessado no DF-e. Se não informado um CPF, será obrigatório informar um CNPJ.
  - `tpAmb` `<String>` - [OBRIGATÓRIO] - Identificação de Ambiente. Informar `'1'` para **Produção** ou `'2'` para **Homologação**.
  - `timezone` `<String>` - [OPCIONAL] - Fuso horário do autor. É utilizado `'America/Sao_Paulo'` como valor padrão. Consulte a tabela [lista de timezones](#lista-de-timezones) válidos para o Brasil.
  - `options` `<Object>` - [OPCIONAL]
    - `requestOptions` `<AxiosRequestConfig>` - [OPCIONAL]
    - `httpsOptions` `<AgentOptions>` - [OPCIONAL]

### Enviar Lote de Eventos

| Campo                |   Tipo   | Tamanho | Descrição                                                                                                                                                |
| :------------------- | :------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idLote`             | _string_ |  1-15   | Identificador de controle do Lote de envio do Evento.                                                                                                    |
| `lote`               | _array_  |  1-20   | Lista de eventos para manifestação.                                                                                                                      |
| `lote.chNFe`         | _string_ |   44    | Chave de Acesso da NF-e vinculada ao Evento.                                                                                                             |
| `lote.tpEvento`      | _number_ |    6    | Código do evento: 210200 - Confirmacao da Operacao; 210210 - Ciencia da Operacao; 210220 - Desconhecimento da Operacao; 210240 - Operacao nao Realizada. |
| `lote.justificativa` | _string_ | 15-255  | Informar a justificativa do porque a operação não foi realizada, este campo deve ser informado somente no evento de Operação não Realizada.              |

#### Exemplo

```js
const { RecepcaoEvento } = require('xml-nfe.io')
const fs = require('fs')

const recepcao = new RecepcaoEvento({
  pfx: fs.readFileSync('./certificado.pfx'),
  passphrase: 'senha',
  cnpj: '12345678901234',
  tpAmb: '2',
})

const lote = [
  {
    chNFe: '41000000000000000000000000000000000000000040',
    tipoEvento: 210210,
  },
  {
    chNFe: '41000000000000000000000000000000000000000041',
    tipoEvento: 210240,
    justificativa: 'Não foi realizado a entrega correta dos itens da nota.',
  },
]

const manifestacao = await recepcao.enviarEvento({
  idLote: '1337',
  lote: lote,
})

if (manifestacao.error) {
  throw new Error(manifestacao.error)
}

console.log(manifestacao)
```

## Tabelas

### Códigos UF

|  UF  | cUF  | Estado                  |
| :--: | :--: | :---------------------- |
| `RO` | _11_ | **Rondônia**            |
| `AC` | _12_ | **Acre**                |
| `AM` | _13_ | **Amazonas**            |
| `RR` | _14_ | **Roraima**             |
| `PA` | _15_ | **Pará**                |
| `AP` | _16_ | **Amapá**               |
| `TO` | _17_ | **Tocantins**           |
| `MA` | _21_ | **Maranhão**            |
| `PI` | _22_ | **Piauí**               |
| `CE` | _23_ | **Ceará**               |
| `RN` | _24_ | **Rio Grande do Norte** |
| `PB` | _25_ | **Paraíba**             |
| `PE` | _26_ | **Pernambuco**          |
| `AL` | _27_ | **Alagoas**             |
| `SE` | _28_ | **Sergipe**             |
| `BA` | _29_ | **Bahia**               |
| `MG` | _31_ | **Minas Gerais**        |
| `ES` | _32_ | **Espírito Santo**      |
| `RJ` | _33_ | **Rio de Janeiro**      |
| `SP` | _35_ | **São Paulo**           |
| `PR` | _41_ | **Paraná**              |
| `SC` | _42_ | **Santa Catarina**      |
| `RS` | _43_ | **Rio Grande do Sul**   |
| `MS` | _50_ | **Mato Grosso do Sul**  |
| `MT` | _51_ | **Mato Grosso**         |
| `GO` | _52_ | **Goiás**               |
| `DF` | _53_ | **Distrito Federal**    |

### Lista de Timezones

|        timezone        | Estado                                 |   UTC    |
| :--------------------: | :------------------------------------- | :------: |
|   `America/Noronha`    | **Fernando de Noronha**                | _−02:00_ |
|  `America/Araguaina`   | **TO**                                 | _−03:00_ |
|    `America/Bahia`     | **BA**                                 | _−03:00_ |
|    `America/Belem`     | **AP, PA (leste)**                     | _−03:00_ |
|  `America/Fortaleza`   | **CE, MA, PB, PI, RN**                 | _−03:00_ |
|    `America/Maceio`    | **AL, SE**                             | _−03:00_ |
|    `America/Recife`    | **PE**                                 | _−03:00_ |
|   `America/Santarem`   | **PA (oeste)**                         | _−03:00_ |
|  `America/Sao_Paulo`   | **DF, ES, GO, MG, PR, RJ, RS, SC, SP** | _−03:00_ |
|  `America/Boa_Vista`   | **RR**                                 | _−04:00_ |
| `America/Campo_Grande` | **MS**                                 | _−04:00_ |
|    `America/Cuiaba`    | **MT**                                 | _−04:00_ |
|    `America/Manaus`    | **AM (leste)**                         | _−04:00_ |
| `America/Porto_Velho`  | **RO**                                 | _−04:00_ |
|   `America/Eirunepe`   | **AM (oeste)**                         | _−05:00_ |
|  `America/Rio_Branco`  | **AC**                                 | _−05:00_ |
