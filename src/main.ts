import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store, key } from "./store";
import "@/assets/base.css";

loadFonts();

const app = createApp(App);

app.directive("visible", function (el, binding) {
  el.style.visibility = binding.value ? "visible" : "hidden";
});
app.use(router).use(vuetify).use(store, key).mount("#app");
