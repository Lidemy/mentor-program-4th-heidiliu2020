function capitalize(str) {
    var answer = ''
    if (str[0] >= 'a' && str[0] <= 'z') {
        answer = String.fromCharCode(str.charCodeAt(0) - 32)
        for (var i = 1; i < str.length; i++) {
            answer += str[i]
        }
    } else {
        answer = str
    }
    return answer
}

console.log(capitalize('hello'));
