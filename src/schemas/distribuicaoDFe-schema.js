'use strict'

class DistribuicaoSchema {
  static montarSchema(options) {
    const distDFeInt = {
      tpAmb: options.tpAmb,
      cUFAutor: options.cUFAutor,
    }

    if (options.cnpj) {
      distDFeInt['CNPJ'] = options.cnpj
    } else {
      distDFeInt['CPF'] = options.cpf
    }

    if (options.ultNSU) {
      distDFeInt['distNSU'] = {
        ['ultNSU']: options.ultNSU,
      }
    } else if (options.chNFe) {
      distDFeInt['consChNFe'] = {
        ['chNFe']: options.chNFe,
      }
    } else {
      distDFeInt['consNSU'] = {
        ['NSU']: options.nsu,
      }
    }

    distDFeInt['@_xmlns'] = 'http://www.portalfiscal.inf.br/nfe'
    distDFeInt['@_versao'] = '1.01'

    return {
      nfeDistDFeInteresse: {
        nfeDadosMsg: {
          distDFeInt: distDFeInt,
        },
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe',
      },
    }
  }
}

module.exports = Object.freeze(DistribuicaoSchema)