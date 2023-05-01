// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { useAppStore } from "@/store/app";
import vueInit from "@/core/vue";
import dotenv from "dotenv";

import { loadCommands, loadEvents } from "@/core/loader";

vueInit();
dotenv.config();
loadCommands();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});
const appStore = useAppStore();
appStore.client = client;
loadEvents();
client.login(process.env.TOKEN);
