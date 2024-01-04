import { exec, spawn } from 'child_process'
import fs from 'fs'
import chalk from 'chalk'
export default async function execute(cmdStr) {
  const cmd = cmdStr.split(' ')
  const cmdName = cmd[0]
  const cmdArgs = cmd.slice(1)

  switch (cmdName) {
    case 'help': {
      console.log(chalk.blueBright(`Available commands:
  help - Displays this help message.
  bash - Runs a bash command.
  clear - Clears the screen.
  cd - Changes the current working directory.
  ls - Lists the contents of the current working directory.
  del - Deletes the specified file or folder.
  mkFile - Creates a file at the specified path.
  mkDir - Creates a directory at the specified path.
  editFile - Edits the file at the specified path with the specified text.
  exit - Exits PC-Processor.`))
      break
    }

    case 'bash': {
      const execPromise = new Promise((resolve, reject) => {
        exec(cmdArgs.join(' '), (err, stdout, stderr) => {
          if (err || stderr) {
            reject(err || new Error(stderr))
          } else {
            resolve(stdout)
          }
        })
      })
    
      try {
        const output = await execPromise
        console.log(output)
      } catch (error) {
        console.log(chalk.bgRedBright(" " + error + " "))
      }
      break
    }

    case 'clear': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: clear
Description: Clears the screen.`)
      else
        console.clear()
      break
    }

    case 'cd': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: cd [path]
Description: Changes the current working directory to the specified path.`)
      else {
        process.chdir(cmdArgs[0])
        console.log(`Changed working directory to '${process.cwd()}'.`)
      }
      break
    }

    case 'ls': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: ls [path]
    Description: Lists the contents of the specified directory.`)
      else {
        try {
          const path = cmdArgs[0] || process.cwd()
          const files = fs.readdirSync(path)
          const styledFiles = files.map(file => {
            const isDirectory = fs.statSync(file).isDirectory()
            return isDirectory ? chalk.bgGreenBright(chalk.blue(file)) : chalk.greenBright(file)
          })
          console.log(styledFiles.join('\n'))
        } catch (err) {
          console.log(chalk.bgRedBright(" " + err + " "))
        }
      }
      break
    }

    case 'del': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: del [path]
      Description: Deletes the specified file or folder.`)
      else {
        try {
          const pathToDelete = cmdArgs[0]
          const isDirectory = fs.statSync(pathToDelete).isDirectory()

          if (isDirectory) {
            fs.rmSync(pathToDelete, { recursive: true })
          } else {
            fs.unlinkSync(pathToDelete)
          }
        } catch (err) {
          console.log(chalk.bgRedBright(" " + err + " "))
        }
      }
      break
    }

    case 'mkFile': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: mkFile [path]
  Description: Creates a file at the specified path.`)
      else {
        try {
          fs.writeFileSync(cmdArgs[0], '')
        } catch (err) {
          console.log(chalk.bgRedBright(" " + err + " "))
        }
      }
      break
    }

    case 'mkDir': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: mkDir [path]
  Description: Creates a directory at the specified path.`)
      else {
        try {
          fs.mkdirSync(cmdArgs[0])
        } catch (err) {
          console.log(chalk.bgRedBright(" " + err + " "))
        }
      }
      break
    }

    case 'editFile': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: editFile [path] [text...]
  Description: Edits the file at the specified path with the specified text.
  Use "<NEWLN>" to insert a new line.`)
      else {
        try {
          fs.writeFileSync(cmdArgs[0], cmdArgs.slice(1).join(' ').replace("<NEWLN>", "\n"))
        } catch (err) {
          console.log(chalk.bgRedBright(" " + err + " "))
        }
      }
      break
    }

    case 'ver': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: ver
  Description: Displays the version of PC-Processor.`)
      else
        console.log("PC-Processor PC-v1.0 (VER N. @1.0#4JAN2024)\nBy Muhtasim\nmewo")
      break
    }

    case 'exit': {
      if (cmdArgs[0] === 'help')
        console.log(`Usage: exit [code]
Description: Exits the PC-Processor with the specified exit code.`)
      else
        process.exit(parseInt(cmdArgs[0]) || 0)
      break
    }

    case '': {
      break
    }

    default: {
      console.log(chalk.bgRedBright(` Unknown command '${cmdName}'. Type 'help' for a list of commands. `))
    }
  }
}