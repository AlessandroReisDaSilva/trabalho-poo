//Cria a classe Livro com seus atributos, getters, setters e métodos auxiliares
export class Livro {
    //Cria atributos privados (Encapsulamento)
    private _titulo: string;
    private _autor: string;
    private _isbn: string; 
    private _anoPublicacao: number;
    private _disponivel: boolean; 

    // O construtor é usado para criar uma nova instância de Livro
    constructor(
        titulo: string,
        autor: string,
        isbn: string,
        anoPublicacao: number,
        disponivel: boolean = true // Por padrão, um novo livro está disponível
    ) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
        this._anoPublicacao = anoPublicacao;
        this._disponivel = disponivel;
    }

    //GETTER - Cria um método pega os valores que estão dentro da classe //
   
    public get titulo(): string {
        return this._titulo;
    }

    public get autor(): string {
        return this._autor;
    }

    public get isbn(): string {
        return this._isbn;
    }

    public get anoPublicacao(): number {
        return this._anoPublicacao;
    }

    public get disponivel(): boolean {
        return this._disponivel;
    }

    //SETTER - Cria um método altera os valores de dentro da classe //
 
    public set titulo(novoTitulo: string) {
        this._titulo = novoTitulo;
    }

    public set autor(novoAutor: string) {
        this._autor = novoAutor;
    }

    public set anoPublicacao(novoAno: number) {
        this._anoPublicacao = novoAno;
    }

    public set disponivel(status: boolean) {
        this._disponivel = status;
    }

    //Inicializa um método Detalhes para atualizar o status//
   public detalhes(): string {
        const status = this._disponivel ? "Disponível" : "Emprestado";
        return `Título: ${this._titulo} | Autor: ${this._autor} | ISBN: ${this._isbn} | Ano: ${this._anoPublicacao} | Status: ${status}`;
    }

    //Método auxiliar para serializar o Membro//
    //significa transformar o objeto da classse em formato que possa ser lido por arquivo Json//
    public toJSON(): object {
        //Combina os atributos da classe//
        return {
            titulo: this._titulo,
            autor: this._autor,
            isbn: this._isbn,
            anoPublicacao: this._anoPublicacao,
            disponivel: this._disponivel
        };
    }
}