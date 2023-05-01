import { SlashCommandBuilder } from "discord.js";
import random from "random";

export const command = new SlashCommandBuilder()
  .setName("抽卡")
  .setDescription("抽卡")
  .addStringOption((option) =>
    option.setName("wish").setDescription("許願事項")
  );

export const action = async (ctx) => {
  const draw_Channel = await ctx.client.channels.fetch(
    process.env.DRAW_CHANNELID
  );
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
  let optionValue = ctx.options.get("wish");
  if (optionValue) {
    optionValue = optionValue.value;
  } else {
    optionValue = "";
  }

  draw_Channel.send(
    `${ctx.member.displayName} \n ${result.join("")} ${optionValue}`
  );
  await ctx.reply({ content: "請到燃燒陽壽察看結果", ephemeral: true });
};
