import Vue from 'vue';
import './core';
import mdTooltip from 'vue-material/dist/components/mdTooltip';
import 'vue-material/dist/components/mdTooltip/index.css';

if (!mdTooltip.installed) {
    Vue.use(mdTooltip);
}

export default mdTooltip