export function removeFromArray(array, id) {
    return array.filter(element => element.id !== id);
}