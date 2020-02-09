
<template>
    <div id = "app">
        {{ message }}
    </div>
</template>


<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!',
            username: 'Jesus Christ'
        },
        methods: {
            getUsername: function() {

            }
        }
    })
</script>

<style scoped>
    
</style>
