import Vue from 'vue';
import './core';
import mdInputContainer from 'vue-material/dist/components/mdInputContainer';
import 'vue-material/dist/components/mdInputContainer/index.css';

if (!mdInputContainer.installed) {
    Vue.use(mdInputContainer);
}

export default mdInputContainer