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
      result.push("<:RBAngry:1102620068883468380>");
    } else if (random_number > 1 && random_number <= 17) {
      result.push("<:emoji27:822849289792913409>");
    } else {
      result.push("<:BWAngry:1102620116870508554>");
    }
  }

  if (result.every((item) => item === "<:BWAngry:1102620116870508554>")) {
    result[9] = "<:emoji27:822849289792913409>";
  }
  ctx.reply(`${result.join("")}`);
};
