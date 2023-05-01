import { REST, Routes, Collection } from "discord.js";
import fg from "fast-glob";
import { useAppStore } from "@/store/app";

const updateSlashCommand = async (commands) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const reslut = await rest.put(
    Routes.applicationGuildCommands(
      process.env.APPLICATION_ID,
      "445475111894777867"
    ),
    {
      body: commands,
    }
  );
};

export const loadCommands = async () => {
  const appStore = useAppStore();
  const commands = [];
  const actions = new Collection();
  const files = await fg("./src/commands/**/index.js");
  for (const file of files) {
    const cmd = await import(file);
    commands.push(cmd.command);
    actions.set(cmd.command.name, cmd.action);
  }

  await updateSlashCommand(commands);
  appStore.commandsActionMap = actions;
};

export const loadEvents = async () => {
  const appStore = useAppStore();
  const client = appStore.client;
  const files = await fg("./src/events/**/index.js");
  for (const file of files) {
    const eventfile = await import(file);
    if (eventfile.event.once) {
      client.once(eventfile.event.name, eventfile.action);
    } else {
      client.on(eventfile.event.name, eventfile.action);
      console.log(eventfile.event.name);
    }
  }
};
