let globalState = {
  firstTime: true
}

const setGlobalState = (newGlobalState) => {
  globalState = newGlobalState
}

export {
  globalState,
  setGlobalState
}