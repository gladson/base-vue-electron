<template>
  <div id="app">
    <div id="queryBrowserContainer">
    <ul class="nav nav-tabs" role="tablist">
        <li 
          ref="nav_tabs_Id"
          role="presentation" 
          v-for="(tab, index) in tabs"
          v-bind:item="`tab `+tab.id"
          v-bind:index="index"
          v-bind:key="tab.id"
          :class="{active:tab.isActive}"
          :data-index="index"
        >
            <a href="#" role="tab" data-toggle="tab" @click.stop.prevent="setActive(tab)">{{ tab.name }}</a>
            <span 
              class="glyphicon glyphicon glyphicon-remove" 
              aria-hidden="true"
              @click="closeTab($event)"
              v-if="tab.id === 0 ? '' : tab.isActive"
            ></span>
        </li>
        <li>
            <button type="button" class="btn btn-primary" @click="openNewTab">NOVA TAB</button>
        </li>
    </ul>
    <div class="tab-content">
        <div 
          v-for="(tab, index) in tabs"
          v-bind:item="`tab `+tab.id"
          v-bind:index="index"
          v-bind:key="tab.id" 
          role="tabpanel" 
          class="tab-pane" 
          :class="{active:tab.isActive}"
          
        >
            <queryBrowserTab :tab="tab"></queryBrowserTab>
        </div>
    </div>
    <pre>{{ $data | json }}</pre>

    </div>
    
  </div>
</template>

<script>
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import queryBrowserTab from './components/queryBrowserTab.vue'

export default {
  name: 'app',
  props: ['tab'],
  components: {
    queryBrowserTab
  },
  data: function() {
    return {
      tabs: [{
          name: "tab1",
          id : 0,
          isActive: true
      }],
      activeTab: {}
    }
  },
  ready: function () {
    this.setActive(this.tabs[0])
  },
  methods: {
      setActive: function (tab) {
          var self = this
          tab.isActive = true
          this.activeTab = tab
          /*this.activeTab.isActive = true;
          console.log("activeTab name=" + this.activeTab.name);*/
          this.tabs.forEach(function (tab) {
              // console.log("TAB => " + tab);
              // console.log("activeTab id => " + self.activeTab.id);
              // console.log("tab id=" + tab.id);
              if (tab.id !== self.activeTab.id) { tab.isActive = false }
          });
      },
      openNewTab: function () {
          var newTab = {
              name: "tab" + (this.tabs.length + 1),
              id: this.tabs.length,
              isActive: true
          }
          this.tabs.push(newTab)
          this.setActive(newTab)
          /*this.activeTab = newTab

          console.log("### newtab name=" + newTab.name)*/

      },
      closeTab: function (event) {
        var value = event.path[1].getAttribute('index')
        const items = this.tabs
        items.splice(value, 1);

        this.setActive(this.tabs[value - 1])
        
        // eslint-disable-next-line no-console
        //console.log(activeTab)
        //console.log("### CLOSE!");
      }
    },
    computed: {
        get_activetab_id: function () {
            return this.idade * 3
        }
    }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
