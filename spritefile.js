const path = require('path')
const fs = require('fs-extra')
const SVGO = require('svgo')
const svgStore = require('svgstore')
const { svgoConfig, paths } = require('./sprite.config')

const svgo = new SVGO(svgoConfig)

const sprite = svgStore({
  cleanDefs: true,
  cleanSymbols: true,
  svgAttrs: { style: 'display:none' }
})

fs.readdir(paths.src)
  .then(files =>
    files
      .filter(file => /\.svg$/.test(file))
      .map(file => ({
        id: file.replace(/\.svg$/, ''),
        srcPath: path.resolve(paths.src, file)
      }))
  )
  .then(files => {
    files.forEach(({ id, srcPath }) => sprite.add(id, fs.readFileSync(srcPath, 'utf8')))

    svgo
      .optimize(sprite, { path: paths.dest })
      .then(({ data }) => fs.outputFile(paths.dest, data))
      .catch(err => {
        throw err
      })
  })
