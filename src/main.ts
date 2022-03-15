import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store, key } from "./store";
import "@/assets/base.css";

loadFonts();

createApp(App).use(router).use(vuetify).use(store, key).mount("#app");
