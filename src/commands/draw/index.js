import { SlashCommandBuilder } from "discord.js";
import random from "random";

export const command = new SlashCommandBuilder()
  .setName("抽卡")
  .setDescription("抽卡");

export const action = async (ctx) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    const random_number = random.int(1, 100);
    if (random_number === 1) {
      result.push("<:emoji25:822849294208991244>");
    } else if (random_number > 1 && random_number <= 17) {
      result.push("<:emoji28:822849311347834913>");
    } else {
      result.push("<:emoji27:822849289792913409>");
    }
  }

  if (result.every((item) => item === "<:emoji27:822849289792913409>")) {
    result[9] = "<:emoji28:822849311347834913>";
  }
  ctx.reply(`${result.join("")}`);
};
