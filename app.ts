let balance = 0;
let repeat = true;
const statement: { operation: 'Depósito' | 'Saque', amount: number, balance: number }[] = [

];

const utilities = {
    //confirmar o cancelamento
    cancel: function () {
        const response = confirm('Deseja realmente cancelar?');
        //se nao for true - ele cancela o cancelamento;
        if (!response) return response;
        //
        alert('Operação cancelada.')
        return response;
    },
    //==========================================================================

    verify: function (value: string | any) {
        if (value === '') return alert('É necessário digitar um nùmero.');

        else if (!(value > 0)) return alert('Digite um valor válido.');

        return true;
    }
}

//objeto - menu contém 
const operations = {
    check: function () {
        alert('Saldo atual: R$' + balance);
    },

    deposit: function (): void {
        const amount = prompt('Depositar \n\nDigite o valor:');

        if (amount === null) {
            const result = utilities.cancel();//linha 09--------------------------------------------------------

            if (!result) operations.deposit();

            return;
        }

        const parsed = utilities.verify(amount);
        if (!parsed) return operations.deposit();


        balance += +amount;
        operations.check();

        statement[statement.length] = {
            operation: 'Depósito',
            amount: +amount,
            balance//foi omitido o :balance
        }
    },

    cachout: function (): void {
        const amount = prompt('Sacar \n\nDigite o valor:');

        if (amount === null) return;
        const result = utilities.cancel();

        if (!result) return operations.cachout();

        const parsed = utilities.verify(amount);


        if (!parsed) return operations.cachout();

        if (+amount > balance) return operations.cachout();

        balance -= +amount;
        //  operations.cachout();
        statement[statement.length] = {
            operation: 'Saque',
            amount: +amount,
            balance//:balance omitido

        }
    },

    statement: function () {
        let message = 'Extrato\n\n';

        if (statement.length === 0) return alert(message += 'Nenhuma movimentação realizada.');

        for (let i = 0; i < statement.length; i++) message += statement[i].operation + ': R$' + statement[i].amount + ' === Saldo: R$ ' + statement[i].balance + '\n'

        alert(message);
    },

     exit: function () {
        const response = confirm('Voc~e deseja realmente sair?');

        if (!response) return;

        repeat = false;

        alert('Foi um prazer atendê-lo.');
    },

    invalid: function () {
        alert('Digite uma opção válida.');
    }
};


function run() {
    const username = prompt('Digite seu nome:');  //pergunta o nome

    if (username === null) {                       //trata 1° o cancelar(null)
        const response = confirm('Deseja realmente cancelar?');//confirm arma boll(true/false)
        //if (execulta o true) se response é false(!)
        if (!response) run();                        

        return;
    }

    alert('Operação cancelada.');
    run();

    //expressao ternária p perguntar nome
    const parseName = username ? username : 'usuário';
    alert('Olá, ' + parseName + '! Bem vindo ao Simba.');


    //repete o menu e dá opções de escolha
    while (repeat) {
        const operation = prompt('Selecione uma operação:\n\n1. Consultar\n2. Depositar\n3. Sacar\n4. Extrato\n 5. Sair');

        if (operation === null) {                       //trata 1° o cancelar(null)
            const response = confirm('Deseja realmente cancelar?');//confirm arma boll(true/false)

            if (!response) continue;                           //if (execulta o true) se response é false(!)

            return;
        }
        //_______________________________________________________________________________________

        if (operation === null) {
            const response = utilities.cancel();

            //volta direto ao while
            if (!response) continue;

            return;
        }

        const parsed = utilities.verify(operation);
        if (!parsed) continue;

        switch (+operation) {
            case 1: operations.check(); break;
            case 2: operations.deposit(); break;
            case 3: operations.cachout(); break;
            case 4: operations.statement(); break;
            case 5: operations.exit(); break;
            default: operations.invalid();
        }
    }
}

run();
