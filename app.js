import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();


const botResponses = [
    { keywords: [  'hi',  'hello',  'hey',  ], response: "Hello! How can I assist you today?" },
    { keywords: [  'help',  'assistance',  ], response: "Sure, I am here to help. What do you need assistance with?" },
    { keywords: [  'bye',  'goodbye',  ], response: "Goodbye! Have a great day!" },
    { keywords: [  'thank',  'thanks',  'thank you',  ], response: "You're welcome! Happy to help." },
];








const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
    ],
});

client.login(process.env.PASSWORD);

client.on('ready',(client)=>{
    console.log(`This bot is now online ${client.user.tag}`);
})

client.on('messageCreate',(message) => {
    if(message.author.bot){
        return true;
    }
    const msg = message.content.toLowerCase(); 
    // if(msg == '!help'){
    //    message.reply('This bot have two commands !help, !hello');
    // }else if(msg == '!hello'){
    //     message.reply('Welcome to my channel');
    //  }


    let maxMatchCount = 0;
    let matchedResponse = botResponses[botResponses.length - 1].response;

    for (const { keywords, response } of botResponses) {
        let matchCount = 0;
        for (const keyword of keywords) {
            const pattern = new RegExp(`\\b${keyword}\\b`, 'i');
            if (msg.match(pattern)) {
                matchCount++;
            }
        }
        if (matchCount > maxMatchCount) {
            maxMatchCount = matchCount;
            matchedResponse = response;
        }
    }

    


     
    message.reply(matchedResponse);
});
