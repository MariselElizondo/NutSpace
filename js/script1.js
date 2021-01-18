let API_KEY = "xXsbtFrmxDdSaf5tzfD7IMU7HyHj4ADsrfLRoo0R"
recientes= [];
num= "";
listas= "";
ara= "";

async function busquedasRecientes(){
    if ("recientes" in localStorage){
        document.querySelector("#recientep").innerHTML = `<h2>BUSQUEDAS RECIENTES</h2>`
        obtenerLocalStorage();
        document.querySelector("#recientep").innerHTML += `</br><button class="btrecientes" onclick="eliminarLocalStorage()"> ELIMINAR BUSQUEDAS RECIENTES</button> <br/><br/>`
    }else{
        document.querySelector("#recientep").innerHTML = `<p>Usted no tiene historial de busqueda</p></br> `
    }
}

async function filtro(){
    entrada = document.getElementById("buscarTermino").value;
    filtro2(entrada);
}

async function filtro2(entrada){
    document.querySelector("#contenido").innerHTML = "";
    let respuesta = await fetch(`https://images-api.nasa.gov/search?q=${entrada}`);
    let dataa = await respuesta.json();
    coleccionjson = dataa.collection.items;
    guardarLocalStorage(entrada);

    this.listas=coleccionjson;

    fImagen=false;fVideo=false;fAudio=false;
    var iii1 = document.getElementById("i1").checked;
    var vvv1 = document.getElementById("v1").checked;
    var aaa1 = document.getElementById("a1").checked;
    cont=0;
    if (iii1 ){
        fImagen= true;}
    if (vvv1 ){
        fVideo= true;}
    if (aaa1 ){
        fAudio= true;}

    for ( var i = 0; cont < 10; i++ ){
        if (coleccionjson[i] == null){
            break;
        }
        else{
            nasa_id = coleccionjson[i].data[0].nasa_id;
             grid= "#grid"+cont;
            
            if (coleccionjson[i].data[0].media_type == "image" && fImagen){
                document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
                document.querySelector(grid).innerHTML += `<hr></br><img src="${coleccionjson[i].links[0].href}">`
                len=coleccionjson[i].data[0].description.length;
                if (len<=2000){
                    document.querySelector(grid).innerHTML += `<p> ${coleccionjson[i].data[0].description}`
                }else{
                    str= coleccionjson[i].data[0].description;
                    var substr= str.substring(0, 2000);
                    document.querySelector(grid).innerHTML += `<p> ${substr}`
                    document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
                }
                document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${i})"><span class="icon-share2"></span> Compartir</a> </button> </br></br>`;    
                cont ++;
            }else if(coleccionjson[i].data[0].media_type == "video" && fVideo) {
                document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
                document.querySelector(grid).innerHTML += `<hr></br><video src="https://images-assets.nasa.gov/video/${nasa_id}/${nasa_id}~orig.mp4" controls></video>`
                len=coleccionjson[i].data[0].description.length;
                if (len<=2000){
                    document.querySelector(grid).innerHTML += `<p> ${coleccionjson[i].data[0].description}`
                }else{
                    str= coleccionjson[i].data[0].description;
                    var substr= str.substring(0, 2000);
                    document.querySelector(grid).innerHTML += `<p> ${substr}`
                    document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
                }
                document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${i})"><span class="icon-share2"></span> Compartir</a> </button> </br></br>`;    
                cont++;
            }else if(coleccionjson[i].data[0].media_type == "audio" && fAudio) {
                console.log(coleccionjson[i].data[0])
                document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
                document.querySelector(grid).innerHTML += `<hr><p> ${coleccionjson[i].data[0].title}`
                document.querySelector(grid).innerHTML += `</br><audio class="audio-for-speech" src="https://images-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~orig.mp3" controls></audio>` 
                len=coleccionjson[i].data[0].description.length;
                if (len<=2000){
                    document.querySelector(grid).innerHTML += `<p> ${coleccionjson[i].data[0].description}`
                }else{
                    str= coleccionjson[i].data[0].description;
                    var substr= str.substring(0, 2000);
                    document.querySelector(grid).innerHTML += `<p> ${substr}`
                    document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
                }
                document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${i})"><span class="icon-share2"></span> Compartir</a> </button> </br></br>`; 
                cont++;
            }
            if (cont >= 10){
                document.querySelector(grid).innerHTML += `</br><div class="secBusq"> <button id="mas" type="button" onclick="masColec(coleccionjson,fImagen,fVideo,fAudio,cont),cli()"> MAS </button> </div>`
            } 
        }
    }
};

async function masColec(coleccionjson, fImagen, fVideo, fAudio,cont){
    
    for ( var m = 10; m < coleccionjson.length; m++ ){
        nasa_id = coleccionjson[m].data[0].nasa_id;
        var grid= "#grid"+cont;
        if (coleccionjson[m].data[0].media_type == "image" && fImagen){
            document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
            document.querySelector(grid).innerHTML += `<hr></br><img src="${coleccionjson[m].links[0].href}">`
            len=coleccionjson[m].data[0].description.length;
            if (len<=2000){
                document.querySelector(grid).innerHTML += `<p> ${coleccionjson[m].data[0].description}`
            }else{
                str= coleccionjson[m].data[0].description;
                var substr= str.substring(0, 2000);
                document.querySelector(grid).innerHTML += `<p> ${substr}`
                document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
            }
            document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${m})"><span class="icon-share2"></span> Compartir</a> </button> </p></br>`;    
            cont ++;
        }else if(coleccionjson[m].data[0].media_type == "video" && fVideo) {
            document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
            var nasa_id = coleccionjson[m].data[0].nasa_id;
            document.querySelector(grid).innerHTML += `<hr></br><video src="https://images-assets.nasa.gov/video/${nasa_id}/${nasa_id}~orig.mp4" controls></video>`
            len=coleccionjson[m].data[0].description.length;
            if (len<=2000){
                document.querySelector(grid).innerHTML += `<p> ${coleccionjson[m].data[0].description}`
            }else{
                str= coleccionjson[m].data[0].description;
                var substr= str.substring(0, 2000);
                document.querySelector(grid).innerHTML += `<p> ${substr}`
                document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
            }
            document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${m})"><span class="icon-share2"></span> Compartir</a> </button> </p></br>`;    
            cont++;
        }else if(coleccionjson[m].data[0].media_type == "audio" && fAudio) {
            document.querySelector("#contenido").innerHTML += `<div id="grid${cont}" class="grid"></div>`
            var nasa_id = coleccionjson[m].data[0].nasa_id;
            document.querySelector(grid).innerHTML += `<hr></br><audio class="audio-for-speech" src="https://audio-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~orig.mp3" controls></audio>` 
            len=coleccionjson[m].data[0].description.length;
            if (len<=2000){
                document.querySelector(grid).innerHTML += `<p> ${coleccionjson[m].data[0].description}`
            }else{
                str= coleccionjson[m].data[0].description;
                var substr= str.substring(0, 2000);
                document.querySelector(grid).innerHTML += `<p> ${substr}`
                document.querySelector(grid).innerHTML += `<button id="mostrarMas" type="button" onClick="expandir(str,grid,len)">...Mostrar Mas </button> </p>`;
            }
            document.querySelector(grid).innerHTML += `</br><button id="compartir" type="button" > <a href="compartir.html" onClick="guardarNumero(${m})"><span class="icon-share2"></span> Compartir</a> </button> </p></br>`; 
            cont++;
        }
    }
}

async function cli(){
    $("#mas").slideToggle();
    $("#buscarDia").slideToggle(); 
}

async function cli2(){
    $("#recientep").slideToggle();
}

async function expandir(str, grid,len){
    var substr= str.substring(2000, len);
    document.querySelector(grid).innerHTML += `<p> ${substr}</p>`
}

function guardarLocalStorage(entrada){
    if (typeof (Storage) !== 'undefined'){

        let recoveredData = localStorage.getItem('recientes')
        if (recoveredData == null){
        }
        else{
            recientes.push(recoveredData);
        }
            recientes.push(entrada);
            localStorage.setItem("recientes", recientes);
    }
    else{
        console.log("SU NAVEGADOR NO SOPORTA API STORAGE");
    }
}

function obtenerLocalStorage(){
    if (typeof (Storage) !== 'undefined'){
        if ("recientes" in localStorage){
            let recientes2 = localStorage.getItem('recientes');
            arrayDeCadenas = recientes2.split(",");
            array2 = [];
            for (var ip=0; ip < arrayDeCadenas.length; ip++) {
            
                if (array2.includes(arrayDeCadenas[ip])){

                }else{
                    var ara = arrayDeCadenas[ip];
                    ara1=ara;
                    document.querySelector("#recientep").innerHTML += `<ul><li>-  ${arrayDeCadenas[ip]} -</li></ul><button id="botbusq" class="btrecientes" onclick="guardarAra('${ara1}')"> RELANZAR BUSQUEDA</button></br></br>` 
                    array2.push(arrayDeCadenas[ip]);
                }
            }
        } 
    }
    else{
        console.log("SU NAVEGADOR NO SOPORTA API STORAGE");
    } 
}

async function eliminarLocalStorage(){
    localStorage.clear();
    alert("Se han eliminado las busquedas antiguas");
    document.querySelector("#recientep").innerHTML = `<p></p>`                
}

async function eliminarDatoLocalStorage(objeto){
    localStorage.removeItem(objeto);
}            

function guardarEnviar(ingreso){
    //arreglar, por un extraño motivo agarra el ultimo siempre
    if (typeof(Storage) !== 'undefined'){
        var ingresoAEnviar = JSON.stringify(ingreso);
        localStorage.setItem("Ingreso", ingresoAEnviar);
        var ingresoGuardado = localStorage.getItem("Ingreso");
        var ingresoGuardado = JSON.parse(ingresoGuardado);
    }else{
        console.log("SU NAVEGADOR NO SOPORTA API STORAGE");
    }
}

async function guardarNumero(numero){
    this.num=numero;
    console.log(listas);
    lista= listas[num];
    guardarEnviar(lista);
}

async function guardarAra(lanzar){
    this.ara=lanzar;
    if (typeof(Storage) !== 'undefined'){
        var ingresoAEnviar = JSON.stringify(ara);
        localStorage.setItem("lanzar", ingresoAEnviar);
        var ingresoGuardado = localStorage.getItem("lanzar");
        var ingresoGuardado = JSON.parse(ingresoGuardado);
        let rec11 = localStorage.getItem('lanzar');
        document.querySelector("#inputPrincipal").innerHTML = `<input id="buscarTermino" type="text" value="${ara}" readonly >`
        stop;
    }else{
        console.log("SU NAVEGADOR NO SOPORTA API STORAGE");
    }
}

//$("#recientep").hide();