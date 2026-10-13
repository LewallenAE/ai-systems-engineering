import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
    .command('curl <url>', 'the default command', () => {}, (argv) => {
        console.info(argv)}
    ) 
    .demandCommand(1)
    .parse();