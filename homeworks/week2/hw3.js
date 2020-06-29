function reverse(str) {
    var answer = ''
    for (var i = 1; i <= str.length; i++) {
        answer += str[str.length - i]
    }
    console.log(answer)
}

reverse('hello');
