import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";
export const command = new SlashCommandBuilder()
  .setName("天氣")
  .setDescription("天氣預報")
  .addStringOption((option) =>
    option
      .setName("縣市")
      .setDescription("查詢地點")
      .setRequired(true)
      .setChoices(
        { name: "宜蘭縣", value: "宜蘭縣" },
        { name: "花蓮縣", value: "花蓮縣" },
        { name: "臺東縣", value: "臺東縣" },
        { name: "澎湖縣", value: "澎湖縣" },
        { name: "金門縣", value: "金門縣" },
        { name: "連江縣", value: "連江縣" },
        { name: "臺北市", value: "臺北市" },
        { name: "新北市", value: "新北市" },
        { name: "桃園市", value: "桃園市" },
        { name: "臺中市", value: "臺中市" },
        { name: "臺南市", value: "臺南市" },
        { name: "高雄市", value: "高雄市" },
        { name: "基隆市", value: "基隆市" },
        { name: "新竹市", value: "新竹市" },
        { name: "苗栗縣", value: "苗栗縣" },
        { name: "彰化縣", value: "彰化縣" },
        { name: "南投縣", value: "南投縣" },
        { name: "雲林縣", value: "雲林縣" },
        { name: "嘉義縣", value: "嘉義縣" },
        { name: "嘉義市", value: "嘉義市" }
      )
  );

export const action = async (ctx) => {
  const weatherChannel = await ctx.client.channels.fetch(
    process.env.WEATHER_CHANNELID
  );
  const locationName = ctx.options.get("縣市").value;
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${process.env.WEATHER_TOKEN}&format=JSON&location 
    Name=${locationName}&elementName=Wx,PoP,CI,MinT,MaxT`;
  const data = (await axios(url)).data.records.location[0].weatherElement;

  weatherChannel.send(`以下是關於${locationName}的36小時天氣預報`);
  for (let i = 0; i < 3; i++) {
    const embed = new EmbedBuilder()
      .setColor(0x34dac7)
      .setTitle(locationName)
      .addFields(
        {
          name: "天氣狀況",
          value: data[0]["time"][i]["parameter"]["parameterName"],
          inline: true,
        },
        {
          name: "溫度",
          value: `${data[2]["time"][i]["parameter"]["parameterName"]} ~ ${data[4]["time"][i]["parameter"]["parameterName"]} °C`,
          inline: true,
        },
        {
          name: "降雨機率",
          value: `${data[2]["time"][i]["parameter"]["parameterName"]}% ~ ${data[4]["time"][i]["parameter"]["parameterName"]}%`,
          inline: true,
        }
      )
      .setFooter({
        text: `${data[0]["time"][i]["startTime"].slice(5, -3)} ~ ${data[0][
          "time"
        ][i]["endTime"].slice(5, -3)}`,
      });
    weatherChannel.send({ embeds: [embed] });
  }

  await ctx.reply({ content: "請到長官覺得你會冷察看結果", ephemeral: true });
};
