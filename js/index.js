let productos = [
    {id: 1, nombre: "Playstation 5", precio: 100000,  img: '/img/buzo.jpeg'},
    {id: 2, nombre: "Pelota de Futbol", precio: 1500, img: '/img/buzo.jpeg'},
    {id: 3, nombre: "Paleta de padel", precio: 45000, img: '/img/buzo.jpeg'},
    {id: 4, nombre: "Nintendo switch", precio: 56000, img: '/img/buzo.jpeg'}
]

let prodCarrito = []

function agregarProducto() {
    let agregarProdUsuario = prompt("Que producto queres agregar?").toLowerCase()
    console.log(agregarProdUsuario)

    let prodEncontrado = productos.find((el) => el.nombre.toLowerCase() == agregarProdUsuario)
    console.log(prodEncontrado)
    if (prodEncontrado) {
        prodCarrito.push(prodEncontrado)
        alert(`producto agregado`)
    } else {
        alert(`No existe ese producto`)
    }
}

function verCarrito() {
    console.log(prodCarrito)
}

function pagarTotal() {
    alert(`Total a pagar es de $ ${prodCarrito.reduce((acc, el) => acc + el.precio, 0)}`)
}