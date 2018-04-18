<template>
<div>
    <div id="home">
        <div><b>iNotes</b></div>
    </div>
    <br>
    <note class="note" v-for="note in notes" v-text="note" :key="note.id"></note>
    <br>
    <div>
        <div id="new"><b>Create a New Note</b></div>
        <div>
            <input id="input-box" type="text" @keydown="deleteError()" v-model="note">
            <div v-if="error" id="error">
                {{ error }}
            </div>
        </div>
        <div>
            <button id="btn" type="button" v-on:click="addNote()"><b>Post Note</b></button>
        </div>
    </div>
</div>
</template>
<script>
import Note from '@/components/Note';


export default {
    name: 'Home',
    components: {
        Note
    },
  
    data () {
        return {
            notes: ['Comp 584 Notes', 'Vue.js components'],
            note: '',
            error: ''
        }
    },
    
    methods: {
        addNote: function() {
            if( this.note != '' ){
                this.notes.push(this.note);
                this.note = '';
                if( this.error != '' ){
                    this.error = '';
                }
            } else {
                this.error = "Cannot post an empty note";
            }
        },
        deleteError: function() {
            this.error = '';
        }
    }
}
</script>

<style scoped>
#home {
    background-color: pink;
    text-align:left;
    padding-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 30px;
    color: white;
}

#new {
    color: pink;
}

#input-box {
    width: 200px;
    height: 100px;
}

#btn {
    background-color: pink;
    color: white;
    font-size: 15px;
    height: 40px;
    width: 100px;
    margin-top: 10px;
}

.note {
    border: 1px solid pink;
    margin: 10px;
    margin-right: 200px;
    margin-left: 200px;
    padding: 10px;
}

#error {
    color: magenta;
    margin-bottom: 5px;
}

</style>
