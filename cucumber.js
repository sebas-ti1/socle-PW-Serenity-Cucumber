module.exports = {
    default: {
      format: ['@serenity-js/cucumber'],
      formatOptions: {
          specDirectory: './features'
      },
      requireModule: ['ts-node/register'],
      require: [
          './features/**/*.steps.ts',
          './features/support/*.config.ts',
      ]
    }
  }