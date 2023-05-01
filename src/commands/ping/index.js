import { SlashCommandBuilder } from('discord.js');

export const command = new SlashCommandBuilder()
.setName('ping')
.setDescription('ping commsnd')

export const action = async(ctx)=>{
    ctx.reply('pong!')
}