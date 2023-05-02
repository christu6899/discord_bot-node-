import { Events } from "discord.js";
import { EmbedBuilder } from "discord.js";
export const event = {
  name: Events.GuildMemberAdd,
  once: false,
};

export const action = async (member) => {
  const entry_channel = await member.guild.channels.fetch(
    process.env.ENTRY_CHANNELID
  );

  const avatarURL = member.user.avatarURL({ dynamic: true });

  const embed = new EmbedBuilder()
    .setAuthor({ name: member.displayName, iconURL: avatarURL })
    .setColor("Green")
    .setTitle("Member join Guild!")
    .setDescription(`${member.displayName} joined #${member.guild.name}`)
    .setTimestamp();

  entry_channel.send({ embeds: [embed] });
};
