#!/usr/bin/env node
import { Github } from "../src/lib/github.js";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { Repos } from "../src/lib/repo.js";
clear();
console.log(chalk.yellow(figlet.textSync("Gconf", { horizontalLayout: "full" })));
new Github();
const run = async () => {
    try {
        const repo = new Repos();
        const url = await repo.createRemoteRepo();
        await repo.createGitignore();
        await repo.setupRepo(url);
        console.log(chalk.green("All done!"));
    }
    catch (err) {
        if (err) {
            switch (err.status) {
                case 401:
                    console.log(chalk.red("Couldn\"t log you in. Please provide correct credentials/token."));
                    break;
                case 422:
                    console.log(chalk.red("There is already a remote repository or token with the same name"));
                    break;
                default:
                    console.log(chalk.red(err));
            }
        }
    }
};
run();
//# sourceMappingURL=index.js.map