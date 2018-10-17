<template>
    <div>
        我是颜色页面
    </div>
</template>
<script>
export default {
    name:'color',
    computed:{

    },
    methods:{

    },
    mounted(){
        console.log(this.$route.query);
    }
}
</script>
<style lang="scss" scoped>

</style>
