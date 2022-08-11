let datosComprador = JSON.parse(window.localStorage.getItem("datos del comprador"))
let productosCompra = JSON.parse(window.localStorage.getItem("productos en carrito"))
console.log(datosComprador)
console.log(productosCompra)

const popularFactura = () => {
    document.body.innerHTML = `<div>
    <table class="body-wrap">
        <tbody>
            <tr>
                <td class="container">
                    <div class="content">
                        <table class="main" width="100%" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="content-wrap aligncenter">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td class="content-block">
                                                        <h2>¡Gracias por su compra!</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        <table class="invoice">
                                                            <tbody>
                                                                <tr class="d-flex flex-column">
                                                                    <td id="nombre">Anna Smith</td>
                                                                    <td id="fecha">June 01 2015</td>
                                                                    <td>Detalles de la factura:</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table class="invoice-items" cellpadding="0" cellspacing="0" id="listaProductos">
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>    
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        <a href="#" id="linkVolverInicio">Seguir comprando</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        Mitienda Inc. 3314 Buenos Aires, Argentina
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="footer">
                            <table width="100%">
                                <tr>
                                    <td class="aligncenter content-block">Preguntas? Email <a href="mailto:">mitienda@company.com</a></td>
                                </tr>
                            </table>
                        </div></div>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</div>`
}


const modificarDatos = () => {
    let nombre = document.getElementById("nombre")
    let fecha = document.getElementById("fecha")
    let montoTotal = document.getElementById("total")
    let listaProductos = document.getElementById("listaProductos")
    let totalToString = productosCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    let totalCantidad = productosCompra.reduce((acc, el) => acc + el.cantidad, 0)

    nombre.innerHTML = `${datosComprador.nombre} ${datosComprador.apellido}`
    fecha.innerHTML = datosComprador.fecha
    console.log(productosCompra)

    productosCompra.forEach(el => {
        let newTR = document.createElement("tr")
        let firstTD = document.createElement("td")
        let secondTD = document.createElement("td")
        let thirdTD = document.createElement("td")
        let totalPorProducto = el.precio * el.cantidad
        let precioToString = totalPorProducto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        
        thirdTD.classList = "alignright"
        
        
        
        firstTD.innerHTML = el.nombre
        secondTD.innerText = el.cantidad
        thirdTD.innerText = `$ ${precioToString}`
        
        listaProductos.appendChild(newTR)
        newTR.appendChild(firstTD)
        newTR.appendChild(secondTD)
        newTR.appendChild(thirdTD)
        console.log(thirdTD)
    })
    let totalRow = document.createElement("tr")
    totalRow.classList = "total"
    totalRow.innerHTML = `  <td>Total</td>
                            <td>${totalCantidad}</td>
                            <td class="alignright" id="total">$ ${totalToString}</td>`
    listaProductos.appendChild(totalRow)

    
}

popularFactura()

modificarDatos()


const borrarLocalStorage = () => {
    window.localStorage.clear()
}


let volverInicio = document.getElementById('linkVolverInicio')

volverInicio.addEventListener("click", () => {
    borrarLocalStorage()
    window.location.replace("/index.html")
})