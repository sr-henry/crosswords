/*

	Titulo: CrossWordsGenerator	
	Autor: 	Henrique Campiotti Marques
	GitHub: github.com/sr-henry
	Data: 	26/NOV/2018

*/

var palavras = ['TALLINN','MOUNTAIN','RIGA','SMARTY','CHEESE','COW','BICYCLE','GREEN','LINUX','ZEPPELIN','GOOGLE','ESTONIA','DOG','LATVIA','HELLO','PEOPLE'];
var dicas 	 = ['DICA1','DICA2','DICA3','DICA4','DICA5','DICA6','DICA7','DICA8','DICA9','DICA10','DICA11','DICA12','DICA13','DICA14','DICA15','DICA16']; 

var grid = [];

var linhas = 15;
var colunas = 30;

var coord = [];
var dicoord = [];

function shuffle(array) {

  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }
    return true;
}

function criaMatriz(){
    for (var i = 0; i < linhas; i++) {
        grid[i] = [];
        for (var j = 0; j < colunas; j++) {
            grid[i][j] = 0;
        }
    }
}

function display() {
	document.write("<h3>##Matriz##</h3>")
	for (var i = 0; i < linhas; i++) {
		for (var j = 0; j < colunas; j++) {
			document.write(grid[i][j] +"    ");
		}
		document.write("<br />");
	}
}

function generate(firstword) {

	var mode = false;
	var valid;
	var j;
	var lin;
	var col;
	var current;
	var matches;
	var currentword = firstword;

	for (var i = 1; i < palavras.length; i++) {

		matches = letterMatch(currentword, palavras[i]);

		if (!isEmpty(matches)) { 

			current = coord[i-1];

			if (!current) { 
				current = coord[coord.length-1]; 
			}

			j = 0;

			while (j < matches.length){ 
				if (mode) {
					lin = parseInt(current[0]-matches[j][1]);
					col = parseInt(current[1]+matches[j][0]);
				}
				else {
					lin = parseInt(current[0]+matches[j][0]);
					col = parseInt(current[1]-matches[j][1]);
				}

				valid = validate_place(lin, col, palavras[i], mode);

				if (valid) {

					if (mode) { place(lin, col, palavras[i], mode); }
					else { place(lin, col, palavras[i], mode); }

					currentword = palavras[i];

					if (mode) { mode = false; }
					else { mode = true; }

					break;
				}
				else{
					j++;
				}
			}
		}
	}
}

function place(lin, col, word, vertical){
	var l = lin;
	var c = col;

	document.write("Function Place: " + word + " == [" + lin + " : " +col + "] <br/>");

	for (var i = 0; i < word.length; i++) {
		grid[lin][col] = word[i];
		if (vertical) { lin++; }
		else { col++; }
	}

	coord.push([l, c]);
	dicoord.push(dicas[palavras.indexOf(word)]);
}

function validate_place(lin, col, word, vertical) {
	if (lin < 0 || lin > linhas || col < 0 || col > colunas) {
		return false;
	}
	for (var i = 0; i <= word.length; i++) {
		if (grid[lin][col]!=0 && grid[lin][col]!=word[i]) {
			return false;
		}
		if (vertical) { lin++; if (lin == linhas) { return false; } }
		else { col++; if (col == colunas) { return false; } }
	}
	return true;
}

function letterMatch(palavra1, palavra2) {
	matches = [];
	for (var i = 0; i < palavra1.length; i++) {
		for (var j = 0; j < palavra2.length; j++) {
			if (palavra1[i] == palavra2[j]) {
				matches.push([palavra1.indexOf(palavra1[i]), palavra2.indexOf(palavra2[j])]);
			}
		}
	}
	return matches;
}

function main() {

	criaMatriz();

	palavras = shuffle(palavras);

	firstword = palavras[0];

	document.write("<h3>##Genrate##</h3>");

	place(3, 10, firstword, true);
	
	generate(firstword);
	
	display();

	document.write("<h3>##Dicas##</h3>");
	for (var i = 0; i < dicoord.length; i++) {
		document.write(dicoord[i] + "<br/>");
	}

}

function inicializar(){
    var tabela = document.getElementById("palavras_cruzadas");

    main();

    dadoMatriz = grid;

        for (var i=0 ; i < dadoMatriz.length ; i++){
            var linha = tabela.insertRow(-1);
            var dadoLinha = dadoMatriz[i];

            for(var j=0 ; j < dadoLinha.length ; j++){
                var cel = linha.insertCell(-1);

                if(dadoLinha[j] != 0){
                    var textoID = String('texto' + '_' + i + '_' + j);
                    cel.innerHTML ='<input type="text" class="formulario" style="text-transform: uppercase" maxlength="1" ' + 'id="' + textoID + '">';
                } else {
                    cel.style.backgroundColor = "black";
                }
            }
        }
        numeros_Dica();
    }

function numeros_Dica(){
	for (var i = 0; i < coord.length; i++) {
		document.getElementById("texto_"+coord[i][0]+"_"+coord[i][1]).placeholder = i+1;
	}
    
}

function checar() {
	for (var i = 0; i < linhas; i++) {
		for (var j = 0; j < colunas; j++) {
			if (grid[i][j] != 0) {
				var elemento = document.getElementById('texto' + '_' + i + '_' + j);
				var letra = elemento.value;
				letra = letra.toUpperCase();
					if (letra != grid[i][j]) {
						elemento.style.backgroundColor = 'red';
					} 
					else {
						elemento.style.backgroundColor = 'green';
					}
				} 
			}
	}
}

function limpar() {
	for (var i = 0; i < linhas; i++) {
		for (var j = 0; j < colunas; j++) {
			if (grid[i][j] != 0) {
				var elemento = document.getElementById('texto' + '_' + i + '_' + j);
					elemento.style.backgroundColor = 'white';
				} 
			}
	}
}
