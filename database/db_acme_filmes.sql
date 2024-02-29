create database db_acme_filmes_turma_bb;
use db_acme_filmes_turma_bb;

create table tbl_filme(
id int not null auto_increment primary key,
nome varchar(80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float,

unique key (id),
unique index (id)
);

insert into tbl_filme(nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario)values
('MidWay - Batalha em Alto Mar',
 'O filme traz a perspectiva de soldados e aviadores (americanos e japoneses) que lutaram bravamente durante a Batalha de Midway, no Oceano Pacífico em junho de 1942. Através de mensagens codificadas, a Marinha Americana conseguiu identificar a localização e o horário dos ataques previstos pela Marinha Imperial Japonesa. Até hoje a disputa é considerada pelos historiadores como um dos pontos mais relevantes para o fim da Segunda Guerra Mundial.',
 '02:19:00',
 '2019-11-20',
 null,
 'https://br.web.img3.acsta.net/c_310_420/pictures/19/09/26/09/18/5374630.jpg',
 '20.00'),
 
('Bastardos Inglórios',
'Em Bastardos Inglórios, na Segunda Guerra Mundial, a França está ocupada pelos nazistas. O tenente Aldo Raine (Brad Pitt) é o encarregado de reunir um pelotão de soldados de origem judaica, com o objetivo de realizar uma missão suicida contra os alemães. O objetivo é matar o maior número possível de nazistas, da forma mais cruel possível. Paralelamente Shosanna Dreyfuss (Mélanie Laurent) assiste a execução de sua família pelas mãos do coronel Hans Landa (Christoph Waltz), o que faz com que fuja para Paris. Lá ela se disfarça como operadora e dona de um cinema local, enquanto planeja um meio de se vingar.',
'02:33:00',
'2009-10-09',
null,
'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/43/36/20096333.jpg',
'50.00');

show tables;
desc tbl_filme;
drop table tbl_teste;
select * from tbl_filme;

select * from tbl_filme where nome like 'M%';