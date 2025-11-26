//inicializa a biblioteca para fazer a interface
export class Emprestimo {
    //Cria atributos privados (Encapsulamento)
    private _isbnLivro: string;
    private _matriculaMembro: string;
    private _dataEmprestimo: Date;
    private _dataDevolucao?: Date; 

    // O construtor é usado para criar uma nova instância de Livro
    constructor(
        isbnLivro: string,
        matriculaMembro: string,
        //Ao criar a data de empréstimo, já atribui a data atual//
        dataEmprestimo: Date = new Date(), 
        dataDevolucao?: Date
    ) {
        this._isbnLivro = isbnLivro;
        this._matriculaMembro = matriculaMembro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
    }

    //GETTER - Cria um método que pega os valores que estão dentro da classe //
    public get isbnLivro(): string {
        return this._isbnLivro;
    }

    public get matriculaMembro(): string {
        return this._matriculaMembro;
    }

    public get dataEmprestimo(): Date {
        return this._dataEmprestimo;
    }

    public get dataDevolucao(): Date | undefined {
        return this._dataDevolucao;
    }

    //SETTER - Cria um método que altera os valores de dentro da classe //
    public set dataDevolucao(data: Date | undefined) {
        this._dataDevolucao = data;
    }
    
     //Inicializa um método isAtivo para atualizar o status/
    public isAtivo(): boolean {
        return this._dataDevolucao === undefined;
    }

    //Método auxiliar para serializar o Membro//
    //significa transformar o objeto da classse em formato que possa ser lido por arquivo Json//
    public toJSON(): object {
        //Combina os atributos da classe//
        return {
            isbnLivro: this._isbnLivro,
            matriculaMembro: this._matriculaMembro,
            dataEmprestimo: this._dataEmprestimo.toISOString(), 
            dataDevolucao: this._dataDevolucao ? this._dataDevolucao.toISOString() : undefined
        };
    }
}