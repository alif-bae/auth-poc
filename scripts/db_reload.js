const cmd = require('node-cmd')

// drop db
cmd.run('rm ../development.db.sqlite', (err, data, stderr) => {
    console.log(stderr)
})