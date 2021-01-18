let API_KEY = "xXsbtFrmxDdSaf5tzfD7IMU7HyHj4ADsrfLRoo0R"

traerImagenDia()

async function traerImagenDia(){
    let hoy = obtenerHoy();
    mandarRequestDiaApi(hoy)
}

function obtenerHoy(){
    let hoy = new Date();
    hoy = hoy.toISOString().slice(0,10);
    return hoy;
}

//Manda request a la api, y lo imprime
async function mandarRequestDiaApi(hoy){  
    let respuestaDia = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&date=${hoy}`);
    let data = await respuestaDia.json()
    if (data.url == undefined){
        document.querySelector("#autor").innerHTML = `<p>Aún estamos seleccionando la imagen del día, por favor intentelo más tarde</p></br></br></br></br> `
    }else{
        if (data.copyright == undefined){
            document.querySelector("#autor").innerHTML = `<p>Autor desconocido</p> `
        }else{
            document.querySelector("#autor").innerHTML = `<p>Foto tomada por ${data.copyright}</p> `
        }
        document.querySelector("#contenidoDia").innerHTML = `<img src= "${data.url}">`
        document.querySelector("#contenidoDia").innerHTML += `<p> ${data.explanation}</p>`
    }
}
