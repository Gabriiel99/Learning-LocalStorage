//Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
let tarea = [];




//Event Listener
EventListener();

//cuando el usuario agreega nueva tarea
function EventListener(){
    formulario.addEventListener('submit',agregarTarea);

    //cuando el doc esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tarea = JSON.parse(localStorage.getItem('tarea')) || [] ;

        crearHTML();
    })
}

//Funciones
function agregarTarea(e){
    e.preventDefault();

    //textarea donde el usuario escribe

    const tareas = document.querySelector('#tarea').value;

    //validacion vacio
    if(tarea === ''){
        mostrarError('No puede estar vacio');

        return;//evitamos que se ejecuten mas lineas de codigo
    }

    const tareasObj = {
        id: Date.now(),
        tareas

    }
    //añadir array tareas
    tarea = [...tarea, tareasObj];


    //ya agregado vamos a mostrar el HTML
    crearHTML();

    //reiniciar form
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    //elimina la alerta despues de 3s
    setTimeout( () => {
        mensajeError.remove();
    },3000);
}


    //muestra listado de tarea
    function crearHTML(){

        limpiarHTML();

        if(tarea.length > 0){
            tarea.forEach( tareas =>{
                
                //Agregar boton
                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrar-tarea');
                btnEliminar.innerText = 'X';

                //añadir la funcion de eliminar
                btnEliminar.onclick = () =>{
                    borrarTarea(tareas.id);
                }

                //crear HTML
                const li = document.createElement('li');

                //añadir texto
                li.innerText = tareas.tareas;


                //asignaar el boton
                li.appendChild(btnEliminar);

                
                //insertar en el html
                listaTareas.appendChild(li);
            })
        }

        sincronizarStorage();
    }

    //agregar las tareas al LS
    function sincronizarStorage(){
        localStorage.setItem('tarea', JSON.stringify(tarea));
    }

    //elimninar una tarea
    function borrarTarea(id){
        tarea = tarea.filter (tarea => tarea.id !== id);

        crearHTML();
    }

    //limpiar HTML
    function limpiarHTML(){
        while(listaTareas.firstChild){
            listaTareas.removeChild(listaTareas.firstChild);
        }
    }