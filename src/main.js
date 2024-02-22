import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import FlagIcon from "vue-flag-icon";
import languageCodes from "language-codes";

const app = createApp(App);
app.use(FlagIcon);
app.use(languageCodes);
app.mount("#app");
