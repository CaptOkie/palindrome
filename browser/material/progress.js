import Vue from 'vue';
import './core';
import mdProgress from 'vue-material/dist/components/mdProgress';
import 'vue-material/dist/components/mdProgress/index.css';

if (!mdProgress.installed) {
    Vue.use(mdProgress);
}

export default mdProgress