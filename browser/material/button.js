import Vue from 'vue';
import './core';
import mdButton from 'vue-material/dist/components/mdButton';
import 'vue-material/dist/components/mdButton/index.css';

if (!mdButton.installed) {
    Vue.use(mdButton);
}

export default mdButton