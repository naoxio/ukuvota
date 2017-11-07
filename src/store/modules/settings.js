import { LocalStorage } from 'quasar'

const getLocal = (item, given) => {
  let local = LocalStorage.get.item(item)
  if (local === null) return given
  return local
}
const setLocal = (item, val) => {
  LocalStorage.set(item, val)
}
export const state = {
  theme: getLocal('theme', 'light'),
  resHover: getLocal('resHover', { none: false, avg: true, total: false })
}

export const actions = {
  updateTheme: ({ commit }, val) => commit('setTheme', val),
  updateResHover: ({ commit }, val) => commit('setResHover', val)
}

export const mutations = {
  setTheme: (state, val) => { setLocal('theme', val); state.theme = val },
  setResHover: (state, val) => { setLocal('resHover', val); state.resHover = val }
}
