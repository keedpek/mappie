/* eslint-disable @typescript-eslint/no-unused-expressions */
export const convertTimeFromSeconds = (sec: number): string => {
  const hours = Math.floor(sec / 3600)
  const mins = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)

  const time: string[] = []

  hours > 9 ? time.push(`${hours}`) : time.push(`0${hours}`)
  mins > 9 ? time.push(`${mins}`) : time.push(`0${mins}`)
  seconds > 9 ? time.push(`${seconds}`) : time.push(`0${seconds}`)

  return time.join(':')
}
