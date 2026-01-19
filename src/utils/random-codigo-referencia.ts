export function gerarReferenciaTicket() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  let resultado = '';

  for (let i = 0; i < 2; i++) {
    resultado += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  for (let i = 0; i < 3; i++) {
    resultado += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  return resultado;
}
