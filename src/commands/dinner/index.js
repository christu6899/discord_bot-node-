import { SlashCommandBuilder } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
export const command = new SlashCommandBuilder()
  .setName("dinner")
  .setDescription("晚餐")
  .addStringOption((option) =>
    option
      .setName("功能")
      .setDescription("選擇功能")
      .setRequired(true)
      .addChoices(
        { name: "抽", value: "draw" },
        { name: "新增", value: "add" },
        { name: "刪除", value: "delete" },
        { name: "全部", value: "all" }
      )
  )
  .addStringOption((option) =>
    option.setName("new").setDescription("new dinner")
  )
  .addStringOption((option) =>
    option.setName("delete").setDescription("delete dinner")
  );

export const action = async (ctx) => {
  let data = readFileSync("dinner.json");
  let dinner = JSON.parse(data);
  const dinnerChannel = await ctx.client.channels.fetch(
    process.env.DINNER_CHANNELID
  );
  const fun = ctx.options.getString("功能");

  switch (fun) {
    case "draw":
      const chosenDinner = getRandomDinner(dinner);
      await dinnerChannel.send(
        `${ctx.member.displayName} 抽到 ${chosenDinner} `
      );
      await ctx.reply({ content: "請到餐廳看結果", ephemeral: true });
      break;

    case "add":
      const option = ctx.options.getString("new");
      if (option) {
        dinner.push(option);
        writeFileSync("dinner.json", JSON.stringify(dinner));
        await dinnerChannel.send(`${ctx.member.displayName} 新增了 ${option} `);
        await ctx.reply({ content: "新增成功", ephemeral: true });
      } else {
        await ctx.reply({ content: "新增失敗", ephemeral: true });
      }
      break;

    case "delete":
      const deleteOption = ctx.options.getString("delete");
      if (dinner.includes(deleteOption)) {
        const index = dinner.indexOf(deleteOption);
        dinner.splice(index, 1);
        writeFileSync("dinner.json", JSON.stringify(dinner));
        await dinnerChannel.send(
          `${ctx.member.displayName} 刪除了 ${deleteOption} `
        );
        await ctx.reply({ content: "刪除成功", ephemeral: true });
      } else {
        await ctx.reply({ content: "刪除失敗", ephemeral: true });
      }
      break;

    case "all":
      await dinnerChannel.send(`所有可能抽到的晚餐:${dinner}`);
      await ctx.reply({ content: "請到餐廳看結果", ephemeral: true });
      break;
  }
};

function getRandomDinner(dinner) {
  const randomIndex = Math.floor(Math.random() * dinner.length);
  const chosenDinner = dinner[randomIndex];
  return chosenDinner;
}
