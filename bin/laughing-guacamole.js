#!/usr/bin/env node
import { program } from "commander";
import exportConfig from "../src/commands/export-config.js";

program
  .name("laughing-guacamole")
  .description("CLI para gestionar build/export de Expo con configuraciones")
  .version("1.0.0");

program
  .command("export")
  .description("Exportar la app con config ajustada")
  .option(
    "--platform <platform>",
    "Plataforma para exportar (web, ios, android)"
  )
  .action((options) => {
    exportConfig(options);
  });

program.parse();
