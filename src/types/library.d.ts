declare module 'vuex-electron' {
  function createPersistedState(): (options) => (store) => void;
  function createSharedMutations(): (options) => (store) => void;
}
