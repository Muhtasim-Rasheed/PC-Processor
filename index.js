import execute from './execute.js'
import readline from 'readline'
import chalk from 'chalk'
import ansiStyles from 'ansi-styles'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.clear()
console.log(ansiStyles.bold.open + chalk.bgGreenBright(ansiStyles.gray.open + (" PC-Processor PC-v1.0 ")) + chalk.bgCyanBright(" ") + chalk.bgBlueBright((" (VER N. @1.0#4JAN2024) ")) + ansiStyles.gray.close)
console.log(chalk.blueBright(" Type 'help' for a list of commands.") + ansiStyles.bold.close)
console.log()

async function prompt() {
  await rl.question(chalk.bgBlueBright(chalk.black(ansiStyles.bold.open + " @1.0#4JAN2024 " + ansiStyles.bold.close)) + chalk.bgGreenBright(chalk.black(" :: ")) + chalk.bgWhiteBright(chalk.black(" " + process.cwd().replace("/Users/mnarasheed", "~") + " ")) + chalk.bgGreenBright(chalk.black(ansiStyles.bold.open + " # " + ansiStyles.bold.close)) + " " + ansiStyles.bold.open + ansiStyles.blueBright.open, async cmdStr => {
    console.log(chalk.blueBright("------------------------------------------") + ansiStyles.bold.close + ansiStyles.blueBright.close)
    await execute(cmdStr)
    console.log()
    await prompt()
  })
}

prompt()