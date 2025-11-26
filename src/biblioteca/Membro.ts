//Prepara a classe pessoa
import { Pessoa } from './Pessoa';

//Cria a classe Membro com os atributos da classe Pessoa, getters, setters e métodos auxiliares
export class Membro extends Pessoa {
    //Cria atributo específico do Membro
    private _matricula: string; 

    constructor(nome: string, endereco: string, telefone: string, matricula: string) {
        
        super(nome, endereco, telefone); 
        this._matricula = matricula;
    }

    //GETTER - pega os valores que estão dentro da classe//
    public get matricula(): string {
        return this._matricula;
    }

    //SETTER - Cria um método que altera os valores de dentro da classe//
    public detalhes(): string {
        return `${super.detalhes()} | Matrícula: ${this._matricula}`;
    }
    
    //Método auxiliar para serializar o Membro//
    //significa transformar o objeto da classse em formato que possa ser lido por arquivo Json//
    public toJSON(): object {
        //Combina os atributos da classe que ta sendo herdada com os atributos específicos//
        return {
            ...super.toJSON(), 
            matricula: this._matricula
        };
    }
}