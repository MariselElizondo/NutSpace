let API_KEY = "xXsbtFrmxDdSaf5tzfD7IMU7HyHj4ADsrfLRoo0R"

async function ver123(){
    let respuestaNum = await fetch(`https://api.nasa.gov/techport/api/projects?api_key=${API_KEY}`);
    let data = await respuestaNum.json()
    entradaNum = document.getElementById("buscarTermino123").value;
    var paraBusqueda = data.projects.projects[entradaNum].id;

    let respuestaProject = await fetch(`https://api.nasa.gov/techport/api/projects/${paraBusqueda}?api_key=${API_KEY}`);
    let data2 = await respuestaProject.json()
    //console.log(data2.project);
    var id= data2.project.id;
    var titulo = data2.project.title;
    var lastUpdated = data2.project.lastUpdated;
    var beneficios = data2.project.benefits;
    var descripcionProyecto = data2.project.description;
    var website = data2.project.website;
    var status = data2.project.status;
    if (investigador != null){
        if (investigador != ""){
            var investigador = data2.project.principalInvestigators[0];
        }
    }
    var locacion = data2.project.workLocations[0];
    document.querySelector("#contenidoEpico").innerHTML = `</br><p>Usted ingresó con el número ${entradaNum} al id de proyecto ${id}</p></br>`
    document.querySelector("#contenidoEpico").innerHTML += `<p><strong>Titulo del proyecto:</strong> ${titulo}</p>`
    document.querySelector("#contenidoEpico").innerHTML += `<p><strong>Ultima fecha de actualización:</strong> ${lastUpdated}</p>`
    document.querySelector("#contenidoEpico").innerHTML += `</br><p><strong>Beneficios:</strong> ${beneficios}</p></br>`
    document.querySelector("#contenidoEpico").innerHTML += `<p>${descripcionProyecto}</p>`
    if (website != null){
        if (website != ""){
            document.querySelector("#contenidoEpico").innerHTML += `<p>Sitio <a href="${website}">${website}</a></p>`
        }
    }
    document.querySelector("#contenidoEpico").innerHTML += `</br><p>- Investigador principal: ${investigador}</p>`
    document.querySelector("#contenidoEpico").innerHTML += `<p>- Estado de la investigación: ${status}</p>`
    document.querySelector("#contenidoEpico").innerHTML += `<p>- Locación principal: ${locacion}</p></br>`
    
}
