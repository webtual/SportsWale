
export function getUniqueListBy(arr, key) {
    // return [...new Map(arr.map(item => [item[key], item])).values()]
    return [...arr.reduce((map, obj) => map.set(obj[key], obj), new Map()).values()];
}