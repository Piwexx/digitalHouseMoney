export const parseDate = (date:Date): string => {

  const opciones:Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const fechaFormateada = date.toLocaleDateString('es-ES', opciones);
  const hora = date.getHours().toString().padStart(2, '0');
  const minutos = date.getMinutes().toString().padStart(2, '0');

  const  resultado = `${fechaFormateada} a ${hora}:${minutos} hs`;

  return resultado
}