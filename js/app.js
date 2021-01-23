// variables
const carrito=document.getElementById('carrito');
const cursos=document.getElementById('lista-cursos');
const listaCursos=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.getElementById('vaciar-carrito');


// listeners
cargarEventListeners();

function cargarEventListeners(){
     cursos.addEventListener('click', comprarCurso);

     // evento para elimminar curso del carrito, llamada a la función eliminarCurso
     carrito.addEventListener('click', eliminarCurso);

     // evento para el botón vaciar carrito, que elimina todo el contenido del carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // al refrescar la página darte el contenido de local storage en el carrito
     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



// funciones
// Añadir curso al carrito
function comprarCurso(e){
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-carrito')){
          const curso=e.target.parentElement.parentElement;
         
          //  enviar datos del curso a leerDatosCurso()
          leerDatosCurso(curso);
     }
}

// lee los datos del curso enviados por comprarCurso()
function leerDatosCurso(curso){
     const infoCurso={
          imagen:curso.querySelector('img').src,
          titulo:curso.querySelector('h4').textContent,
          precio:curso.querySelector('.precio span').textContent,
          id:curso.querySelector('a').getAttribute('data-id')

     }
     insertarCarrito(infoCurso);
}

// muestra el curso en el carrito
function insertarCarrito(curso){
     const row=document.createElement('tr');
     row.innerHTML=`
     <td><img src="${curso.imagen}"width=100><td/> 
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          
     `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
}



// eliminar curso del carrito en el DOM
function eliminarCurso(e){
     e.preventDefault();

     let curso, cursoId;

     if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove();

          curso=e.target.parentElement.parentElement;

          cursoId=curso.querySelector('a').getAttribute('data-id');

     }
     eliminarCursoLocalStorage(cursoId);
}

// elimina todos los cursos del carrito en el DOM al dar click en el botón vaciar carrito
function vaciarCarrito(){
     // opcion lenta NO recomendada
     // listaCursos.innerHTML='';
     // opcion rápida SI recomendada
     while(listaCursos.firstChild){
          listaCursos.removeChild(listaCursos.firstChild);
     }
//vaciar local storage al precionar el botón borrar carrito
     vaciarLocalStorage();

     // Este return es opcional, sirve para evitar un pequeño salto en la pagina que puede darse al precionar el botón vaciar carrito
     return false;
}

// almacena los cursos del carrito en local storage
function guardarCursoLocalStorage(curso){
     let cursos;
     // toma el valor retornado de la funcion obtenerCursosLocalStorage(), que retorna un arreglo
     cursos=obtenerCursosLocalStorage();
     // el curso se agrega al arreglo
     cursos.push(curso);
     localStorage.setItem('cursos', JSON.stringify(cursos));
}

// comprueba si ya hay información almacenada en local storage
function obtenerCursosLocalStorage(){
     let cursosLS;
     
     if(localStorage.getItem('cursos')===null){
          cursosLS=[];
     }else{
          cursosLS=JSON.parse(localStorage.getItem('cursos'));
     }
     return cursosLS;
 


}


// imprime datos acomulados en local storage en el carrito
function leerLocalStorage(){
     let cursosLs;

     cursosLs=obtenerCursosLocalStorage();
     
     // se construye lo almacenado en local storage en el carrito DOM
    cursosLs.forEach(function(curso){
      const row=document.createElement('tr');
          row.innerHTML=`
          <td><img src="${curso.imagen}"width=100><td/> 
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          
     `;

     listaCursos.appendChild(row);
    })
}



// elimina el curso por el ID en local storage
function eliminarCursoLocalStorage(curso){
     let cursosLS;

// obtenemos el arreglo de cursos
     cursosLS=obtenerCursosLocalStorage();

// se agregan index al forEach para indentificar en splice que dato borrar
     cursosLS.forEach(function(cursoLSP,index){
// cursosLS obtiene un objeto de la función obtenerCursosLocalStorage(), al utilizar forEach el parámetro cursoLSP obtiene por medio de la llave "id" el valor de su data-id, para ser comparado en el if con el valor del parámetro curso, que tiene su valor de la variable cursoId, de la función eliminarCurso()
          if(cursoLSP.id===curso){
               cursosLS.splice(index,1);
          }

     });

     // añadimos el arreglo actual a local storage después de las eliminaciones efectuadas obtenidas en la variable cusrsosLS
     localStorage.setItem('cursos',JSON.stringify(cursosLS));

}



// elimina todos los cursos de local storage
function vaciarLocalStorage(){
     localStorage.clear();
}