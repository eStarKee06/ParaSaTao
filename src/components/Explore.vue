<template>
    <div>
        <Reader v-if="openReader" :docId="docId" :db="db" @closeReader="openReader = false"/>
        <div class="explore-body px-0 card-body">
            <div class="story-container m-0 mb-2 p-2" v-for="(story,i) in stories" :key="i"
                @click="readerActivate(story.id)">
                    <b>{{story.title}}</b> <br/>
                    {{story.description}}
                    <div class="d-flex justify-content-around px-4 story-container-dates">
                        <div><i>publish date: {{story.publish_date.toDate().toLocaleDateString("en-US")}}</i></div>

                        <div><i>update date: {{story.update_date.toDate().toLocaleDateString("en-US")}}</i></div>
                    </div>
            </div>
        </div>  
    </div>
</template>

<script>
//import {db} from './../main.js'
import Reader from "./Reader.vue"
export default {
    props:{
        db:{}
    },
    data(){
        return{
            //activeWindow: 0,
            stories: [],
            //db: null,
            openReader: false,
            docId: null
        };
    },
    components:{
        Reader
    },
    /*firestore () {
        return {
            stories: db.collection('Stories').orderBy('publish_date')
        }
    },*/
    mounted(){
        this.getStories();
    },
    methods:{
        getStories(){
            //this.db = db();
            //console.log(this.db.listCollections());
            this.db.collection('Stories').get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let docObj = doc.data();
                        docObj.id = doc.id;
                        //console.log(doc.ref)
                        this.stories.push(docObj);
                    });
                }
            ).catch((error) => console.log(error));
        },
        readerActivate(docId){
            this.openReader = true;
            this.docId = docId;
        }
    }
}
</script>

<style scoped>
    .accordion{
        width:100%;
        height:100%;
    }
    .explore-body{
        height:60vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .story-container{
        width: 100%;
        height: 30%;
        border: 1px solid rgba(100,100,100,0.5);
        background-color: rgba(200, 200, 200, 0.2);
        color: white;
        text-align: left;
        overflow:hidden;
        font-size: 80%;
    }
</style>