export function push(name, value) {
  localStorage.setItem(name, value);
}

export function pull(name) {
  return localStorage.getItem(name) || 'ru';
}
