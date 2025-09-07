import { input } from "@inquirer/prompts";

export async function validateConfig(config) {
  const required = ["scheme", "ios.bundleIdentifier", "android.package"];

  for (const field of required) {
    const keys = field.split(".");
    let value = config;
    for (const k of keys) {
      value = value?.[k];
    }

    if (!value) {
      console.warn(`⚠️ Falta campo obligatorio: ${field}`);
      const newValue = await input({
        message: `Ingrese valor para ${field}:`,
      });

      // asignar dinámicamente
      let obj = config;
      keys.slice(0, -1).forEach((k) => (obj = obj[k] ??= {}));
      obj[keys[keys.length - 1]] = newValue;
    }
  }
}
