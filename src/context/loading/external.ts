let handler: (state: boolean) => void = () => {}

export function registerLoadingHandler(fn: (state: boolean) => void) {
  handler = fn
}

export function setLoading(state: boolean) {
  handler(state)
}
