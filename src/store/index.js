import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: false,
    state: {
        activeState: "manageBlogList",
        defaultBlogs:{},
        highlightedWords: [],
        previewContent:[],
        activeSelectionWord: ''
    },
    actions,
    mutations
});

export default store;