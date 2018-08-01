export async function serialAsyncMap(collection, fn) {
    let result = [];

    for (let item of collection) {
        result.push(await fn(item));
    }

    return result;
}
