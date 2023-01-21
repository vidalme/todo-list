// adicionar uma nova tarefa
// cria lista de tarefas
// cada campo tarefa tem: nome da tarefa, botao de apagar e botao de completar
// nova tarefa pode ser removida ou completa
// removida é removida da lista e apgada da tela
// completada é removida da lista e adicionada a uma lista embaixo de tarefas completas

function escopo(){

    const novaTarefaIn = document.querySelector('.tarefa-input');
    const botaoAdicionar = document.querySelector('.adiciona-botao'); 
    const listaTarefas = document.querySelector('.tarefas-lista');

    botaoAdicionar.addEventListener('click',function(e){
        if(!novaTarefaIn.value) return;
        criarNovaTarefa(novaTarefaIn.value);
    });

    novaTarefaIn.addEventListener('keypress',function(e){
        if( e.keyCode === 13 && novaTarefaIn.value ) criarNovaTarefa();
    });

    function criarHTML(t){

        //div dentro
        t.div = document.createElement('div');
        t.div.style.display = 'flex';
        t.div.style.alignItems = 'center';

        //novo item na lista
        const elli = document.createElement('li');
        elli.className = 'li-tarefa';
        elli.style.fontSize = '14px';
        elli.style.marginRight = '20px';
        elli.innerText = novaTarefaIn.value; 

        // botao completar tarefa
        const tcbt = document.createElement('button');
        tcbt.addEventListener('click',completaTarefa);

        tcbt.style.width = '80px';
        tcbt.style.height = '90%';
        tcbt.innerText = '+ Cumprida';
        tcbt.style.fontSize = '12px';
        tcbt.style.marginRight = '5px';
        
        // botao remover tarefa
        const trbt = document.createElement('button');
        trbt.addEventListener('click',removeTarefa);
        
        trbt.innerText = '- Remover';
        trbt.style.width = '80px';
        trbt.style.height = '90%';
        trbt.style.fontSize = '12px';

        //adicionando elemntos na div que segura todos
        t.div.appendChild(elli);
        t.div.appendChild(tcbt);
        t.div.appendChild(trbt);

        //adiona div dentro <UL> com todas tarefas
        listaTarefas.appendChild(t.div);
        salvarTarefas();

        //devolve uma referencia a div
        return t.div;
        
    }
    function cleanInput(){
        novaTarefaIn.value = '';
        novaTarefaIn.focus();
    }

    function criarNovaTarefa(nomeTarefa){
        const tarefa = {
            nome: nomeTarefa,
            div:null,
        };
        criarHTML(tarefa);
        cleanInput();
    }

    function removeTarefa(e){
        e.target.parentElement.remove();
        salvarTarefas();
    }

    function completaTarefa(e){
        const ulTF = document.querySelector('.tarefas-completas');
        const liTF = document.createElement('li');
        ulTF.prepend(liTF);
        const tfc = e.target.parentElement.querySelector('.li-tarefa').innerText;
        liTF.innerText = tfc;
        removeTarefa(e);
    }

    function salvarTarefas(){
        const lt = listaTarefas.querySelectorAll('li')
        const tarefasArray = [];
        for(let t of lt)
        {
            let tarefaTexto = t.innerText;
            tarefasArray.push(tarefaTexto)
        }
        const tarefasJSON = JSON.stringify(tarefasArray);
        localStorage.setItem('listaTarefas',tarefasJSON);       
    }

    function carregarTarefasSalvas(){
        const tarefasSalvas = localStorage.getItem('listaTarefas');
        console.log(tarefasSalvas)
       
        const a = JSON.parse(tarefasSalvas);

        for ( let t of a ){
            console.log(t)
            criarNovaTarefa(t)
        }
    }

    carregarTarefasSalvas()

}

escopo();