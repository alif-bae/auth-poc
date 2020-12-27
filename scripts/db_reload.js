const exec = require('await-exec')


async function reload_database() {
    const drop_db_cmd = 'rm development.db.sqlite'
    const db_migrate_cmd = 'npx sequelize db:migrate'
    const db_seed_cmd = 'npx sequelize --seeders-path seeders/ db:seed:all'

    console.log('Drop DB...')
    await exec(drop_db_cmd)

    console.log('Run Migrations...')
    await exec(db_migrate_cmd)

    console.log('Seed DB...')
    await exec(db_seed_cmd)

    console.log('Success!')
}

reload_database()