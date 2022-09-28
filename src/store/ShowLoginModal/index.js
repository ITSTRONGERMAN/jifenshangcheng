export default {
    namespaced:true,
    state: {
        isShow:false
    },
    mutations: {
        changeShowLoginModal(state){
            state.isShow=!state.isShow
        }
    },
    actions: {
    },
}