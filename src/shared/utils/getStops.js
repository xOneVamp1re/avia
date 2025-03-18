export const getStopText = (stops) => {
  if (stops.length === 0) {
    return 'Без пересадок'
  }
  const stopCount = stops.length
  return `${stopCount} ${stopCount > 1 ? 'пересадки' : 'пересадка'}`
}
