<template>
    <v-container fluid v-if="$store.state.activeState === 'highlightedList'">
        <v-layout row wrap>
            <v-flex xs4>
                <div class="highlight-wrapper">
                    <h3 class="title higlight">List of Highlighted Words</h3>
                    <ul class="custom-ul" v-for="(item, key) in list" :key="key">
                        <li>
                            <v-chip class="customChip" @click="viewBlogs(item)">{{item}}</v-chip>
                        </li>
                    </ul>
                </div>
                <v-btn class="cancelBtn highlight" @click="prevPage">cancel</v-btn>
            </v-flex>
            <v-flex xs8 v-if="prevData && prevData.length">
                <div class="preview-main-wrapper">
                <h3 class="title highlight">The blogs containing <span>{{selectedWord}}</span> are listed below:</h3>
                <preview-data :prevData="prevData" @routeToBlog="routeToBlog"></preview-data>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import previewData from './PreviewData';

export default {
    props: {
        list: [Array, Object],
        prevData: Array,
        selectedWord: String
    },
    components: {
        previewData
    },
    methods: {
        viewBlogs(item) {
            this.$emit('viewBlogs', item)
        },
        routeToBlog(item){
            this.$emit('routeToBlog', item)
        },
        prevPage() {
            this.$emit('prevPage')
        }
    }

}
</script>