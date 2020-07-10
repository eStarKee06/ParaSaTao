<template>
    <div class="bg">

        <div class="content-container">
        <img class="content mt-3" v-if="content.length > 0" :src="content[pageIndex - 1].page_content"/>
        </div>

        <button type="button" class="close mt-2 mx-3" style="color:white;" aria-label="Close"
            @click="$emit('closeReader')">
            <span aria-hidden="true">&times;</span>
        </button>
        <i class="arrow right m-3" @click="pageIndex = (pageIndex != content.length)? pageIndex + 1 : pageIndex"></i>
        <i class="arrow left m-3" @click="pageIndex = (pageIndex != 1) ? pageIndex - 1: pageIndex"></i>
        
        <div class="pageSelector mb-3"> <input v-model="pageIndex" @change="pageBoundCheck"/> / {{content.length}} </div>
        <div class="floating-bar"></div>
    </div>
</template>

<script>
export default {
    props:{
        docId:{},
        db:{}
    },
    data(){
        return{
            pageIndex:1,
            content: []
        };
    },
    mounted(){
        console.log(this.docId);
        this.getStoryCollections();
    },
    methods:{
        getStoryCollections(){
            //this.db.collection("Stories").document(this.docId).listCollection();
            this.db.collection("Stories").doc(this.docId).collection("content").orderBy("page_number", "asc").get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        //console.log(doc.data().page_number)
                        console.log(doc.data().page_content);
                        this.content.push(doc.data());
                    })
                }
            );
        },
        pageBoundCheck(){
            if(this.pageIndex > this.content.length){
                this.pageIndex = this.content.length
            }
            if(this.pageIndex < 1){
                this.pageIndex = 1;
            }
        }
    }
}
</script>
<style scoped>
    .bg{
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        height:100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: rgba(0,0,0,0.7);
        z-index: 10000;
    }
    .content{
        height: 90%;
        width: auto;
        position: relative;
        background-position: bottom;
    }
    .content-container{
        position:fixed;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
    }
    .arrow {
        border: solid white;
        border-width: 0 5px 5px 0;
        display: inline-block;
        padding: 8px;
    }

    .right {
        position: fixed;
        right: 0;
        top:40%;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .left {
        position: fixed;
        left: 0;
        top:40%;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
    .pageSelector{
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        font-size: 100%;
        font-weight: bold;
        color: white;
    }
    .pageSelector input{
        width: 5%;
        text-align: center;
    }
</style>
