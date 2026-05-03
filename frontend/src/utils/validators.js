export const DTC_REGEX =
  /^[PCBU][0-9]{4}$/


export const validateFaultCode = (
  code
) => {

  if (!code) {
    return false
  }

  return DTC_REGEX.test(
    code.trim().toUpperCase()
  )
}


export const normalizeFaultCode = (
  code
) => {

  return code
    .trim()
    .toUpperCase()
}


export const validateFaultCodeLimit = (
  codes
) => {

  return codes.length <= 10
}