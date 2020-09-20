const v4 = require('uuid/v4');

class User{
    constructor(name, email, id){
        this.email = email;
        this.name = name;
        this.id = id || v4();
    }

    static test(){
        return v4();
    }
}

module.exports = User;