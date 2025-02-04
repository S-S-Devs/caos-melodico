function formatearFecha(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
}

window.onload = function() {
  
  const fechaActual = new Date();
  const fechaSistema = document.getElementById("fecha-sistema");
  fechaSistema.textContent = formatearFecha(fechaActual);

  const fechaModificacion = new Date(document.lastModified);
  const fechaUltimaModificacion = document.getElementById("fecha-modificacion");
  fechaUltimaModificacion.textContent = formatearFecha(fechaModificacion);
};