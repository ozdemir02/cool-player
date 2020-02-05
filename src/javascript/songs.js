document.addEventListener("DOMContentLoaded", () => {

    let Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";

    fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body: "grant_type=client_credentials",
        headers: {
            'Authorization': Base64,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.json())
    .then(json => {

    let accessToken = "Bearer "+ json.access_token;

        fetch('https://api.spotify.com/v1/playlists/5vjPjAUsOcqUNas90acSMg', {
            method: 'get',
            headers: {
                'Authorization': accessToken,
            }
        })
        .then(res => res.json())
        .then(tracks => {
            console.log(tracks.tracks.items)
            tracks.tracks.items.forEach(produkt => {
                console.log(produkt.track)
                document.querySelector(".main").innerHTML += `
                <div class="main__container">
                  <a class="container__anker" href="/player/?track=${produkt.track.id}">
                    <img src="${produkt.track.album.images[0].url}" class="container__background">
                    <h2 class="container__title">${produkt.track.name}</h2>
                    <h5 class="container__desc">${produkt.track.artists[0].name}</h5>
                    <img src="../assets/images/Footer-shadow.png" class="container__img">
                  </a>
                </div>
                `
            })
        })
    });
    
/*     const params = new URLSearchParams(document.location.search);
    const categoryName = params.get('category');
    console.log(categoryName);
    const manufacturerList = params.get('manufacturer');
    const mainElement = document.querySelector(".main__shop");
    const path = window.location.pathname.replace(/\//g,'');
    let spin = document.querySelector(".spin");
    let scroll = document.querySelector(".bodyScroll")

    document.querySelector(".main__url").textContent = `Home / ${document.location.pathname.replace(/\//g,'')} `
    document.querySelector(".form__title").textContent = categoryName */

/*     fetch(`https://accounts.spotify.com/authorize`)
    .then((respons) => respons.json())
        .then((resultat) => {
            setTimeout(function(){
                 spin.removeChild(document.querySelector(".spinner"))
                spin.remove()
                scroll.classList.remove("bodyScroll") 
             }, 1300);
            resultat.forEach(produkt => { 
                document.querySelector(".items__totalItems").textContent = resultat.length;
                const clone = mainElement.content.cloneNode(true);
                clone.querySelector(".card__info-link").href= `/${path.slice(0, -1)}/?sku=${produkt.sku}`;
                clone.querySelector(".figure__img").src = produkt.images;
                clone.querySelector(".products__title").innerText = produkt.make + " " + produkt.model;
                clone.querySelector(".products__subtitle").innerText = "£" + produkt.price;
                mainElement.appendChild(clone);
            });
        });    */ 
    });
