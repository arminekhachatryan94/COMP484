<template>
<div>
    <div id="home">
        <div><b>iNotes</b></div>
    </div>

    <note v-for="note in notes" v-text="note" :key="note.id"></note>
    
    <div>
        <div>Create a New Note</div>
        <div>
            <input type="text" v-model="note">
            <button type="button" v-on:click="addNote()">Post Note</button>
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
            notes: ['Hello', 'How are you?'],
            note: ''
        }
    },
    
    methods: {
        addNote: function() {
            if( this.note != '' ){
                this.notes.push(this.note);
                this.note = '';
            }
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
</style>
