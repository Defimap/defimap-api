export const getPeriod = (minLength: number) => {
  if (minLength >= 8 && minLength < 31) {
    return 'seven_day'
  } else if (minLength >= 31 && minLength < 91) {
    return 'thirty_day'
  } else if (minLength >= 91 && minLength < 181) {
    return 'three_month'
  } else if (minLength >= 181 && minLength < 366) {
    return 'six_month'
  }
  return 'one_year'
}
