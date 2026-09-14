const fs = require("fs");

const API_URL = "http://localhost:3001";
const QTD_USUARIOS = 100;

async function run() {
  const users = [];

  for (let i = 1; i <= QTD_USUARIOS; i++) {
    const user = {
      email: `perf_user_${i}@teste.com`,
      senha: "password123",
      nome: `Performance User ${i}`,
    };

    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      users.push({ email: user.email, senha: user.senha });
      console.log(`Criado: ${user.email}`);
    } else {
      console.error(`Falha ao criar ${user.email}`);
    }
  }

  // Salva no seu arquivo JSON
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
  console.log(`\n✅ ${users.length} usuários salvos em users.json`);
}

run();
