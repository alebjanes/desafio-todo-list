const tareas = [
    {
        id: 1,
        tarea: "Aprender JavaScript",
        completada: false
    },
    {
        id: 2,
        tarea: "Aprender HTML",
        completada: false
    },
    {
        id: 3,
        tarea: "Aprender CSS",
        completada: false
    }
]

const actualizarConteo = () => {
    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;

    document.getElementById("total-tareas").innerText = totalTareas;
    document.getElementById("tareas-realizadas").innerText = `${tareasCompletadas}`;
}

const tareaRealizada = (id) => {
    const index = tareas.findIndex((tarea) => tarea.id == id);
    tareas[index].completada = tareas[index].completada === false ? true : false
    actualizarConteo();
    mostrarTareas();
}

const eliminarTarea = (id) => {
    const index = tareas.findIndex((tarea) => tarea.id == id);
    tareas.splice(index, 1)
    actualizarConteo();
    mostrarTareas();
}

const agregarTarea = () => {
    const inputTarea = document.getElementById("task-input");
    const tarea = inputTarea.value;
    const id = tareas.length > 0 ? tareas[tareas.length-1].id + 1 : 1
    const tareaNueva = {
        id: id,
        tarea: tarea,
        completada: false
    }

    tareas.push(tareaNueva)
    inputTarea.value = ''
    actualizarConteo();
    mostrarTareas();
}

const mostrarTareas = () => {
    const listaTareas = document.querySelector("#detalle-tareas")
    let html = `
        <table>
            <tbody>
                <tr>
                    <th style="width: 35px">ID</th>
                    <th>Tarea</th>
                    <th></th>
                    <th></th>
                </tr>
    `
    let endHtml = `
            </tbody>
        </table>`

    for (let tarea of tareas) {
        const tareaTexto = tarea.completada 
            ? `<span style="text-decoration: line-through;">${tarea.tarea}</span>`
            : tarea.tarea;

        html += `<tr>
                    <td>${tarea.id}</td>
                    <td>${tareaTexto}</td>
                    <td><input type="checkbox" onclick="tareaRealizada(${tarea.id})" ${tarea.completada ? "checked" : ""}/></td>
                    <td><button onclick="eliminarTarea(${tarea.id})">Borrar</button></td>
                </tr>`
    }

    let completeHtml = html + endHtml
    listaTareas.innerHTML = completeHtml
}

actualizarConteo();
mostrarTareas();
