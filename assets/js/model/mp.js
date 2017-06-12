const members = require('../../../data/members.json');

class MP {
    constructor( constituency ) {
        this.constituency = constituency.toLowerCase();
        return this.getMember();
    }

    getMember() {
        for ( let member of members ) {
            if ( member.constituency === this.constituency ) {
                return member;
            }
        }
    }

    sanitizeData( member ) {
        member.email = this.decrypt( member.email );
        return member;
    }
}


module.exports = MP;
