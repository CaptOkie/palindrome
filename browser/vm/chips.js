import Vue from 'vue';
import './mdCore';
import mdChips from 'vue-material/dist/components/mdChips';
import 'vue-material/dist/components/mdChips/index.css';

if (!mdChips.installed) {
    Vue.use(mdChips);
}

export default mdChips