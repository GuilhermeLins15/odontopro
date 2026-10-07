
/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} value - O valor monetário em reais (BRL) a ser convertido.
 * @returns O valor em centavos como um número inteiro.
 * @example 
 *  convertRealToCents("R$ 1.234,56"); // Retorna 123456
 */

export function convertRealToCents(value: string) {
  const numericValue = parseFloat(value.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericValue * 100); 
  return priceInCents;
}

export function convertCentsToReal(value: string) {
  const numericValue = parseFloat(value.replace(".", ","));
  const priceInReal = `R$ ${ (numericValue / 100).toFixed(2).replace('.', ',') }`; 
  return priceInReal;
}
