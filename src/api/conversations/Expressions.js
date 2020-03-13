export default class Expressions {
    exp = {
        greetings: [
            'Olá! Tudo bem?',
            'Olá!',
            'Olá, como vai?',
        ],
        understood: [
            'Entendido!',
            'Hm, entendi.',
            'Certo.'
        ]
    }

    genderWords = {
        'produtivo': ['produtivo', 'produtiva']
    }

    randomExp = (list) => {
        return list[Math.floor(Math.random() * list.length)]
    }

    getGenderWord = (word, gender) => {
        console.log(word, gender, this.genderWords[word][gender])
        switch(gender) {
            case 0:
            case 1:
                return this.genderWords[word][gender]
            case 3:
                return this.randomExp(this.genderWords[word])
            default:
                return this.genderWords[word][0]
        }
    }
}