const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');

clear();
const log = console.log;

console.log(
    chalk.yellow(
        figlet.textSync('ezFrontCli', {
            horizontalLayout: 'full'
        })
    )
);

// Detect if there is a Git Repository in the directory
if (files.directoryExists('.git')) {
    console.log(chalk.hidden('Already a Git repository!'));
    process.exit();
} else {
    // console.log(chalk.hidden('Not a Git repository!'));
    log(chalk.blue('Hello') + ' World' + chalk.red('!'));
    log(chalk.blue.bgRed.bold('Hello world!'));
    log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
    log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
    log(chalk.green(
        'I am a green line ' +
        chalk.blue.underline.bold('with a blue substring') +
        ' that becomes green again!'
    ));
}


// Test data is returning from inquirer

// const inquirer = require('./lib/inquirer');
/*
const run = async () => {
    const credentials = await inquirer.askGithubCredentials();
    console.log(credentials);
};
*/

const github = require('./lib/github');

const run = async () => {
    let token = github.getStoredGithubToken();
    if (!token) {
        await github.setGithubCredentials();
        token = await github.registerNewToken();
    }
    console.log(token);
};

run();