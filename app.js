let amigos = [];

// Captura de elementos del DOM
const input = document.getElementById("amigo");
input.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		agregarAmigo();
	}
});
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

/* Esta funcion se encarga de mostrar una alerta al estilo de bootstrap en la interfaz de usuario
ubicada en la esquina superior derecha de la pantalla
recibe dos parametros, el mensaje a mostrar y el tipo de alerta (success o error) */
function mostrarAlert(mensaje, tipo = "success") {
	// Crear el contenedor del alert
	const alert = document.createElement("div");
	alert.style.position = "fixed";
	alert.style.top = "20px";
	alert.style.right = "20px";
	alert.style.padding = "15px";
	alert.style.borderRadius = "4px";
	alert.style.fontFamily = "Arial, sans-serif";
	alert.style.fontSize = "14px";
	alert.style.display = "flex";
	alert.style.alignItems = "center";
	alert.style.justifyContent = "space-between";
	alert.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
	alert.style.zIndex = "1000";

	// Estilos según el tipo de alert
	if (tipo === "success") {
		alert.style.backgroundColor = "#d4edda";
		alert.style.color = "#155724";
		alert.style.border = "1px solid #c3e6cb";
	} else if (tipo === "error") {
		alert.style.backgroundColor = "#f8d7da";
		alert.style.color = "#721c24";
		alert.style.border = "1px solid #f5c6cb";
	}

	// Crear el mensaje del alert
	const mensajeTexto = document.createTextNode(mensaje);

	// Crear el botón para cerrar el alert
	const closeBtn = document.createElement("button");
	closeBtn.textContent = "×"; // Símbolo de "X"
	closeBtn.style.background = "none";
	closeBtn.style.border = "none";
	closeBtn.style.color = "inherit";
	closeBtn.style.fontSize = "18px";
	closeBtn.style.cursor = "pointer";
	closeBtn.style.marginLeft = "10px";
	closeBtn.onclick = () => {
		document.body.removeChild(alert); // Eliminar el alert al hacer clic
	};

	// Agregar el mensaje y el botón al alert
	alert.appendChild(mensajeTexto);
	alert.appendChild(closeBtn);

	// Agregar el alert al cuerpo del documento
	document.body.appendChild(alert);

	// Ocultar el alert después de 4 segundos
	setTimeout(() => {
		if (document.body.contains(alert)) {
			document.body.removeChild(alert);
		}
	}, 4000);
}
function validarNombre(nombre) {
	if (nombre === "") {
		mostrarAlert("Por favor, inserte un nombre.", "error");
		input.style.border = "2px solid #721c24";
		return false;
	}
	input.style.border = "2px solid #000";
	return true;
}

// Función para agregar un amigo
// Antes de agregar un amigo, se valida que el nombre no esté vacío
function agregarAmigo() {
	const nombre = input.value.trim();

	// Validar la entrada
	if (!validarNombre(nombre)) {
		return;
	}

	// Añadir el nombre al array de amigos
	amigos.push(nombre);

	// Limpiar el campo de entrada
	input.value = "";

	// Actualizar la lista de amigos en la interfaz
	mostrarAmigos();

	// Mostrar alert de éxito
	mostrarAlert(`"${nombre}" ha sido agregado a la lista de amigos.`, "success");
}

// Función para mostrar la lista de amigos
function mostrarAmigos() {
	// Limpiar la lista existente
	listaAmigos.innerHTML = "";

	// Iterar sobre el arreglo y agregar cada nombre como un elemento <li>
	amigos.forEach((amigo) => {
		const li = document.createElement("li");
		li.textContent = amigo;
		listaAmigos.appendChild(li);
	});
}

// Función para sortear un amigo
function sortearAmigo() {
	// Validar que haya amigos disponibles
	if (amigos.length === 0) {
		mostrarAlert("No hay amigos en la lista para sortear.", "error");
		return;
	}

	// Generar un índice aleatorio
	const indiceAleatorio = Math.floor(Math.random() * amigos.length);

	// Obtener el nombre sorteado
	const amigoSorteado = amigos[indiceAleatorio];

	listaAmigos.innerHTML = "";

	resultado.innerHTML = `<li>¡El amigo sorteado es: <strong>${amigoSorteado}</strong>!</li>`;
}
