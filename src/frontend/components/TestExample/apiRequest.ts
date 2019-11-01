import 'cross-fetch'

export function APIRequest(who: string) {
  if (who === 'test1') {
    return fetch('/test1')
  } else if (who === 'test2') {
    return fetch('/test2')
  }
}