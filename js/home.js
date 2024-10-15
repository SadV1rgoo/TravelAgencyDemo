let bestSellers = []
window.addEventListener('load', () => {
    getHome();
});

async function getHome() {
    await $.ajax({
        type: "GET",
        url: conf.api + 'getHome',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': conf.apikey
        },
        success: function(data) {
            bestSellers = data.masvendidos;
            carrousel = data.banner;
            loadBestSellers();
            loadCarrusel();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error al obtener datos");
        }
    });
}

async function loadBestSellers() {
    console.log("Mejores vendedores:", bestSellers); // Datos de API, obteniendo la info. y recursos de los mejores vendidos

    let slides = [];
    for (let i = 0; i < bestSellers.length; i++) {
        const item = bestSellers[i];
        if (item.imagen != null && item.imagen != "") {
            let html = '<div class="swiper-slide position-relative">'; 
            html += '<img class="img-fluid" src="'+item.imagen+'" alt="paquete">';
            html += '</div>';
            slides.push(html);
        }
    }

    const carrouselDOM = document.querySelector("#best-sellers");
    carrouselDOM.innerHTML = slides.join('');  

    // Inicializar Swiper
    setTimeout(() => {
      const swiper3 = new Swiper(".slider-3", {
        autoHeight: true,
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        },
        pagination: {
          el: ".custom-pagination",
        },
      });
    }, 100);  
}
