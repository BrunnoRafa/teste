export function addBrands(id, name) {
    return {
        type: 'ADD_BRANDS',
        payload: {
            id,
            name
        }
    }
}