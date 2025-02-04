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

// Llama a las funciones al cargar la página
window.onload = function() {
  mostrarFechas();
  mostrarInformacionNavegador();
}