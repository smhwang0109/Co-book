import axios from 'axios'
import SERVER from '@/api/api'
// import router from '@/router'

const bookStore = {
    namespaced : true,
    state: {
        book: null,
    },
    getters: {

    },
    mutations: {
        SET_SELECTED_POST(state, book) {
            state.selectedBook = book
          },
    },
    actions: {
        findPost({ commit }, bookId) {
            axios.get(SERVER.URL + SERVER.ROUTES.books + '/' + bookId)
              .then(res => {
                commit('SET_SELECTED_BOOK', res.data)
              })
              .catch(err => {
                console.log(err.response.data)
              })
          },
        
    },
}

export default bookStore