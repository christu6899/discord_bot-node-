// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { useAppStore } from "@/store/app";
import vueInit from "@/core/vue";
import dotenv from "dotenv";

import { loadCommands, loadEvents } from "@/core/loader";

vueInit();
dotenv.config();
loadCommands();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore();
appStore.client = client;
loadEvents();
client.login(process.env.TOKEN);
