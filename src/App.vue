<template>
    <div id="app">
        <div id="searchbar">
            <form class="form-inline">
                <div class="form-group input-group-sm w-50">
                    <label for="location" class="sr-only">Location...</label>
                    <input type="text" v-model="query" class="form-control w-100" id="location" placeholder="Starting location...">
                </div>
                <div class="form-group input-group-sm mx-sm-3 w-25">
                    <label for="range" class="sr-only">Range</label>
                    <input type="text" v-model="range" class="form-control w-100" id="range" placeholder="Range (seconds)">
                </div>
                <button type="button" v-on:click="$refs.map.route(query, range)" class="btn btn-primary btn-sm w-10">Search</button>
            </form>
        </div>
        <HereMap
        ref="map"
        appId="HERE-ID"
        appCode="HERE-CODE"
        lat="37.7397"
        lng="-121.4252" />
    </div>
</template>

<script>
    import HereMap from './components/HereMap.vue'

    export default {
        name: 'app',
        components: {
            HereMap
        },
        data() {
            return {
                query: "",
                range: ""
            };
        }
    }
</script>

<style>
    body {
        background-color: #262626;
    }

    #searchbar {
        position: fixed;
        z-index: 1;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #262626;
        padding: 15px;
        width: 50%;
        border-radius: 5px;
    }

    #map {
        position: fixed;
        width: 100%;
        height: 100%;
    }
</style>