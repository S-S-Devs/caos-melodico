// FECHAS DEL HEADER
function formatearFecha(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
}

function mostrarFechas() {
  const fechaActual = new Date();
  const fechaSistema = document.getElementById("fecha-sistema");
  fechaSistema.textContent = formatearFecha(fechaActual);

  const fechaModificacion = new Date(document.lastModified);
  const fechaUltimaModificacion = document.getElementById("fecha-modificacion");
  fechaUltimaModificacion.textContent = formatearFecha(fechaModificacion);
}

// INFO. DEL NAVEGADOR EN EL FOOTER
function detectarNavegador() {
  const agenteUsuario = navigator.userAgent;
  const navegadores = {
      Chrome: /Chrome\/([0-9.]+)/,
      Edge: /Edg\/([0-9.]+)/,
      Firefox: /Firefox\/([0-9.]+)/,
      Safari: /Version\/([0-9.]+).*Safari/,
      IE: /MSIE ([0-9.]+)|Trident.*rv:([0-9.]+)/
  };

  const edgeResultado = agenteUsuario.match(navegadores.Edge);
  if (edgeResultado) {
      return {
          nombre: "Microsoft Edge",
          version: edgeResultado[1] || "Desconocida"
      };
  }

  const chromeResultado = agenteUsuario.match(navegadores.Chrome);
  if (chromeResultado) {
      return {
          nombre: "Chrome",
          version: chromeResultado[1] || "Desconocida"
      };
  }

  for (const [nombre, patron] of Object.entries(navegadores)) {
      const resultado = agenteUsuario.match(patron);
      if (resultado) {
          return {
              nombre: nombre,
              version: resultado[1] || resultado[2] || "Desconocida"
          };
      }
  }

  return {
      nombre: "Desconocido",
      version: "Desconocida"
  };
}

function mostrarInformacionNavegador() {
  const { nombre, version } = detectarNavegador();
  const infoElemento = document.getElementById("browser-info");
  infoElemento.textContent = `Navegador: ${nombre}, Versión: ${version}`;
}

// FORMULARIOS
function initFormularios() {
  const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="email"], input[type="number"]');
  const form = document.getElementById('personal-info-form');

  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.style.backgroundColor = '#e0f7fa'; // Cambia el color de fondo al enfocar
    });

    input.addEventListener('blur', function () {
      this.style.backgroundColor = ''; // Restaura el color de fondo original
      this.value = this.value.toUpperCase(); // Convierte el texto a mayúsculas
    });
  });

  document.getElementById("datos").onclick = function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    let valid = true;
    inputs.forEach(input => {
      if (!input.value) {
        valid = false;
        input.style.borderColor = 'red'; // Marca el campo vacío en rojo
      } else {
        input.style.borderColor = ''; // Restaura el color del borde
      }
    });

    if (valid) {
      alert('Nombre: ' + form.elements[0].value + '\n'
         + 'Correo: ' + form.elements[1].value + '\n' 
         + 'Edad: ' + form.elements[2].value + '\n');  
      document.getElementById("login").style.display = "none";
      document.getElementById("CaosMelodico").style.display = "block";
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }
}

// Muestra el formulario de login
function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("CaosMelodico").style.display = "none";
}

// Muestra la página de Caos Melódico
function mostrarCaosMelodico() {
  document.getElementById("login").style.display = "none";
  document.getElementById("CaosMelodico").style.display = "block";
}

// Llama a las funciones al cargar la página
window.onload = function() {
  mostrarFechas();
  mostrarInformacionNavegador();
  initFormularios();
}
