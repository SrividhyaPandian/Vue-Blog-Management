// Mutations where the state gets updated.
export default {
    UPDATE_HIGHLIGHTED_WORDS(state, payload) {
        state.highlightedWords.includes(payload) ? '' : state.highlightedWords.push(payload)
    },
    UPDATE_DEFAULT_BLOGS(state, payload) {
        state.defaultBlogs = payload.response
    }
}
