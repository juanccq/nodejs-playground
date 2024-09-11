const getUser = require('./User');
console.log('from team');
console.log(getUser());

function getTeam() {
    return 'coders';
}

module.exports = getTeam;

