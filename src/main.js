import { createApp } from "vue";
import { createPinia } from "pinia";
import VueLocalStorage from "vue-localstorage";

import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    iconfont: "mdiSvg",
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});

const app = createApp(App);

app.use(vuetify);

app.use(createPinia());
app.use(router);

app.mount("#app");
