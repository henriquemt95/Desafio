const lodash = require('lodash')

exports.timeline = async (request, response) => {
    try {
        let eventsComprou = []
        let contadorComprouProduto = 0
        let eventsComprouProduto = []
        let contadorComprou = 0
        let counterTimeline = 0;
        let counterProducts = 0;
        let objectTimeline = {}
        let products = []
        let timeline = []
        let countlouco = 0
        let productsarray = {}

        objectTimeline.products = products

        let events = request.body.events

        for (let i = 0; i < events.length; i++) {

            if (events[i].event === 'comprou-produto') {
                eventsComprouProduto[contadorComprouProduto] = events[i]
                contadorComprouProduto++
            }

            if (events[i].event === 'comprou') {
                
                eventsComprou[contadorComprou] = events[i]
                contadorComprou++
            }
        }



        for (let i = 0; i < eventsComprou.length; i++) {

            for (let j = 0; j < eventsComprou[i].custom_data.length; j++) {

                if (eventsComprou[i].custom_data[j].key === 'transaction_id') {

                    for (let k = 0; k < eventsComprouProduto.length; k++) {

                        for (let l = 0; l < eventsComprouProduto[k].custom_data.length; l++) {
            
                            if (eventsComprouProduto[k].custom_data[l].key === 'transaction_id') {
            
                                if (eventsComprou[i].custom_data[j].value === eventsComprouProduto[k].custom_data[l].value) {

                                    objectTimeline.timestamp = eventsComprou[i].timestamp
                                    
                                    objectTimeline.revenue = eventsComprou[i].revenue
                                    objectTimeline.transaction_id = eventsComprou[i].custom_data[j].value

                                    for( let z = 0; z < eventsComprou[i].custom_data.length; z++ ) {
                                        if(eventsComprou[i].custom_data[z].key === 'store_name') {
                                            objectTimeline.store_name = eventsComprou[i].custom_data[z].value
                                        }
                                    }
                                    for (let x = 0; x < eventsComprouProduto[k].custom_data.length; x++) {

                                        if (eventsComprouProduto[k].custom_data[x].key === 'product_name') {
                                          productsarray.name = eventsComprouProduto[k].custom_data[x].value
                                        }
                                    }

                                    for (let x = 0; x < eventsComprouProduto[k].custom_data.length; x++) {

                                    if(eventsComprouProduto[k].custom_data[x].key === 'product_price' ) {   
      
                                        
                                        productsarray.price = eventsComprouProduto[k].custom_data[x].value

                                    }

                                    objectTimeline.products[x] = productsarray

                                }
                                
                                    timeline[counterTimeline] = objectTimeline
                                    counterProducts++                                    
                                    counterTimeline++

                                }
                        }
            
                    }
            
                }
            }

        }

    }   

    return response.status(200).json({ msg: timeline })
     } catch (error) {
        console.log(error)
        return response.status(500).json({
            status: 500,
            msgStatus: 'Cadastro de funcionário falhou',
            fail: true,
            error
        })
    }
}
