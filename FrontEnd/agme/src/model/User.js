import Entity from './Entity';
export default class User extends Entity{
    isComplete(){
        const complete = this.password&&this.username&&this.name&&this.phone&&this.address&&this.role
        return complete;
    }
    
}