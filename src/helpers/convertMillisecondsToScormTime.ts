const zeroPad = (intNum: number, intNumDigits: number) => {
  let strTemp

  strTemp = String(intNum)
  const intLen = strTemp.length

  if (intLen > intNumDigits) {
    strTemp = strTemp.substr(0, intNumDigits)
  } else {
    // eslint-disable-next-line no-plusplus
    for (let i = intLen; i < intNumDigits; i++) {
      strTemp = `0${strTemp}`
    }
  }

  return strTemp
}

/**
 * Convert seconds to SCORM 1.2 time format.
 */
const convertMillisecondsToScormTime = (
  intTotalMilliseconds: number,
  blnIncludeFraction: boolean
) => {
  let intHours
  let intMinutes
  let intSeconds
  let intMilliseconds
  let strCMITimeSpan

  if (!blnIncludeFraction) {
    // eslint-disable-next-line
    blnIncludeFraction = true
  }

  // extract time parts
  intMilliseconds = intTotalMilliseconds % 1000

  intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60

  intMinutes =
    ((intTotalMilliseconds - intMilliseconds - intSeconds * 1000) / 60000) % 60

  intHours =
    (intTotalMilliseconds -
      intMilliseconds -
      intSeconds * 1000 -
      intMinutes * 60000) /
    3600000

  /*
  deal with exceptional case when content used a huge amount of time and interpreted CMITimstamp
  to allow a number of intMinutes and seconds greater than 60 i.e. 9999:99:99.99 instead of 9999:60:60:99
  note - this case is permissable under SCORM, but will be exceptionally rare
  */

  if (intHours === 10000) {
    intHours = 9999

    intMinutes = (intTotalMilliseconds - intHours * 3600000) / 60000
    if (intMinutes === 100) {
      intMinutes = 99
    }
    intMinutes = Math.floor(intMinutes)

    intSeconds =
      (intTotalMilliseconds - intHours * 3600000 - intMinutes * 60000) / 1000
    if (intSeconds === 100) {
      intSeconds = 99
    }
    intSeconds = Math.floor(intSeconds)

    intMilliseconds =
      intTotalMilliseconds -
      intHours * 3600000 -
      intMinutes * 60000 -
      intSeconds * 1000
  }

  // drop the extra precision from the milliseconds
  const intHundredths = Math.floor(intMilliseconds / 10)

  // put in padding 0's and concatenate to get the proper format
  strCMITimeSpan = `${zeroPad(intHours, 4)}:${zeroPad(intMinutes, 2)}:${zeroPad(
    intSeconds,
    2
  )}`

  if (blnIncludeFraction) {
    strCMITimeSpan += `.${intHundredths}`
  }

  // check for case where total milliseconds is greater than max supported by strCMITimeSpan
  if (intHours > 9999) {
    strCMITimeSpan = '9999:99:99'

    if (blnIncludeFraction) {
      strCMITimeSpan += '.99'
    }
  }

  return strCMITimeSpan
}

export default convertMillisecondsToScormTime
