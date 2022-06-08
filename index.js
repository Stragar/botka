const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const botname = "Storm Gen";
const prefix1 = "+";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');
var app = express();
const chalk = require('chalk');

  bot.on('ready', msg => {
  console.log("");                                   
  console.log((chalk.cyan(`                                            #####                                      #####                `)));
  console.log((chalk.cyan(`                                           #     #   ##   #        ##    ####  #    # #     # ###### #    # `)));
  console.log((chalk.cyan(`                                           #        #  #  #       #  #  #    # #   #  #       #      ##   # `)));
  console.log((chalk.cyan(`                                           #  #### #    # #      #    # #      ####   #  #### #####  # #  # `)));
  console.log((chalk.cyan(`                                           #     # ###### #      ###### #      #  #   #     # #      #  # # `)));
  console.log((chalk.cyan(`                                           #     # #    # #      #    # #    # #   #  #     # #      #   ## `)));
  console.log((chalk.cyan(`                                            #####  #    # ###### #    #  ####  #    #  #####  ###### #    # `)));
  console.log("");                                  
  console.log((chalk.yellow(`                                                               Create By Stragar#1234 !`)));  
  console.log((chalk.yellow(`                                                                © 2022 Strorm Gen,.`))); 
  console.log("");                                   
  console.log("");    
                                

  console.log(`Global statistics : \n\nThe bot has a total of ${bot.guilds.cache.size} servers. \nFor a total of ${bot.users.cache.size} membres.`)
  console.log("Logged in as " + bot.user.id + " | Prefix : " + prefix1 + " | Number of Servers "+ bot.guilds.cache.size +" | Channels "+ bot.channels.cache.size +" |User totals "+ bot.users.cache.size +" | Number of total emojis "+ bot.emojis.cache.size +'');
  bot.user.setActivity(" +help");
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have a 15 minute recovery time! - " +
                    message.author.tag
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please provide service!");
                var fs = require("fs");
                const filePath = __dirname + "/comptes/" + args[0] + ".txt";

                const embed = {
                    title: "Out of stock!",
                    description: "The service you requested is currently out of stock!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                        text: "Creator Stragar#1234"
                    },
                    image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/6czZmmtczp",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account " + args[0] + " generated!",
                                    description: "Your requested service account has been sent as a DM!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                                        text: "Creator Stragar#1234"
                                    },
                                    image: {
                                        url:
                                            "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"
                                    },
                                    author: {
                                        name: botname + " - account generator",
                                        url: "https://discord.gg/6czZmmtczp",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 150000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service not found!",
                            description: "The requested service could not be found!",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                                text: "Creator Stragar#1234"
                            },
                            image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                            author: {
                                     name: botname + " -account generator",
                                     url: "https://discord.gg/6czZmmtczp",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats of " + botname,
                    description: "Total number of users: `" + bot.users.cache.size + " membres`\nChannels: `" + bot.channels.cache.size+ " Channels`\nEmoji: `" + bot.emojis.cache.size+ " emoji`\nJoin server: `" + bot.guilds.cache.size+ " server`\nCreator Stragar#1234",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                        text: "Creator Stragar#1234"
                    },
                    image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                    author: {
                         name: botname + " - account generator",
                         url: "https://discord.gg/6czZmmtczp",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: botname + ' - account generator',
                    url: 'https://discord.gg/6czZmmtczp',
                    author: {
                        name: 'List of commands',
                        url: 'https://discord.gg/6czZmmtczp',
                    },
                    image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},

                    description: '**This is a list of all commands**',
                    fields: [
                        {
                            name: 'Generate accounts',
                            value: "Exemple: `" + prefix1 +"gen <name>`",
                        },
                        {
                            name: 'Create a department',
                            value: "Exemple: `" + prefix1 +"create <Service name>`",
                        },
                        {
                            name: 'Notify account restocks',
                            value: "Exemple: `" + prefix1 +"restock <Service name> <Account number>`",
                        },
                        {
                            name: 'Add accounts',
                            value: "Exemple: `" + prefix1 +"add <mail:pass> <Service Name>`",
                        },
                        {
                            name: 'Show bot statistics ' + botname,
                            value: "Exemple: `" + prefix1 +"stats`",
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Creator Stragar#1234',
                        icon_url: 'https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a formatted account string first!")
            if(!service) return message.reply("Provide service first!")
            const filePath = __dirname + "/comptes/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Account successfully added to `" + service + "`!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                        text: "Creator Stragar#1234"
                    },
                    image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/6czZmmtczp",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/comptes/" + args[0] + ".txt";
            fs.writeFile(filePath, 'GalackQSM:GalackQSM', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Service created!",
                    description: "Service created successfully`" + args[0] + "`!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                        text: "Creator Stragar#1234"
                    },
                    image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/6czZmmtczp",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Thanks for doing a favor!",
                description: "Please provide the name of the restocked service!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024",
                    text: "Creator Stragar#1234"
                },
                 image: {url:"https://cdn.discordapp.com/icons/924949519173554186/a_300310cc260c5562a16cf32cf2cfed95.gif?size=1024"},
                author: {
                    name: botname + " - account generator ",
                    url: "https://discord.gg/6czZmmtczp",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            if (!args[1])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone\n● Account Restock: **" + args[0] + "**\n● Number of restock account: **" + args[1] + " accounts**\n● Restocked by: " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(config.token);
