 

const convertDataInventory = (data) => {
  const newData = data.map((item: any) => {
    const newItem: any = {}
    newItem.name = item.name
    newItem.company = item.company.name
    newItem.quantity = item.quantity
    newItem.value = item.value
    return newItem
  })
  return newData
}

export default convertDataInventory