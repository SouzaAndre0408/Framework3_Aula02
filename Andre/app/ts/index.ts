$(document).ready(function () {
    $('#BotaoImportar').click(function () {
        lerJson();
    })
    $('#BotaoIncluir').click(function () {
        IncluirJson();
    })
    $('#BotaoConsultar').click(function () {
        ConsultarJson();
    })
    $('#BotaoExcluir').click(function () {
        ExcluirJson();
    })
})


function lerJson() {
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", "http://localhost:3000/Universidade");

    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Universidade = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            for (let ny = 0; ny < Universidade.length; ny++) {
                tbody.innerHTML += `<td scope="row">${Universidade[ny].id}</td>` +
                    `<td scope="row">${Universidade[ny].Descricao}</td>` +
                    `<td scope="row">${formataData(Universidade[ny].Data)}</td>` +
                    `<td scope="row">${formataValorReais(Universidade[ny].Valor)}</td>` +
                    `<td scope="row">${Universidade[ny].Optativa}</td>`;
            }
        }
    }
    xmlhttp2.send();
}

function IncluirJson() {
    let Numero = (<HTMLInputElement>document.getElementById('Numero')).value;
    let Descricao = (<HTMLInputElement>document.getElementById('Descricao')).value;
    let Data = (<HTMLInputElement>document.getElementById('Data')).value;
    let Valor = parseFloat((<HTMLInputElement>document.getElementById('Valor')).value);
    let Optativa = (<HTMLInputElement>document.getElementById('Optativa')).value;

    let tbody = document.getElementById("Resultados");

    tbody.innerHTML += `<td scope="row">${Numero}` +
        `<td scope="row">${Descricao}` +
        `<td scope="row">${formataData(Data)}` +
        `<td scope="row">${formataValorReais(Valor)}` +
        `<td scope="row">${Optativa}`;
    let Titulo = {
        id: Numero,
        Descricao: Descricao,
        Data: Data,
        Valor: Valor,
        Optativa: Optativa
    };

    let json = JSON.stringify(Titulo);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/Universidade", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

}

function ConsultarJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let Numero = (<HTMLInputElement>document.getElementById("Numero")).value;
    xmlhttp2.open("GET", "http://localhost:3000/Universidade/" + Numero, true);
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Universidade = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            tbody.innerHTML = `<td scope="row">${Universidade.id}</td>` +
                `<td scope="row">${Universidade.Descricao}</td>` +
                `<td scope="row">${formataData(Universidade.Data)}</td>` +
                `<td scope="row">${formataValorReais(Universidade.Valor)}</td>` +
                `<td scope="row">${Universidade.Optativa}</td>`;
        }
    };
    xmlhttp2.send();
}

function ExcluirJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let Numero = (<HTMLInputElement>document.getElementById("Numero")).value;
    xmlhttp2.open("DELETE", "http://localhost:3000/Universidade/" + Numero, true);
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Título excluído com sucesso.");
        }
    }
    xmlhttp2.send();

}

function formataData(str: string) {
    return str.split("-").reverse().join("/");
}

function formataValorReais(valor: number) {
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" });
}