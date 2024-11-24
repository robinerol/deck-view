import { ViteSSG } from 'vite-ssg/single-page';
import App from './App.vue';
import './global.css';

export const createApp = ViteSSG(App);
