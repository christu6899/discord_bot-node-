import { SlashCommandBuilder } from "discord.js";
import random from "random";
import { Dinner } from "./dinner.json";
export const command = new SlashCommandBuilder()
  .setName("dinner")
  .setDescription("抽晚餐");

export const action = async (ctx) => {
  const dinnerChannel = await ctx.client.channels.fetch(
    process.env.DINNER_CHANNELID
  );
  const dinner = getRandomDinner();
  await dinnerChannel.send(`${ctx.member.displayName} 抽到 ${dinner} `);
  await ctx.reply({ content: "請到餐廳看結果", ephemeral: true });
};

function getRandomDinner() {
  const randomIndex = Math.floor(Math.random() * Dinner.length);
  const dinner = Dinner[randomIndex];
  return dinner;
}
