const CLI = require('clui');
const Configstore = require('configstore');
const Octokit = require('@octokit/rest');
const Spinner = CLI.Spinner;
const SPSP = require('cli-spinner').Spinner;

const inquirer = require('./inquirer');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);


let octokit;
module.exports = {
    getInstance: () => {
        return octokit;
    },

    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit = new Octokit({
            auth: {
                username: credentials.username,
                password: credentials.password,
            }
        });
    },

    registerNewToken: async () => {
        const spinner = new SPSP('%s Procesando...');
        spinner.setSpinnerString('⠋⠙⠚⠓');
        spinner.setSpinnerDelay(250);
        spinner.start();

        try {
            const response = await octokit.oauthAuthorizations.createAuthorization({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginit, the command-line tool for initalizing Git repos'
            });
            const token = response.data.token;
            if (token) {
                conf.set('github.token', token);
                return token;
            } else {
                throw new Error("Missing Token", "GitHub token was not found in the response");
            }
        } catch (err) {
            throw err;
        } finally {
            spinner.stop();
        }
    },

};

/*
    https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
    const status = new Spinner('Authenticating you, please wait...');
    status.start();
    status.stop

*/