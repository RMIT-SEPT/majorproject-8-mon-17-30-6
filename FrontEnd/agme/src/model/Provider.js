import Entity from './Entity';
import Employee from './Employee'
export default class Provider extends Entity{
    constructor(data){
        super(data);
        if(data.employees){
            this.employees = data.employees.map(employee=>{return new Employee(employee)});
        }
    }

    formattedProvider(){
        let data = JSON.parse(JSON.stringify(this));
        if(data.employees.length===1){
            data.employees = data.employees[0].name
        }else if(data.employees.length>1){
            let string = ""
            for(let i = 0; i<data.employees.length-1;i++){
                string = string + data.employees[i].name+", "
            }
            string = string + data.employees[data.employees.length-1].name;
            data.employees = string;
        }else{
            data.employees = "No employees registered";
        }
        return data;
    }
}