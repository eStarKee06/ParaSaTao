<template>
    <div class="p-0">
        <div class="m-0 body">            
            <img class="coverImg" :src="imageSrc"/>
            <div class="home-notice p-3 m-5" v-show="activeWindow == 0">
                    Nang nalaman ko ang tungkol sa baybayin, <br/> <br/> ako ay napaisip kung bakit walang mga <br/> <br/>
                    tanyag na nobelang nakasulat sa Tagalog. <br/><br/>  Marami akong mga pagkakamali na <br/><br/>
                    magagawa sa aking tangkang baybayin ang ibang <br/><br/> mga salita. Sana po ay inyong pagpaumanhin.<br/>  
            </div>
            <Explore v-if="activeWindow == 1" :db="db"/>
        </div>
        <ul class="nav-container p-0 m-0 d-flex justify-content-around">
            <li class="nav m-0 list-group-item" :class="{'activeItem': activeWindow == 0}" @click="activeWindow = 0">home</li>
            <li class="nav m-0 list-group-item" :class="{'activeItem': activeWindow == 1}" @click="activeWindow = 1">Explore</li>
        </ul>
    </div>
</template>

<script>
import Explore from "./Explore.vue"
import {db} from './../main.js'
export default {
    data(){
        return{
            activeWindow: 0,
            imageSrc: '',
            db: null
        };
    },
    mounted(){
        this.mountedBody();
    },
    methods:{
        mountedBody(){
            this.db = db();    
            this.db.collection('cover_image').get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                            this.imageSrc = doc.data().content;
                            //console.log(doc.data());
                        });
                }
            ).catch((error) => console.log(error));
        }
    },
    components:{
        Explore
    }
}
</script>
<style scoped>
    .nav-container{
        position:fixed;
        width:100%;
        bottom:0;
        left:0;
    }
    .nav{
        width: 50%;
        font-weight: bold;
    }
    .coverImg{
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        z-index: -1;
        width: 100%;
    }
    .activeItem{
        background-color: rgba(30,30,30,0.7);
        color: white;
    }
    .home-notice{
        position: fixed;
        right: 0;
        top: 0;
        text-align: left;
        color: white;
        font-family: "Lucida Sans Typewriter";
        font-size: 100%;
    }
</style>
