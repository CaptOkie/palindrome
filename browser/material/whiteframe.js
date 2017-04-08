import Vue from 'vue';
import './core';
import mdWhiteframe from 'vue-material/dist/components/mdWhiteframe';
import 'vue-material/dist/components/mdWhiteframe/index.css';

if (!mdWhiteframe.installed) {
    Vue.use(mdWhiteframe);
}

export default mdWhiteframe