
export class Pessoa {
    //Cria atributos privador (Encapsulamento + Herança)//
    protected _nome: string;
    protected _endereco: string;
    protected _telefone: string;

    // O construtor é usado para criar uma nova instância de pessoa//
    constructor(nome: string, endereco: string, telefone: string) {
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    //GETTER - Cria um método pega os valores que estão dentro da classe //

    public get nome(): string {
        return this._nome;
    }

    public get endereco(): string {
        return this._endereco;
    }

    public get telefone(): string {
        return this._telefone;
    }

    //SETTER - Cria um método altera os valores de dentro da classe //

    public set nome(novoNome: string) {
        this._nome = novoNome;
    }

    public set endereco(novoEndereco: string) {
        this._endereco = novoEndereco;
    }

    public set telefone(novoTelefone: string) {
        this._telefone = novoTelefone;
    }

    
    public detalhes(): string {
        return `Nome: ${this._nome} | Endereço: ${this._endereco} | Telefone: ${this._telefone}`;
    }

    //Método auxiliar para serializar o Membro//
    //significa transformar o objeto da classse em formato que possa ser lido por arquivo Json//
    public toJSON(): object {
        //Combina os atributos da classe//
        return {
            nome: this._nome,
            endereco: this._endereco,
            telefone: this._telefone
        };
    }
}