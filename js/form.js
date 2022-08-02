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
        // if (result.isConfirmed) {
        //     window.location.replace("/index.html");
        // }
        
      })
})

botonComprar.addEventListener('click', () => {
    let name = document.getElementById('nombre').value
    let email = document.getElementById('direccionmail').value
    let surename = document.getElementById('apellido').value
    let province = document.getElementById('provincia').value
    let address = document.getElementById('direccionCalle').value
    let phone = document.getElementById('telefono')
    console.log(nombre)
    let datosComprador = {nombre: name, mail: email, apellido: surename, provincia: province, direccion: address, telefono: phone}

    Swal.fire({
        title: '¡Gracias por confiar en nosotros!',
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false
    })
    
    setTimeout(function () {
        window.location.replace("/index.html");
     }, 2000);
})
