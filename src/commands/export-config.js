import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { validateConfig } from "../utils/validate-config.js";

export default async function exportConfig(options) {
  try {
    console.log("🚀 Ejecutando expo export...");

    // construimos comando con flags
    let expoCmd = "npx expo export";
    if (options.platform) {
      expoCmd += ` --platform ${options.platform}`;
    }

    console.log("👉 Ejecutando:", expoCmd);
    execSync(expoCmd, { stdio: "inherit" });

    const appJsonPath = path.resolve("app.json");
    const distPath = path.resolve("dist/expoConfig.json");

    if (!fs.existsSync(appJsonPath)) {
      throw new Error("❌ No se encontró app.json en la raíz del proyecto");
    }

    const raw = await fs.readJson(appJsonPath);
    if (!raw.expo) {
      throw new Error("❌ app.json no contiene clave `expo`");
    }

    const transformed = raw.expo; // sacamos expo

    // 🔹 Primero validar (y rellenar si falta algo)
    await validateConfig(transformed);

    // 🔹 Luego guardar ya con los valores obligatorios
    await fs.ensureDir("dist");
    await fs.writeJson(distPath, transformed, { spaces: 2 });

    console.log("✅ Archivo exportado en", distPath);
  } catch (err) {
    console.error("❌ Error en export:", err.message);
    process.exit(1);
  }
}
