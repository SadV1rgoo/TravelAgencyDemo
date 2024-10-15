

//home.js

let bestSellers =[]
let recents = []
let carrousel =[]
let revista = '';
let portada = '';

window.addEventListener('load', ()=>{
    getHome();

});

async function getHome(){
    await $.ajax({
        type:"GET",
        url: conf.api+'getHome',
        headers:{
            'Content-Type':'aplication/json',
            'x-api-key':conf.apikey
        },
        success:function(data){
            bestSellers = data.masvendidos;
            recents = data.novedades;
            carrousel = data.banner;
            portada = data.portada;
            revista = data.revista;
            loadBestSellers();
            loadCarrusel();
            loadRecents();
            loadMagazine();

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("Error al obtener datos");
        }
    });
}
//loaadCarrusel 

async function loadBestSellers()
{
    let slides=[];
    for(let i = 0; i < loadBestSellers.length; i++){
        const item = bestSellers[i];
        if (item.imagen != nul && item.length.imagen != ""){
            html = '<div class ="service-item position-relative">'
            html += '<img class="img-fluid" src"'+item.imagen+'" alt="">'
            html += '<div class="service-text text-center p-4">'
            html += '<div class="w-100 bg white text-center p-4">'
            html +=    '<a class="btn btn-primary" href="viaje.html?tour='+item.viaje+'">Ver más detalles</a>'
            html+= '</div>'
            html+= '</div>'
            html+= '</div>'

            slides.push(html);
        }
    }
const carrouselDOM = document.querySelector("#best-sellers");
carrouselDOM.inner = slides.join('');


}
