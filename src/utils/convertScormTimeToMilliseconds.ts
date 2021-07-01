const convertScormTimeToMilliseconds = (time: string) => {
  const perSecond = 1000
  const perMinute = perSecond * 60
  const perHour = perMinute * 60

  const durations = [perHour, perMinute, perSecond, 1]

  return time
    .split('.')
    .flatMap((item) => item.split(':'))
    .reduce((prev, curr, index) => prev + Number(curr) * durations[index], 0)
}

export default convertScormTimeToMilliseconds
