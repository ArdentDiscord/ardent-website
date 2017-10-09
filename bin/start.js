import chalk from 'chalk';

/* eslint-disable no-console */
const start = args => {
  const isProd = args[2] === '--prod';
  const date = new Date();
  console.log(
    chalk.bgCyan(chalk.grey('Starting...\n'), chalk.bold(`${date.getHours()}`))
  );
  console.log(
    `It's a start case. It also happens to be in production? ${isProd}`
  );
};
const lint = () => {
  console.log("It's a lint case");
};

const main = args => {
  const isStart = args[2] == null;
  const isLint = args[2] === '--lint';
  switch (true) {
    case isStart:
      start(args);
      break;
    case isLint:
      lint(args);
      break;
    default:
      start(args);
      break;
  }
};

main(process.argv);
