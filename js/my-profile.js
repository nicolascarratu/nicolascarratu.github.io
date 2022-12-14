let usuarioLocal = localStorage.getItem('User')
let datosUser = {}
let datosUserByEmail = {}

//Si el usuario no está con la sesión iniciada, se redirige a la página de inicio para que pueda hacerlo.
if (usuarioLocal == null) {
    window.location = 'index.html'
}

//Función para mostrar los datos del usuario en pantalla. Como mínimo se va a mostrar su email, y si guardó
//previamente otros datos, también se mostrarán.
function datosUsuario() {
    let email = document.getElementById('emailUser')
    datosUserByEmail = JSON.parse(localStorage.getItem(usuarioLocal))


    if (datosUserByEmail.email == usuarioLocal) {
        document.getElementById('emailUser').value = datosUserByEmail.email
        document.getElementById('primerNombre').value = datosUserByEmail.name
        document.getElementById('primerApellido').value = datosUserByEmail.surname
        if (datosUserByEmail.middleName) {
            document.getElementById('segundoNombre').value = datosUserByEmail.middleName
        }
        if (datosUserByEmail.secondSurname) {
            document.getElementById('segundoApellido').value = datosUserByEmail.secondSurname
        }

        if (datosUserByEmail.phone) {
            document.getElementById('telUser').value = datosUserByEmail.phone
        }

        if (datosUserByEmail.photo) {
            document.getElementById('perfilPic').src  = datosUserByEmail.photo
        }

    }

    else {
        email.value = usuarioLocal

    }

}

//Guarda los datos del usuario en el local storage para poder mostrarlos luego de recargar la página.
function datosToLocal() {
    datosUser.name = document.getElementById('primerNombre').value
    datosUser.surname = document.getElementById('primerApellido').value
    datosUser.email = document.getElementById('emailUser').value

    if (document.getElementById('segundoNombre').value != undefined) {
        datosUser.middleName = document.getElementById('segundoNombre').value
    }

    if (document.getElementById('segundoApellido').value != undefined) {
        datosUser.secondSurname = document.getElementById('segundoApellido').value
    }

    if (document.getElementById('telUser').value != undefined) {
        datosUser.phone = document.getElementById('telUser').value
    }

    if (document.getElementById('perfilPic').src != 'img/img_perfil.png') {
        datosUser.photo = document.getElementById('perfilPic').src
        
    }
    
    if (usuarioLocal !== document.getElementById('emailUser').value) {
        localStorage.removeItem(usuarioLocal)
    }

    
    localStorage.setItem(datosUser.email, JSON.stringify(datosUser))
    localStorage.setItem('User', datosUser.email)

}

// Se encarga de guardar la imagen en el local storage.
function imgSelect() {
    document.getElementById('imgProfile').addEventListener('change', () => {
        const IMGREADER = new FileReader()
        IMGREADER.readAsDataURL(document.getElementById('imgProfile').files[0])
        IMGREADER.addEventListener('load', () => {
            const URLIMG = IMGREADER.result
            document.getElementById('perfilPic').src = URLIMG
            datosUser.photo = URLIMG
        })
    })
}

//Si a la hora de modificar los datos no están especificados 'nombre', 'apellido' y 'email', no se permitirá
//guardar los cambios.
function validacionForm() {
    var form = document.getElementById('cambiosUsuario')
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            datosToLocal()
        }

        form.classList.add('was-validated')
    }, false)
}

document.addEventListener('DOMContentLoaded', function () {
    validacionForm()
    datosUsuario()
    imgSelect()

})
