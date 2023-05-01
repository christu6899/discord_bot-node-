import { Events } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { client } from "../../main";
export const event = {
  name: Events.VoiceStateUpdate,
};

export const action = async (oldState, newState) => {
  const member = newState.member;
  const avatarURL = member.user.avatarURL({ dynamic: true });
  const punch_channel = await client.channels.fetch(
    process.env.PUNCH_CHANNELID
  );
  if (!oldState.channelId && newState.channelId) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: member.displayName, iconURL: avatarURL })
      .setColor("Green")
      .setTitle("Member join voice channel")
      .setDescription(`${member.displayName} joined #${newState.channel.name}`)
      .setTimestamp();
    punch_channel.send({ embeds: [embed] });
  } else if (oldState.channelId && !newState.channelId) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: member.displayName, iconURL: avatarURL })
      .setColor("Red")
      .setTitle("Member left voice channel")
      .setDescription(`${member.displayName} lefted #${oldState.channel.name}`)
      .setTimestamp();
    punch_channel.send({ embeds: [embed] });
  } else {
    const embed = new EmbedBuilder()
      .setAuthor({ name: member.displayName, iconURL: avatarURL })
      .setColor(0x34dac7)
      .setTitle("Member left voice channel")
      .setDescription(
        `**Before** #${oldState.channel.name} \n **+After** #${newState.channel.name}`
      )
      .setTimestamp();
    punch_channel.send({ embeds: [embed] });
  }
};
