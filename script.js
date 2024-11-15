document.addEventListener('DOMContentLoaded', function() {
  var reflections = {
      "sou": "é",
      "estou": "está",
      "estava": "estava",
      "eu": "você",
      "eu faria": "você faria",
      "eu tenho": "você tem",
      "eu irei": "você irá",
      "faço": "faz",
      "tenho": "tem",
      "fará": "farei",
      "vou": "vai",
      "irei": "irá",
      "meu": "seu",
      "minha": "sua",
      "é": "sou",
      "você tem": "eu tenho",
      "você irá": "eu irei",
      "você fará": "eu farei",
      "seu": "meu",
      "seus": "meus",
      "me": "se",
      "você": "eu",
  };

  var psychobabble = [
      [ /preciso (.*)/i,
        [ "Por que você precisa {0}?",
          "Realmente ajudaria se você tivesse {0}?",
          "Tem certeza que você necessita de {0}?" ]],

      [ /por que você não ([^\?]*)\??/i,
        [ "Você realmente acha que eu não {0}?",
          "Talvez, qualquer hora eu irei {0}.",
          "Você realmente quer que eu {0}?" ]],

      [ /por que eu não posso ([^\?]*)\??/i,
        [ "Você acha que você deveria ser capaz de {0}?",
          "Se você pudesse {0}, o que você faria?",
          "Eu não sei -- Por que você não {0}?",
          "Você já tentou mesmo?" ]],

      [ /não posso (.*)/i,
        [ "Como você sabe que não pode {0}?",
          "Talvez você possa {0} se você tentar.",
          "O que você precisa para conseguir {0}?" ]],

      [ /estou (.*)/i,
        [ "Você veio até aqui porque você está {0}?",
          "Há quanto tempo você está {0}?",
          "Como você se sente por estar {0}?" ]],

      [ /você é ([^\?]*)\??/i,
        [ "Importa se sou {0}?",
          "Você preferiria que eu não fosse {0}?",
          "Talvez você acredite que sou {0}.",
          "Pode ser que eu seja {0} -- O que você acha?" ]],

      [ /você está ([^\?]*)\??/i,
        [ "Importa se estou {0}?",
          "Você preferiria que eu não estivesse {0}?",
          "Talvez você acredite que estou {0}.",
          "Pode ser que eu esteja {0} -- O que você acha?" ]],

      [ /o que (.*)/i,
        [ "Por que você pergunta?",
          "Como é que uma resposta a esta pergunta ajudaria você?",
          "O que você acha?" ]],

      [ /como (.*)/i,
        [ "Como você acha que é isso?",
          "Talvez você mesmo possa responder à sua pergunta.",
          "O que realmente você quer perguntar?" ]],

      [ /porque (.*)/i,
        [ "Esta é a verdadeira razão?",
          "Que outras razões vêm na sua mente?",
          "Esta razão pode se aplicar a algo mais?",
          "Se {0}, o que mais pode ser verdade?" ]],

      [ /(.*) desculpe (.*)/i,
        [ "Há muitas vezes que não precisamos pedir desculpas.",
          "O que você sente quando pede desculpas?" ]],

      [ /olá(.*)/i,
        [ "Olá... Estou feliz por você passar aqui hoje.",
          "Olá... Como você está hoje?",
          "Oi, como vai hoje?" ]],

      [ /oi(.*)/i,
        [ "Olá... Estou feliz por você passar aqui hoje.",
          "Olá... Como você está hoje?",
          "Oi, como vai hoje?" ]],

      [ /acho (.*)/i,
        [ "Você duvida que {0}?",
          "Você realmente acha isso?",
          "Mas você não tem certeza que {0}?" ]],

      [ /penso (.*)/i,
        [ "Você duvida que {0}?",
          "Você realmente acha isso?",
          "Mas você não tem certeza que {0}?" ]],

      [ /(.*) amigo (.*)/i,
        [ "Fale mais sobre seus amigos.",
          "Quando você pensa em um amigo, o que vem na sua mente?",
          "Por que você não me fala mais sobre um amigo de infância?" ]],

      [ /(.*) amiga (.*)/i,
        [ "Fale mais sobre suas amigas.",
          "Quando você pensa em uma amiga, o que vem na sua mente?",
          "Por que você não me fala mais sobre uma amiga de infância?" ]],

      [ /sim/i,
        [ "Você parece muito certo disso.",
          "OK, mas você pode me contar mais?" ]],

      [ /(.*) computador(.*)/i,
        [ "Você realmente está falando de mim?",
          "Parece estranho falar com um computador?",
          "Como computadores fazem você se sentir?",
          "Você se sente ameaçado por computadores?" ]],

      [ /(.*) robô(.*)/i,
        [ "Você realmente está falando de mim?",
          "Parece estranho falar com um robô?",
          "Como robôs fazem você se sentir?",
          "Você se sente ameaçado por robôs?" ]],

      [ /(.*) bot(.*)/i,
        [ "Você realmente está falando de mim?",
          "Parece estranho falar com um bot?",
          "Como bots fazem você se sentir?",
          "Você se sente ameaçado por bots?" ]],

      [ /é (.*)/i,
        [ "Você acha que é {0}?",
          "Quem sabe é {0} -- O que você acha?",
          "Se fosse {0}, o que você faria?",
          "Poderia bem ser que {0}.",
          "Você parece ter muita certeza disso.",
          "Se eu dissesse a você que isso provavelmente não é {0}, o que você sentiria?" ]],

      [ /você pode ([^\?]*)\??/i,
        [ "O que faz você pensar que não posso {0}?",
          "Se eu pudesse {0}, o que aconteceria então?",
          "Por que você pergunta se eu posso {0}?" ]],

      [ /posso ([^\?]*)\??/i,
        [ "Talvez você não queira {0}.",
          "Você quer ser capaz de {0}?",
          "Se você pudesse {0}, você faria?" ]],

      [ /você é (.*)/i,
        [ "Por que você acha que eu sou {0}?",
          "Você teria prazer em pensar que sou {0}?",
          "Talvez você gostaria que eu fosse {0}.",
          "Talvez você realmente esteja falando de você mesmo?",
          "Por que você diz que eu sou {0}?",
          "Por que você pensa que eu sou {0}?",
          "Estamos falando sobre você ou sobre mim?" ]],

      [ /eu não (.*)/i,
        [ "Você realmente não {0}?",
          "Por que você não {0}?",
          "Você não quer {0}?" ]],

      [ /sinto (.*)/i,
        [ "Bom, conte-me mais sobre estes sentimentos.",
          "Você sente {0} com frequência?",
          "Normalmente, quando você sente {0}?",
          "Quando você sente {0}, o que você faz?" ]],

      [ /tenho (.*)/i,
        [ "Por que você me diz que você tem {0}?",
          "Você realmente tem {0}?",
          "Agora que você tem {0}, qual será o próximo passo?" ]],

      [ /teria (.*)/i,
        [ "Poderia explicar por que você teria {0}?",
          "Por que você teria {0}?",
          "Quem mais sabe que você teria {0}?" ]],

      [ /existe (.*)/i,
        [ "Você acha que existe {0}?",
          "É provável que exista {0}.",
          "Você gostaria que houvesse {0}?" ]],

      [ /meu (.*)/i,
        [ "Entendo, seu {0}.",
          "Por que você diz que seu {0}?",
          "Quando seu {0}, como você se sente?" ]],

      [ /você (.*)/i,
        [ "Deveríamos estar discutindo sobre você, não sobre mim.",
          "Por que você fala isso de mim?",
          "Por que você se importa que eu {0}?" ]],

      [ /por que (.*)/i,
        [ "Por que você não me diz a razão de {0}?",
          "Por que você pensa {0}?" ]],

      [ /quero (.*)/i,
        [ "O que significaria para você - conseguir {0}?",
          "Por que você quer {0}?",
          "E se você não conseguir {0}, o que você vai fazer?" ]],

      [ /(.*) mãe(.*)/i,
        [ "Diga mais sobre sua mãe.",
          "Fale sobre seu relacionamento com sua mãe?",
          "Como você se sente sobre a sua mãe?",
          "Como isto tem a ver com seus sentimentos agora?",
          "Boas relações na família são importantes." ]],

      [ /(.*) pai(.*)/i,
        [ "Diga mais sobre seu pai.",
          "Como pensar em seu pai faz você se sentir?",
          "Como você se sente sobre seu pai?",
          "Seu relacionamento com seu pai tem a ver com o que você sente agora?",
          "Você tem algum problema em mostrar carinho pela sua família?" ]],

      [ /(.*) criança(.*)/i,
        [ "Você teve amigos próximos quando era criança?",
          "Qual sua memória favorita da infância?",
          "Você lembra de sonhos ou pesadelos da infância?",
          "Na sua infância, outras crianças provocavam você?",
          "Como você acha que suas experiências de infância se encaixam com o que você sente hoje?" ]],

      [ /(.*)\?/i,
        [ "Por que você pergunta isso?",
          "Por favor, avalie se você mesmo é capaz de responder esta pergunta.",
          "Quem sabe a resposta está dentro de você mesmo?",
          "Por que você não me diz a resposta?" ]],

      [ /sair/i,
        [ "Obrigado por conversar comigo.",
          "Adeus.",
          "Obrigado, a consulta custará R$150 :) Brincadeira! Até mais." ]],

      [ /(.*)/i,
        [ "Por favor, conte mais.",
          "Você pode me explicar com mais detalhes?",
          "Por que?",
          "Entendo.",
          "O que isto quer dizer?",
          "Você diz: {0}. Muito interessante.",
          "{0}. E o que lá no fundo isto quer dizer?",
          "Entendo. E o que isto diz a você?",
          "Como você se sente quando você fala isso?" ]]
  ];

  function reflect(fragment) {
      var tokens = fragment.toLowerCase().split(/\b/);
      for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (reflections[token]) {
              tokens[i] = reflections[token];
          }
      }
      return tokens.join('');
  }

  function analyze(statement) {
      for (var i = 0; i < psychobabble.length; i++) {
          var pattern = psychobabble[i][0];
          var responses = psychobabble[i][1];
          var match = pattern.exec(statement);
          if (match) {
              var response = responses[Math.floor(Math.random() * responses.length)];
              var result = response;
              if (match.length > 1) {
                  for (var j = 1; j < match.length; j++) {
                      result = result.replace('{' + (j - 1) + '}', reflect(match[j]));
                  }
              }
              return result;
          }
      }
      return "Desculpe, não entendi.";
  }

  function main() {
      var chatlog = document.getElementById('chatlog');
      var userInput = document.getElementById('user-input');
      var sendButton = document.getElementById('send-button');

      function addMessage(sender, message) {
          var messageElement = document.createElement('div');
          messageElement.className = sender;
          messageElement.textContent = message;
          chatlog.appendChild(messageElement);
          chatlog.scrollTop = chatlog.scrollHeight;
      }

      addMessage('eliza', "Olá. Como você está hoje?");

      sendButton.addEventListener('click', function() {
          var statement = userInput.value;
          if (statement.trim() === '') return;
          addMessage('user', statement);
          var response = analyze(statement);
          addMessage('eliza', response);
          userInput.value = '';
          if (/sair/i.test(statement)) {
              sendButton.disabled = true;
              userInput.disabled = true;
          }
      });

      userInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
              sendButton.click();
          }
      });
  }

  main();
});
