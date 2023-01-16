require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');
require('dotenv').config();

const {Command} = require('commander');
const program = new Command();

program
    .usage('[options]')
    .option('-t, --text <text>', 'Text to send')
    .option('-c, --channel <channel>', 'Channel to send the message')
    .parse(process.argv);

const options = program.opts();

const {WebClient} = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_BOT_TOKEN);

async function launchScript() {
    try {
        const result = await client.chat.postMessage({
            text: options.text,
            channel: options.channel,
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

launchScript()
    .then(_ => {
        console.log("Script ended");
        process.exit();
    })
    .catch(e => {
        console.log("Script failed: " + e);
        process.exit();
    });
