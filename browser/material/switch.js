import Vue from 'vue';
import './core';
import mdSwitch from 'vue-material/dist/components/mdSwitch';
import 'vue-material/dist/components/mdSwitch/index.css';

if (!mdSwitch.installed) {
    Vue.use(mdSwitch);
}

export default mdSwitch