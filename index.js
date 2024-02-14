const { Client, GatewayIntentBits } = require('discord.js');

// Simulación de una base de datos de imágenes
const database = {
    "JPGS": ["furina.jpg", "keqing.jpg", "furinaDS.jpg"],
    "PNGS": ["furina2.png", "kanna.png", "yelan.png"]
};

// Token de tu bot de Discord
const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.G3MY4v.GYjbAe7ot9d5ZCUvSKcPOWmWlZ2X668eWwGbAU";

// Crear el cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});
client.on('error', console.error);
client.on('ready', () => {
    console.log('Bot listo');
});

client.on('message', async message => {
    // Verificar que el mensaje provenga de un usuario y no del bot
    if (message.author.bot) return;

    // Verificar si el mensaje comienza con el comando para buscar una imagen
    if (message.content.startsWith('!buscar')) {
        // Obtener la categoría solicitada por el usuario
        const categoria = message.content.split(' ')[1];
        
        // Verificar si la categoría está en la base de datos
        if (categoria in database) {
            message.channel.send(`Elige una opción de ${categoria}: ${database[categoria].join(', ')}`);
        } else {
            message.channel.send("Categoría no encontrada.");
        }
    }

    // Verificar si el mensaje corresponde a la elección de una imagen
    if (message.content.startsWith('!elegir')) {
        // Obtener la categoría y la imagen elegida por el usuario
        const [_, categoria, imagen] = message.content.split(' ');
        
        // Verificar si la categoría y la imagen están en la base de datos
        if (categoria in database && database[categoria].includes(imagen)) {
            // Enviar la imagen al mismo canal
            message.channel.send({
                files: [`./imagenes/${categoria}/${imagen}`]
            });
        } else {
            message.channel.send("Categoría o imagen no encontrada.");
        }
    }
});

// Conectar el bot a Discord
client.login(token);
