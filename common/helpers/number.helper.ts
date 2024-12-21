const formatNumber = (price: number | undefined) => {
  return new Intl.NumberFormat('ru-RU').format(Number(price));
}

export { formatNumber };