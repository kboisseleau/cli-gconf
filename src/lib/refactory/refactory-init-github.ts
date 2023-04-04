
import { Octokit } from '@octokit/rest'
import { readFileSync } from 'fs'
import { Files } from '../files.js'
import { ConfigstoreService } from '../service/configstore.service.js'


export class RefactoryInitGithub {
    static init () {
        const conf = ConfigstoreService.getInstance()
        conf.delete()
        
        if (!conf.getStoredGithubToken()) {
            const files = new Files()
            const gconf = files.getGconfJson()
            conf.setdGithubToken(gconf.token)
        }
        
        const octokit = new Octokit({
            auth: conf.getStoredGithubToken()
        })

        return octokit
    }
}