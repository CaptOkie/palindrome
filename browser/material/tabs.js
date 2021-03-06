import Vue from 'vue';
import './core';
import './whiteframe';
import mdTabs from 'vue-material/dist/components/mdTabs';
import 'vue-material/dist/components/mdTabs/index.css';

if (!mdTabs.installed) {
    Vue.use(mdTabs);
}

export default mdTabs