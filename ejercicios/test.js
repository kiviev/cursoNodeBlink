
var unarray = {0:[
    1,2,false,true,
    ['uno', 'dos', 'tres', true, 
    { 
        0: 'holita', 
        'aquien': 'vecinito' ,
        'objetito' : {'dos' : 'tres'},
        'arraicito':[ 1,2,3,4]
    }, 
    'cuatro', ['str:1.1', 'str:1.2','str:1.3']],
    'string 1','string2'
]}

console.log(unarray);


function recursiva(item){
    const retorno = " \r\n";
    let str='';
    let nivel = 0;
    switch (typeof item) {
        case 'object':
            if (Array.isArray(item)) str += getTabs(nivel) + printArray(item,nivel) + retorno;
            else str += getTabs(nivel) + printObject(item, nivel + 1) + retorno;
            break;
        case 'string':
            str += getTabs(nivel) + printString(item + nivel) + retorno;
        case 'number':
            str += getTabs(nivel) + printNumber(item + nivel) + retorno;
        case 'boolean':
            str += getTabs(nivel) + printBoolean(item + nivel) + retorno;

        default:
            console.log(key + ' no es de ningun tipo conocido');

        break;
    }

    function printObject(object, nivel) {
        let strobj = getTabs(nivel) + 'Object: {' + retorno;
        let i = 0;
        let length = Object.keys(object).length;
        for (let key in object) {
            switch (typeof object[key]) {
                case 'object':
                if (Array.isArray(object[key])) strobj +=  printArray(object[key],nivel + 1);
                else strobj +=  printObject(object[key], nivel + 1 );
                    break;
                case 'string':
                    strobj += getTabs(nivel + 1) + printString( key + ' : ' + object[key],nivel + 1);
                    break;
                case 'number':
                strobj += getTabs(nivel + 1) + printNumber(key + ' : ' + object[key],nivel + 1);
                    break;
                case 'boolean':
                    strobj += getTabs(nivel + 1) + printBoolean(key + ' : ' + object[key],nivel + 1);
                    break;
                default:
                    console.log(key + ' no es de ningun tipo conocido');
                break;
            }
            i++;
            if (i < length) { // is not last item
                strobj += ',' + retorno;
            } else {
                strobj += retorno;
                strobj += getTabs(nivel + 2) + '}';
            }
            
        }
        return strobj;
    }


    function printArray(myarr, nivel) {
        let strarr = getTabs(nivel) + 'Array: [' + retorno;
        let i = 0;
        let length = myarr.length;
        for (let i = 0 ; i < length; i++) {
            switch (typeof myarr[i]) {
                case 'object':
                if (Array.isArray(myarr[i])) strarr += getTabs(nivel ) + printArray(myarr[i] , nivel + 1);
                else strarr += getTabs(nivel ) + printObject(myarr[i], nivel + 1);
                    break;
                case 'string':
                    strarr += getTabs(nivel + 1) + printString(myarr[i],nivel + 1);
                    break;
                case 'number':
                    strarr += getTabs(nivel + 1) + printNumber(myarr[i],nivel + 1);
                    break;
                case 'boolean':
                    strarr += getTabs(nivel + 1) + printBoolean(myarr[i],nivel + 1);
                    break;   
                default:
                    console.log(myarr[i] + ' no es de ningun tipo conocido');     
                break;
            }
            // i++;
            if (i < length -1) { // is not last item
                    strarr += ',' + retorno;
            } else {
                strarr += retorno;
                strarr += getTabs(nivel + 2) + ']';
            }
            
            
        }
        return strarr;
    }

    function getTabs(nivel){
        return Array(nivel).join("\t");
    }
    function printString(string){
        return "String: \"" + string + "\"";
    }

    function printBoolean(bool){
        return "Boolean: " + String(bool);
    }

    function printNumber(number){
        return "Number: " + String(number); 
    }

    return str;
}


console.log( recursiva(unarray))