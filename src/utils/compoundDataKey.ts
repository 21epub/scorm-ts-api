/**
 * Compound different versions of SCORM data key.
 */
const compoundDataKey = (key: string, scormVersion: string) => {
  if (scormVersion === '1.2') {
    if (key === 'location') return `cmi.core.lesson_location`
    return `cmi.core.${key}`
  }
  return `cmi.${key}`
}

export default compoundDataKey
