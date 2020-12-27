const exec = require('await-exec')

// reload_database drops the existing database if found and reinitialized it by running all migrations and seeders
async function reload_database() {
    const drop_db_cmd = 'rm development.db.sqlite'
    const db_migrate_cmd = 'npx sequelize db:migrate'
    const db_seed_cmd = 'npx sequelize --seeders-path seeders/ db:seed:all'

    console.log('1) Dropping DB...')
    await exec(drop_db_cmd)

    console.log('2) Running Migrations...')
    await exec(db_migrate_cmd)

    console.log('3) Seeding DB...')
    await exec(db_seed_cmd)

    console.log('- Success!')
}

reload_database()