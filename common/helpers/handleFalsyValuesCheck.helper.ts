export function handleFalsyValuesCheck(...args: any[]): boolean {
    const values = [...args]

    const primitivesArray: any[] = []
    const objectsArray: (object[] | Array<any>)[] = []

    values?.forEach(value => {
        if (typeof value === "object") {
            objectsArray.push(value)
        } else if (typeof value === "boolean") {
            primitivesArray.push(String(value))
        } else {
            primitivesArray.push(value)
        }
    })

    return !(primitivesArray.every(value => Boolean(value) === true) && objectsArray.every(value => Boolean(value?.length) === true))
}