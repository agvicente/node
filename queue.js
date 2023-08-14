function testeQueue() {
  console.log('Inicio');

  setTimeout(() => console.log('setTimeout'), 0);

  console.log('Meio');

  Promise.resolve().then(() => console.log('Promisse 1'));

  console.log('Fim');
}

export default function testeQueue();