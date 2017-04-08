import Vue from 'vue';
import 'General/index.css';

export default function(el, name, component) {
    window.addEventListener('load', () => {
        const components = {};
        components[name] = component;
        new Vue({ el : el, components });
    });
}