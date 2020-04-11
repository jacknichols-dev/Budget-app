import fs from 'fs'
import path from 'path'

const increaseId = () => {
  let count = 0
  return () => {
    return count++
  }
}

const readdirSync = (dir, ...param) => {
  return fs.readdirSync(dir, ...param).map(p => path.join(dir, p))
}

const mkdirsSync = (dir, ...param) => {
  const dirs = dir.split(path.sep)
  let currentDir = ''
  while (dirs.length) {
    currentDir = [currentDir, dirs.shift()].join(path.sep)
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir)
    }
  }
}

const writeFileSync = (file, ...param) => {
  mkdirsSync(path.dirname(file))
  fs.writeFileSync(file, ...param)
}

export default {
  increaseId: increaseId(),
  readdirSync,
  mkdirsSync,
  writeFileSync
}
