export const checkIfSaveButtonDisabled = (name: string, ...params: string[]) => {
    const check = params?.every(param => param)
    if (name && check) {
        return false
    }
    return true
}