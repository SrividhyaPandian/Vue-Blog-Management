<template>
    <v-container class="blogList-wrapper" fluid>
        <v-layout row wrap>
            <!-- Manage Blogs Section -->
            <v-flex v-if="activeSection ==='manageBlogList'">
                <v-card>
                    <div class="pa-2" xs12>
                        <h3 class="title blogList">List of Blogs</h3>
                        <v-btn class="right customBtn" @click="createBlog">create new blog</v-btn>
                        <v-btn class="right customBtn" :disabled="highlightedList.length === 0" @click="highlightedWords">view highlighted words</v-btn>
                    </div>
                    <div class="blogList-table">
                        <table-list :tableData="blogList"  
                        @onRowClicked="onRowClicked"
                        @getSelectedWord="getSelectedWord"
                        ></table-list>
                    </div>
                </v-card>
            </v-flex>
            <!-- Create/Edit Blog Section -->
            <v-flex v-if="activeSection === 'createBlog' || activeSection === 'editBlog'">
                <v-card>
                    <blog-form 
                        :nativeModel="nativeModel"
                        @onCancel="backToManage"
                        @submitBlog="submitBlog">
                    </blog-form>
                </v-card>
            </v-flex>
            <!-- Highlighted Words and Preview Blog Section -->
            <v-flex v-if="activeSection === 'highlightedList'">
                <v-card>
                    <highlighted-list 
                    :list="highlightedList" 
                    @viewBlogs="viewBlogs"
                    :selectedWord="selectedWord"
                    :prevData="previewContent"
                    @routeToBlog="routeToBlog"
                    @prevPage="backToManage"
                    ></highlighted-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import tableList from './custom/tableList';
import blogForm from './custom/blogForm';
import highlightedList from './HighlightedList';
import { cloneDeep, filter } from 'lodash';

export default {
    name:"blogList",
    data() {
        return {
            tableData: [],
            nativeModel: {
                title:"",
                author:"",
                content:""
            }
        }
    },
    computed: {
        activeSection: {
            get() {
                return this.$store.state.activeState
            },
            set(newVal) {
                this.$store.state.activeState = newVal
            }
        },
        blogList() {
            return this.$store.state.defaultBlogs
        },
        highlightedList: {
            get() {
                return this.$store.state.highlightedWords
            },
            set(newVal) {
                this.$store.state.highlightedWords = newVal
            }
        },
        previewContent:{
            get(){
                return this.$store.state.previewContent
            },
            set(newVal){
                return this.$store.state.previewContent = newVal
            }
        },
        selectedWord: {
            get() {
                return this.$store.state.activeSelectionWord
            },
            set(newVal){
                this.$store.state.activeSelectionWord = newVal
            }
        }
    },
    created() {
        this.activeSection = 'manageBlogList';
    },
    mounted(){
        var request = {
            apiURL:"./contents/mock/mockBlogs.json",
            mutationURL:"UPDATE_DEFAULT_BLOGS"
        }
        this.$store.dispatch('getAPIData',request)
    },
    components: {
        tableList, blogForm, highlightedList
    },
    methods: {
        createBlog() {
            this.activeSection = 'createBlog'
        },
        submitBlog(data) {
            // Data with Id's only can be edited
            if(data.id) {
                this.blogList.data.forEach((element, index) => {
                if(element.id === data.id) {
                    this.blogList.data[index] = data;
                }});
                this.activeSection = 'manageBlogList'
                this.nativeModel = {}
            }
            // Data without Id is a new blog which is created now
            else {
                data.id = Math.floor(1000000000000 + Math.random() * 900000000)
                // data.id = this.blogList.data.length + 1
                this.blogList.data.push(data)
                this.activeSection = 'manageBlogList'
                this.nativeModel = {}
            }
        },
        onRowClicked(data, action) {
            // Deleting a blog
            if(action) {
                this.blogList.data.forEach((element, index) => {
                if(element.id === data.item.id) {
                    this.blogList.data.splice(index, 1);
                }});
            } 
            // Editing a Blog
            else {
                this.activeSection = 'editBlog'
                this.nativeModel = _.cloneDeep(data.item)
            }
        },
        backToManage() {
            if(this.activeSection === 'createBlog' || this.activeSection === 'editBlog') {
                this.nativeModel = {}
            }
            if(this.activeSection === 'highlightedList') {
                this.highlightedList = []
            }
            this.activeSection = 'manageBlogList';
        },
        getSelectedWord(rowIndex, inputText) {
            // Selection of word from table content
            var selectedText = '';
            if (window.getSelection) { 
                selectedText = window.getSelection().toString(); 
            }
            else if (document.getSelection) { 
                selectedText = document.getSelection(); 
            } 
            else if (document.selection) { 
                selectedText =  document.selection.createRange().text; 
            } else return; 
            
            if(selectedText !== '') {
                var myRegEx = /^([a-zA-Z0-9]+)$/;
                myRegEx.test(selectedText) ? this.highlight(rowIndex, selectedText, inputText) : selectedText = ""
            }
        },
        highlight(rowIndex, selectedText, inputText) {
            // Highlighting the selected word
            var innerHTML = inputText[rowIndex].innerHTML;
            var index = innerHTML.indexOf(selectedText);
            if (index >= 0) { 
                innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+selectedText.length) + "</span>" + innerHTML.substring(index + selectedText.length);
            inputText[rowIndex].innerHTML = innerHTML;
            }
            this.$store.commit("UPDATE_HIGHLIGHTED_WORDS", selectedText);
        },
        highlightedWords() {
            this.activeSection = 'highlightedList';
            this.previewContent = [];
        },
        viewBlogs(item) {
            // Filtering of preview cards
            this.previewContent = []
            this.selectedWord = item
            this.blogList.data.forEach(element => {
                element.content.includes(item) ? this.previewContent.push(element) : ''
            });
        },
        routeToBlog(routeItem) {
            // Routing to Blog based on its respective ID
            this.$router.push({ name: 'Blog', params: { id:  routeItem.id, blog: routeItem}})
            this.activeSection = 'blogView'
        }
    }
}
</script>