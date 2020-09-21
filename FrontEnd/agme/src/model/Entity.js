export default class Entity{
    constructor(data){
        data&&Object.keys(data).forEach(key=>{
            this[key] = data[key]
        })
    }

    setField(key, value){
        this[key] = value;
    }


}