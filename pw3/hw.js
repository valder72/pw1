//1
function maxElementProcedure(arr) {
    console.log("Максимальний елемент у процедурному стилі на основі ітеративного циклу for");
    let max = arr[0];
    if (arr.length === 0) {
        return undefined;
    }
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function maxElementFunction(arr) {
    console.log("Максимальний елемент у функціональному стилі з використанням функції Array.reduce()");
    if (arr.length === 0) {
        return undefined;
    }
    return arr.reduce((max, current) => {
        return current > max ? current : max;
    }, arr[0]);
}

//2

function sortString(str) {
    console.log("Сортування рядків");
    return str.split('').sort().join('');
}

//3

function extramalIncrement() {
    console.log("Екстремальний інкремент");
    let x = Number.MAX_SAFE_INTEGER;
    console.log((x++)<x);
    x = Number.MAX_SAFE_INTEGER + 1;
    console.log((x++)<x);

    x = 2**53 - 1;
    console.log((x++)<x);
    x = 2**53;
    console.log((x++)<x);

    x = 9007199254740991;
    console.log((x++)<x);
    x = 9007199254740992;
    console.log((x++)<x);
}

//4

function intransitiveComparison() {
    console.log("Нетранзитивні порівняння або чому не варто використовувати ==");
    let x = "0";
    let y = 0;
    let z = [];
    console.log(x == y);
    console.log(y == z);
    console.log(x == z);
}

//5

function sumGreaterThanAvarage(arr) {
    console.log("Кращі за посередність");
    if (arr.length === 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let average = sum / arr.length;
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > average) {
            result += arr[i];
        }
    }
    return result;
}

//6

function reverseSortedArray(arr) {
    console.log("Сортування масивів");
    let reversed = [...arr].sort().reverse();
    return reversed;
}

//Test

console.log(maxElementProcedure([1, 2, 3, 4, 5])); 
console.log(maxElementFunction([1, 2, 3, 4, 5]));
console.log(sortString("HelloWorld"));
extramalIncrement();
intransitiveComparison();
console.log(sumGreaterThanAvarage([1, 2, 3, 4, 5]));
console.log(reverseSortedArray([1, 3, 2, 6, 4, 5]));