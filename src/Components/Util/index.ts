export function removeAccents(word) {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
