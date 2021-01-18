verEnviar();

async function verEnviar(){
    let ingresoRec = localStorage.getItem("Ingreso");
    var ingreso = JSON.parse(ingresoRec);
    document.querySelector("#datosEnviar").innerHTML += `<hr></br><img src="${ingreso.links[0].href}">`
    document.querySelector("#datosEnviar").innerHTML += `<p align="justify"> ${ingreso.data[0].description}<br/><br/><hr>`
}

function enviarRespuestas(){
    var men = document.getElementById("mensaje").value;
    var eD = document.getElementById("emailD").value;
    if( validarEmail(eD)  ){
        /*si la validación de los campos es exitosa, se debe
abrir el gestor de correo asociado al navegador del usuario, con el email listo para ser enviado.*/
        c = confirm('Se abrira su gestor de correos');
        var cuerpoMail = localStorage.getItem("Ingreso");
        var imagen = JSON.parse(cuerpoMail);
        var imagenMail = `${imagen.links[0].href}`;
        var descripcionMail = `${imagen.data[0].description + " MENSAJE: " + men}`
        /*mailfrom:${eE}? ... mail.send(eE);*/
        var mail = `mailto:${eD}?subject=Mira%20esta%20info%20de%20la%20nasa&body=${imagenMail}%0A%0A${descripcionMail}`;
        
        if(c == true){
            window.open (mail,"popup","width=600,heigth=600");
        }else{
            return false;
        }
    }
    else{
        if(eE== "" || eD== ""){
            if (eE== ""){
                document.querySelector("#emisorObligarotio").innerHTML = `<p class="obligatorio">Falto completar</p>`
            }
            if (eD== ""){
                document.querySelector("#destinatarioObligarotio").innerHTML = `<p class="obligatorio">Falto completar</p>`
            }
        }
        else{
            alert("Asegurese de haber ingresado los datos correctamente");
        }
    }
}

function quiereCancelar(){
    if (confirm("Desea volver a la página anterior?")) {
        window.location = 'javascript:window.history.back()';
    }
}

function validarEmail(correo) {
    var valid = emailSimbolos (correo);
    if (valid){
       return true;        
    } 
    else {
        return false;
    }
}

function emailSimbolos (correo) {
    return /\S+@\S+/.test(correo);
}