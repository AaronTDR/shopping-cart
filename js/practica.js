// Esta práctica es hecha por mi utilizando el proyecto 2 terminado solo como guían en aalgunas ocasiones, resaltando la parte de local storage

//Variables
const carrito=document.getElementById('carrito');
const cursos=document.getElementById('lista-cursos');
const borrarTodoBTN=document.getElementById('vaciar-carrito');
const listaCarrito=document.querySelector('#lista-carrito tbody');



//Evenalisteners
eventListeners();

function eventListeners(){
     cursos.addEventListener('click', seleccionarDatosCurso);

     document.addEventListener('DOMContentLoaded', imprimirLocalStorageDOM);

     carrito.addEventListener('click', eliminarDatosCarritoDOM);

     borrarTodoBTN.addEventListener('click',vaciarCarrito);

}



// Funciones

// seleciona los datos del curso, en este caso <div> card
function seleccionarDatosCurso(e){
     e.preventDefault();
     let infoCard;
// condicion para indentificar botón agregar carrito
     if(e.target.classList.contains('agregar-carrito')){
// paso datos de la etiqueta div con clase card a la variable infoCard
          infoCard=e.target.parentElement.parentElement;

     }
// se otorgan datos a la funcion por medio de la variable
     ObtenerDatosCard(infoCard);
}


// obtener los datos del <div> card seleccionado
function ObtenerDatosCard(dato){
     let datosObjeto;
     datosObjeto={
          imagen:dato.querySelector('img').src,
          titulo:dato.querySelector('h4').textContent,
          precio:dato.querySelector('.precio span').textContent,
          id:dato.querySelector('a').getAttribute('data-id')

     }
 // se otorgan datos a la funcion por medio de la variable
     imprimirDatosEnCarrito(datosObjeto);

}

// se imprimen los datos en el carrito mediante el DOM
function imprimirDatosEnCarrito(dato){
     let cursoEnCarrito;
     cursoEnCarrito=document.createElement('tr');
     cursoEnCarrito.innerHTML=`
          <td><img src="${dato.imagen}"width=100></td>
          <td>${dato.titulo}</td>
          <td>${dato.precio}</td>
          <td><a href="#" class="borrar-curso" data-id="${dato.id}">X</a></td>
          
     `;

     listaCarrito.appendChild(cursoEnCarrito);
     pasarDatosLocalStorage(dato);

}


// eliminar datos del carrito en el DOM
function eliminarDatosCarritoDOM(e){
     e.preventDefault();

     // let eliminarDato;
     let dataID;

     dataID=e.target.getAttribute('data-id');
     
     // eliminarDato=e.target.parentElement.parentElement;

     if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove();
     }
     eliminarDatosLocalStorage(dataID);

}


// eliminar todos los cursos del carrito al dar click en el boton "vaciar carrito" 
function vaciarCarrito(){

     while(listaCarrito.firstChild){
          listaCarrito.removeChild(listaCarrito.firstChild);

     }
     limpiarLocalStorage()

}



//Local Storge 

// pasar datos a local storage
function pasarDatosLocalStorage(datosLSP){
     let datosLS;
     datosLS=verificarDatosLocalStorage();
     datosLS.push(datosLSP);
     localStorage.setItem('datos',JSON.stringify(datosLS));

}

// verifica si hay datos en local storage y retorna un arreglo
function verificarDatosLocalStorage(){
     let localStorageArray;
     if(localStorage.getItem('datos')===null){
          localStorageArray=[];
     }else{
          localStorageArray=JSON.parse(localStorage.getItem('datos'));
          }

          return localStorageArray;


}


// se imprime local storage en el DOM al refrescar la pagina
function imprimirLocalStorageDOM(){
     let datosLS=verificarDatosLocalStorage()
     datosLS.forEach(function(dato){
          let cursoEnCarrito;
          cursoEnCarrito=document.createElement('tr');
          cursoEnCarrito.innerHTML=`
               <td><img src="${dato.imagen}"width=100></td>
               <td>${dato.titulo}</td>
               <td>${dato.precio}</td>
               <td><a href="#" class="borrar-curso" data-id="${dato.id}">X</a></td>
               
          `;
          listaCarrito.appendChild(cursoEnCarrito);
     })

}



// eliminar datos de local store
function eliminarDatosLocalStorage(id){
     let borrarLocalStorage;
     
     borrarLocalStorage=verificarDatosLocalStorage();
     
     borrarLocalStorage.forEach(function(parametroForEach,index){
          
          if(id===parametroForEach.id){
               borrarLocalStorage.splice(index,1);
          }
     });

     localStorage.setItem('datos',JSON.stringify(borrarLocalStorage));
}


// limpiar local storge al presionar vaciar carrito
function limpiarLocalStorage(){
     localStorage.clear();
}