import Vue from 'vue';
import './core';
import mdImage from 'vue-material/dist/components/mdImage';
import 'vue-material/dist/components/mdImage/index.css';

if (!mdImage.installed) {
    Vue.use(mdImage);
}

export default mdImage