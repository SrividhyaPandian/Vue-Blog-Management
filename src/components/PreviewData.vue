<template>
    <div class="preview-wrapper">
        <v-card class="prev-card"
        v-for="(prev, prevKey) in prevData" :key="prevKey" 
        @click="routeToBlog(prev)">
            <p>{{prev.content}}</p>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "previewCard",
    props: {
        prevData: Array
    },
    methods:{
        routeToBlog(item) {
            this.$emit('routeToBlog', item)
        }
    }
}
</script>