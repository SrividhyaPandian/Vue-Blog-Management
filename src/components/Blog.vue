<template>
    <v-container fluid class="blog-wrapper" v-if="activeState === 'blogView'">
        <v-layout row wrap>
            <v-card class="card-wrapper">
                <v-flex xs12>
                    <h3 class="title">{{$route.params.blog.title}}</h3>
                    <p class="author">{{$route.params.blog.author}}</p>
                    <p class="content">{{$route.params.blog.content}}</p>
                </v-flex>
                <v-btn class="customBtn" @click="mainPage">back to main</v-btn>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Blog',
    computed: {
        activeState() { 
            return this.$store.state.activeState;
        }
    },
    methods:{
        mainPage() {
            this.$store.state.highlightedWords = [];
            this.$store.state.previewContent = [];
            this.$router.push('/');
        }
    }
}
</script>