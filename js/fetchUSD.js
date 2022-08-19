const fetchExRate = async () => {
    
    try{
        const datos = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        const resultados = await datos.json()
        return Number(resultados[1].casa.venta.replace(",",".")) 
    }
    catch (error) {
        console.log(error)
    }
}



const actualizarArrayUSD = async () => {
    const cotizacionAlgo = await fetchExRate()

    productos.forEach(el => {
        el.precioUSD = (el.precio/cotizacionAlgo).toFixed(2)
    })
}