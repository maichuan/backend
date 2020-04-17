export const getFullDate = (date: Date): string => {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

export const getTime = (date: Date): string => {
  const minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return date.getHours() + '.' + minute
}
