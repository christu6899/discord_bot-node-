import { SlashCommandBuilder } from "discord.js";
import { Dinner } from "../../../dinner.json";
import { writeFileSync } from "fs";
export const command = new SlashCommandBuilder()
  .setName("dinner")
  .setDescription("晚餐")
  .addStringOption((option) =>
    option
      .setName("功能")
      .setDescription("選擇功能")
      .setRequired(true)
      .addChoices({ name: "抽", value: "draw" }, { name: "新增", value: "add" })
  )
  .addStringOption((option) =>
    option.setName("new").setDescription("newdinner")
  );

export const action = async (ctx) => {
  const dinnerChannel = await ctx.client.channels.fetch(
    process.env.DINNER_CHANNELID
  );
  const fun = ctx.options.getString("功能");
  const dinner = getRandomDinner();
  if (fun === "draw") {
    await dinnerChannel.send(`${ctx.member.displayName} 抽到 ${dinner} `);
    await ctx.reply({ content: "請到餐廳看結果", ephemeral: true });
  } else if (fun === "add") {
    const option = ctx.options.getString("new");
    if (option) {
      console.log(Dinner);
      Dinner.push(option);
      writeFileSync("dinner.json", JSON.stringify(Dinner));
      await dinnerChannel.send(`${ctx.member.displayName} 新增了 ${option} `);
      await ctx.reply({ content: "新增成功", ephemeral: true });
    }
  }
};

function getRandomDinner() {
  const randomIndex = Math.floor(Math.random() * Dinner.length);
  const dinner = Dinner[randomIndex];
  return dinner;
}
