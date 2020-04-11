import fs from 'fs'
import path from 'path'
import jsonfile from 'jsonfile'

const defaultConfig = {
  url: '/',
  post: './post',
  public: './public'
}

const cwd = process.cwd()

const configFilePath = path.join(cwd, './post-config.json')

let config = {
  ...defaultConfig
}

// post-config.json exists
if (fs.existsSync(configFilePath)) {
  config = {
    ...config,
    ...jsonfile.readFileSync(configFilePath)
  }
}

export default {
  ...config,
  post: path.join(cwd, config.post),
  public: path.join(cwd, config.public)
}
