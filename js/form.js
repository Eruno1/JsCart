const botonAtras = document.getElementById('atras')
const botonComprar = document.getElementById('enviar')
let datosComprador = []

botonAtras.addEventListener('click', () => {
    Swal.fire({
        title: 'Seguro que quieres volver atrás?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-1',
          denyButton: 'order-2',
        }
      }).then((result) => {
        result.isConfirmed && window.location.replace("/index.html")        
      })
})

botonComprar.addEventListener('click', () => {
    let name = document.getElementById('nombre').value
    let email = document.getElementById('direccionmail').value
    let surename = document.getElementById('apellido').value
    let province = document.getElementById('provincia').value
    let address = document.getElementById('direccionCalle').value
    let phone = document.getElementById('telefono').value
    console.log(nombre)
    let fechaDeCompra = new Date().toLocaleDateString('en-GB')
    let datosComprador = {nombre: name, mail: email, apellido: surename, provincia: province, direccion: address, telefono: phone, fecha: fechaDeCompra}

    window.localStorage.setItem("datos del comprador", JSON.stringify(datosComprador))

    if (name === "" || email === "" || surename === "" || address === "" || phone === "") {
      Swal.fire('Por favor, complete sus datos correctamente')
    } else {
      Swal.fire({
          title: '¡Gracias por confiar en nosotros!',
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
      })
      
      setTimeout(function () {
          window.location.replace("/pages/invoice.html");
       }, 2000);

    }

})
