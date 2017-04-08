import Vue from 'vue';
import './core';
import './list';
import './backdrop';
import mdMenu from 'vue-material/dist/components/mdMenu';
import 'vue-material/dist/components/mdMenu/index.css';

if (!mdMenu.installed) {
    Vue.use(mdMenu);
}

export default mdMenu