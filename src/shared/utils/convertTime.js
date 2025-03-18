export const convertTime = (duration) => {
  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60
  return `${hours}ч ${remainingMinutes}м`
}
