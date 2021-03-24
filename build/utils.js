const path = require('path')
const glob = require('glob')

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

function getEntry(appDir, pattern) {
  const files = glob.sync(path.join(resolve('src'), pattern))
  return files.reduce((acc, file_path) => {
    const info = path.parse(file_path)
    const key = `${info.dir.slice(appDir.length + 1)}/${info.name}`
    acc[key] = path.resolve(file_path)
    return acc
  }, {})
}

module.exports = {
  resolve,
  getEntry
}
