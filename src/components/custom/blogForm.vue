<template>
    <div class="blogForm-wrapper" xs12>
        <h3 class="title blogForm">
            {{$store.state.activeState === 'createBlog' ?  'Create New Blog' : 'Edit Blog'}}
        </h3>
        <v-form
            ref="form"
            v-model="valid"
        >
            <v-text-field
                v-model="nativeModel.title"
                label="Title"
                required
            ></v-text-field>
        
            <v-text-field
                v-model="nativeModel.author"
                label="Author"
                required
            ></v-text-field>
        
            <v-textarea
                v-model="nativeModel.content"
                label="Content"
            ></v-textarea>
        
            <v-btn class="cancelBtn blogForm" @click="cancel">cancel</v-btn>
            <v-btn class="customBtn reset" @click="reset" v-if="$store.state.activeState === 'createBlog'">reset</v-btn>
            <v-btn class="customBtn" @click="submitBlog">{{$store.state.activeState === 'createBlog' ? 'Submit' : 'Update'}}</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    props: {
        nativeModel: [Array, Object]
    },
    data() {
        return {
            valid: true            
        }
    },
    methods: {
        submitBlog() {
            this.$emit('submitBlog', this.nativeModel)
        },
        reset() {
            this.$refs.form.reset();
        },
        cancel() {
            this.$emit('onCancel')
        },
        updateBlog() {
            this.$emit('updateBlog', this.nativeModel)
        }
    }
}
</script>