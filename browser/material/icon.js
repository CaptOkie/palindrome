import Vue from 'vue';
import './core';
import './image';
import mdIcon from 'vue-material/dist/components/mdIcon';
import 'vue-material/dist/components/mdIcon/index.css';

if (!mdIcon.installed) {
    Vue.use(mdIcon);
}

export default mdIcon