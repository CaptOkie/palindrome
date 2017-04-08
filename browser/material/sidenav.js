import Vue from 'vue';
import './core';
import './backdrop';
import mdSidenav from 'vue-material/dist/components/mdSidenav';
import 'vue-material/dist/components/mdSidenav/index.css';

if (!mdSidenav.installed) {
    Vue.use(mdSidenav);
}

export default mdSidenav