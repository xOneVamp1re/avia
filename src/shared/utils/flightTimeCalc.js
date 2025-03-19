export const flightTimeCalc = (startDate, duration) => {
  const startTimeFormat = new Date(startDate).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const endTime = new Date(startDate).getTime() + duration * 60 * 1000

  const endTimeFormat = new Date(endTime).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${startTimeFormat} - ${endTimeFormat}`
}
