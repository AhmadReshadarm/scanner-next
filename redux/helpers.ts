export const handlePaginationDataFormatter = (action) => {
    const dataArr = [...action.payload?.rows]
    for (let i = 0; i < action?.meta?.arg?.offset; i++) {
        dataArr.unshift({ id: 0, name: '', image: '' })
    }
    for (let i = dataArr.length; i < action?.payload?.length; i++) {
        dataArr.push({ id: 0, name: '', image: '' })
    }
    return dataArr
}