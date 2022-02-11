module.exports = {
    apps: [{
        args: 'run start serve',
        script: 'src/index.ts'
    }, {
        args: 'run queue SQS',
        script: 'src/worker.js'
    }]
};
