#!/usr/bin/env node
import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ITERATIONS = 310000;
const KEY_BYTES = 32;
const TAG_BYTES = 16;

function usage() {
  console.log(`Usage:
  PRIVATE_NOTES_PASSPHRASE='strong passphrase' node tools/private-notes-crypto.mjs encrypt private-notes.plain.html private-notes.enc.json
  PRIVATE_NOTES_PASSPHRASE='strong passphrase' node tools/private-notes-crypto.mjs decrypt private-notes.enc.json private-notes.plain.html

If PRIVATE_NOTES_PASSPHRASE is not set, the script prompts for it. Prompted input is visible in the terminal.`);
}

async function getPassphrase() {
  if (process.env.PRIVATE_NOTES_PASSPHRASE) {
    return process.env.PRIVATE_NOTES_PASSPHRASE;
  }

  const rl = createInterface({ input, output });
  const passphrase = await rl.question("Passphrase: ");
  rl.close();
  return passphrase;
}

function deriveKey(passphrase, salt, iterations) {
  return pbkdf2Sync(passphrase, salt, iterations, KEY_BYTES, "sha256");
}

async function encrypt(inputPath, outputPath) {
  const passphrase = await getPassphrase();
  const plaintext = await readFile(inputPath);
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = deriveKey(passphrase, salt, ITERATIONS);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);

  const payload = {
    version: 1,
    kdf: "PBKDF2",
    hash: "SHA-256",
    iterations: ITERATIONS,
    cipher: "AES-256-GCM",
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    ciphertext: encrypted.toString("base64")
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Encrypted ${inputPath} -> ${outputPath}`);
}

async function decrypt(inputPath, outputPath) {
  const passphrase = await getPassphrase();
  const payload = JSON.parse(await readFile(inputPath, "utf8"));
  const salt = Buffer.from(payload.salt, "base64");
  const iv = Buffer.from(payload.iv, "base64");
  const encrypted = Buffer.from(payload.ciphertext, "base64");
  const ciphertext = encrypted.subarray(0, encrypted.length - TAG_BYTES);
  const tag = encrypted.subarray(encrypted.length - TAG_BYTES);
  const key = deriveKey(passphrase, salt, payload.iterations);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  await writeFile(outputPath, plaintext);
  console.log(`Decrypted ${inputPath} -> ${outputPath}`);
}

const [command, inputPath, outputPath] = process.argv.slice(2);

if (!command || !inputPath || !outputPath || !["encrypt", "decrypt"].includes(command)) {
  usage();
  process.exit(1);
}

if (command === "encrypt") {
  await encrypt(inputPath, outputPath);
} else {
  await decrypt(inputPath, outputPath);
}
