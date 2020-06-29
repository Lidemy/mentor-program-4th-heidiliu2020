function join(arr, concatStr) {
    var result = arr[0]
    for (var i = 1; i < arr.length; i++) {
        result += concatStr + arr[i] 
    }
    return result
}

function repeat(str, times) {
    var answer = ''
    for (var i = 1; i <= times; i++) {
        answer += str
    }
    return answer
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));

console.log(join([1, 2, 3], '') )
console.log(join(["a", "b", "c"], "!"))
console.log(join(["aaa", "bb", "c", "dddd"], ',,'))