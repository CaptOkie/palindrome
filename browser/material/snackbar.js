import Vue from 'vue';
import './core';
import mdSnackbar from 'vue-material/dist/components/mdSnackbar';
import 'vue-material/dist/components/mdSnackbar/index.css';

if (!mdSnackbar.installed) {
    Vue.use(mdSnackbar);
}

export default mdSnackbar