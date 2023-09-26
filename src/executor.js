class Executor {
    // Letra a)
    static sumPerProperty(data) {
        let outputData = {}

        data.forEach(element => {
            const codigo_imovel = element.codigo_imovel
            const pagamento = Number(element.valor_do_pagamento)

            if(outputData[codigo_imovel]){
                outputData[codigo_imovel] += pagamento
            } else {
                outputData[codigo_imovel] = pagamento
            }
        })

        return outputData
    }

    // Letra b)
    static sumPerMonth(data) {
        let outputData = {}

        data.forEach(element => {
            const data_do_pagamento = element.data_do_pagamento.split('-')[1] + '/' + element.data_do_pagamento.split('-')[0]
            const pagamento = Number(element.valor_do_pagamento)

            if(outputData[data_do_pagamento]){
                outputData[data_do_pagamento] += pagamento
            } else {
                outputData[data_do_pagamento] = pagamento
            }
        })

        const sortedOutputData = Object.keys(outputData).sort((a, b) => {
            const a_month = Number(a.split('/')[0])
            const b_month = Number(b.split('/')[0])

            const a_year = Number(a.split('/')[1])
            const b_year = Number(b.split('/')[1])

            if(a_year < b_year){
                return -1
            } else if(a_year > b_year){
                return 1
            } else {
                if(a_month < b_month){
                    return -1
                } else if(a_month > b_month){
                    return 1
                } else {
                    return 0
                }
            }
        }).reduce((obj, key) => {
            obj[key] = outputData[key]
            return obj
        }, {})

        return sortedOutputData
    }

    // Letra c)
    static percentagePerPropertyType(data) {
        let outputData = {}

        const total = data.reduce((acc, curr) => {
            const tipo_imovel = curr.tipo_imovel
            const pagamento = Number(curr.valor_do_pagamento)

            if(outputData[tipo_imovel]){
                outputData[tipo_imovel] += pagamento
            } else {
                outputData[tipo_imovel] = pagamento
            }

            return acc + Number(curr.valor_do_pagamento)
        }, 0)

        outputData = Object.keys(outputData).reduce((obj, key) => {
            obj[key] = ((outputData[key] / total) * 100).toFixed(2) + '%'
            return obj
        }, {})
     
        return outputData

    }
}

module.exports = {
    Executor
}