import User from "../User"
const message = {
    id: '', sender: 1, msg: '', canPass: false, type: 0
}

export const welcome_12_0 = [
    {...message, id: 'welcome_12_0-0', sender: 1, msg: 'Pronto'},
    {...message, id: 'welcome_12_0-1', sender: 1, msg: 'A qualquer hora pode me chamar para adicionar tarefas ou objetivos!'},    
]

export const welcome_12_2 = [
    {...message, id: 'welcome_12_2-0', sender: 1, msg: 'Bom, eu irei organizar automaticamente sua agenda/programação'},
    {...message, id: 'welcome_12_2-1', sender: 1, msg: 'Através de alguns algoritmos de organização de tarefas que possuo, poderei montar uma grade para você'},
    {...message, id: 'welcome_12_2-2', sender: 1, msg: 'Tudo isso de forma automática, já que estarei aprendendo sobre sua produtividade!'},
    {...message, id: 'welcome_12_2-3', sender: 1, msg: 'Ainda consigo lhe lembrar do que precisa fazer na hora certa e tenho ferramentas para manter o seu foco.'},
    {...message, id: 'welcome_12_2-4', sender: 0, msg: [
        {type: 0, msg: 'Ótimo, vamos em frente!!', highlight: true}]},
    {...message, id: 'welcome_12_2-5', sender: 1, msg: [welcome_12_0], type: 1},

]

export const welcome_12_1 = [
    {...message, id: 'welcome_12_1-0', sender: 1, msg: 'Sem pânico!'},
    {...message, id: 'welcome_12_1-1', sender: 1, msg: 'Estou aqui para montar sua programação diária, semanal ou mensal'},
    {...message, id: 'welcome_12_1-2', sender: 1, msg: 'Inclusive lhe darei uma força para cumprir seus objetivos pessoais, profissionais e acadêmicos'},
    {...message, id: 'welcome_12_1-3', sender: 1, msg: 'Tudo com base no que sei sobre você e nas metas que me pede para organizar!'},
    {...message, id: 'welcome_12_1-4', sender: 0, msg: [
        {type: 0, msg: 'Ótimo, vamos em frente!!', highlight: true},
        {type: 0, msg: 'Como vai fazer isso?', highlight: false}]},
    {...message, id: 'welcome_12_1-5', sender: 1, msg: [welcome_12_0, welcome_12_2], type: 1},
]

export const welcome = [
    // {...message, id: 'welcome-', msg: [this.expressions.welcomeYes, this.expressions.welcomeNo], sender: 1}, // Essa necessariamente é ultima linha e nunca a primeira
    {...message, id: 'welcome-0',  sender: 1, msg: '${this.expressions.randomExp(this.expressions.exp.greetings)} Meu nome é ${this.botName}!'},
    {...message, id: 'welcome-1',  sender: 1, msg: `Sou seu novo assistente pessoal. Comigo, não há o que se desesperar!`},
    {...message, id: 'welcome-2',  sender: 1, msg: `Mas como posso te chamar?`},
    {...message, id: 'welcome-3',  sender: 0, msg: `Digite aqui..`, callback: 'this.user.setName', type: 1}, // Type 1 = Input User, Msg = Placeholder
    {...message, id: 'welcome-4',  sender: 1, msg: 'Com certeza vamos nos dar bem${(this.user.info.name != undefined) ? ", " + this.user.info.name : ""}! Farei o máximo para organizar sua agenda e lhe ajudar a focar nos seus objetivos da melhor forma possível'},
    {...message, id: 'welcome-5',  sender: 1, msg: `Antes de mais nada, você prefere ser tratado(a) no masculino ou no feminino?`},
    {...message, id: 'welcome-6',  sender: 0, msg: [
        {type: 0, msg: 'Masculino', highlight: false, callback: 'this.user.setGender'}, 
        {type: 0, msg: 'Feminino', highlight: false, callback: 'this.user.setGender'},
        {type: 0, msg: 'Tanto faz', highlight: false, callback: 'this.user.setGender'}]}, // Deve vir antes e depois de uma linha do chatbot necessariamente
    {...message, id: 'welcome-7',  sender: 1, msg: `Ok, agora preciso entender um pouco melhor você`},
    {...message, id: 'welcome-8',  sender: 1, msg: 'Você se sente mais ${this.getGenderWord("produtivo")} em qual período do dia?'},
    {...message, id: 'welcome-9',  sender: 0, msg: [
        {type: 0, msg: 'Pela manhã', highlight: false, callback: 'this.user.setProductivity'},
        {type: 0, msg: 'A tarde', highlight: false, callback: 'this.user.setProductivity'},
        {type: 0, msg: 'De noite', highlight: false, callback: 'this.user.setProductivity'},
        {type: 0, msg: 'Incrivelmente na madrugada', highlight: false, callback: 'this.user.setProductivity'}]},
    {...message, id: 'welcome-10', sender: 1, msg: `Entendido!`},
    {...message, id: 'welcome-11', sender: 1, msg: `Agora sim podemos começar a organizar o seu tempo`},
    {...message, id: 'welcome-12', sender: 0, msg: [
        {type: 0, msg: 'Ótimo, vamos em frente!!', highlight: true},
        {type: 0, msg: 'Não sei como organizar meu tempo..', highlight: false},
        {type: 0, msg: 'Como vai fazer isso?', highlight: false}]},
    {...message, id: 'welcome-13', sender: 1, msg: [welcome_12_0, welcome_12_1, welcome_12_2], type: 1},
]