'use strict';
let stockProductos = [
    {id: 1,
        nombre: "Heladera Gafa",
        categoria: "heladeras",
        cantidad: 1,
        desc: "Heladera Gafa HGF357AW simil inox con freezer 281L 220V",
        precio: 95000,
        img: './images/heladeraGafa.jpg'},

        {id: 2,
        nombre: "heladera Patrick",
        categoria: "heladeras",
        cantidad: 1,
        desc: "Heladera Patrick HPK151M11 silver con freezer 388L 220V",
        precio: 98000,
        img: './images/heladeraPatrick.jpg'},

        {id: 3, 
        nombre: "Lavarropas Samsung", 
        categoria: "lavarropas", 
        cantidad: 1, 
        desc: "LAVARROPAS 7 KG CARGA FRONTAL 1000 RPM - SAMSUNG", 
        precio: 130000, 
        img: './images/lavarropasSamsung.jpg'},

        {id: 4, 
        nombre: "Lavarropas Whirpool", 
        categoria: "lavarropas", 
        cantidad: 1, 
        desc: "Lavarropas automático Whirlpool Supreme Care WLCF85 inverter blanco 8.5kg 220 V", 
        precio: 150000, 
        img: './images/lavarropasWhirpool.jpg'},

        {id: 5, 
        nombre: "TV Noblex 60", 
        categoria: "telvisores", 
        cantidad: 1, 
        desc: "SMART TV 4K 60 AI THINQ 60UP7750 HDR PROCESADOR A5 GEN4 - LG", 
        precio: 120000, 
        img: './images/tvNoblex60.jpg'},
            
        {id: 6, 
        nombre: "TV Samsung 50", 
        categoria: "telvisores", 
        cantidad: 1, 
        desc: "Smart Tv 50 Samsung Un50au7000gczb Uhd 4k Serie Au7000 Hdmi", 
        precio: 130000,  
        img: './images/tvSamsung50.jpg'},
];


let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
})

const botonVaciar = document.getElementById('vaciar-carrito');

botonVaciar.addEventListener('click', () => {
    localStorage.getItem('carrito');
    carrito.length = 0;
    actualizarCarrito();
})

const contenedorProductos = document.getElementById('contenedor-productos');

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');

    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let btn = document.createElement("button");
    let i = document.createElement("i");
    img.src = producto.img;
    img.alt = producto.nombre;
    h3.innerText = producto.nombre;
    p1.innerText = producto.desc;
    p2.innerText = `Categoría: ${producto.categoria}`;
    p3.className = "precioProducto";
    p3.innerText = `Precio: $${producto.precio}`;
    btn.id = `agregar${producto.id}`;
    btn.className = "boton-agregar";
    btn.innerText = "Agregar ";
    i.classList.add("fas", "fa-shopping-cart");
    btn.appendChild(i);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(btn);

    contenedorProductos.appendChild(div);
    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
    })
})

const cantidad = document.getElementById('cantidad');
const agregarAlCarrito = (prodEnCarrito) => {

    const existe = carrito.some (prod => prod.id === prodEnCarrito);

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodEnCarrito){
                prod.cantidad++
            }
        })
    } else { const item = stockProductos.find((prod) => prod.id === prodEnCarrito);
        carrito.push(item);
    }
    actualizarCarrito();
}

const eliminarProducto = (prodEnCarrito) => {
    const item = carrito.find((prod) => prod.id === prodEnCarrito);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
    console.log(carrito);
}

const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = '';
    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');

        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let span = document.createElement("span");
        let btn = document.createElement("button");
        let i = document.createElement("i");
        p.innerText = prod.nombre;
        p2.innerText = `Precio: $${prod.precio}`;
        p3.innerText = "Cantidad: ";
        span.className = "cantidad";
        span.innerText = prod.cantidad;
        btn.className = "boton-eliminar";
        btn.setAttribute("onclick", `eliminarProducto(${prod.id})`);
        i.classList.add("fas", "fa-trash-alt");
        p3.appendChild(span);
        btn.appendChild(i);
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(btn);

        contenedorCarrito.appendChild(div);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    })

    contadorCarrito.innerText = carrito.length;
    console.log(carrito);
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
}

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const botonAbrir = document.getElementById('boton-carrito');
const botonCerrar = document.getElementById('carritoCerrar');
const modalCarrito = document.getElementsByClassName('modal-carrito')[0];


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
});

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
});

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active');
});

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation();
});