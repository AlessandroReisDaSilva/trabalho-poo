
import { Membro } from '../biblioteca/Membro'; 
import { Persistencia } from './Persistencia';


export class GerenciadorMembros {
    private static NOME_ARQUIVO = 'membros.json';
    private _membros: Membro[] = [];

    constructor() {
        this.carregarMembros();
    }

    // --- Métodos de Persistência ---

    private carregarMembros(): void {
        this._membros = Persistencia.carregar(GerenciadorMembros.NOME_ARQUIVO, Membro);
    }

    private salvarMembros(): void {
        Persistencia.salvar(this._membros, GerenciadorMembros.NOME_ARQUIVO);
    }

    // --- Métodos de CRUD ---

    // Adiciona um novo membro, verifica se a matrícula já existe e salva.
    
    public adicionarMembro(membro: Membro): boolean {
        
        if (this.buscarMembroPorMatricula(membro.matricula)) {
            console.warn(`[ERRO] Membro com matrícula ${membro.matricula} já cadastrado.`);
            return false;
        }

        this._membros.push(membro);
        this.salvarMembros();
        console.log(`Membro "${membro.nome}" (Matrícula: ${membro.matricula}) cadastrado com sucesso!`);
        return true;
    }

    public listarTodos(): Membro[] {
        return this._membros;
    }

    
    public buscarMembroPorMatricula(matricula: string): Membro | undefined {
        return this._membros.find(membro => membro.matricula === matricula);
    }

    /**
     * Atualiza as informações de um membro existente (exceto a matrícula).
     */
    public atualizarMembro(matricula: string, novosDados: { nome?: string, endereco?: string, telefone?: string }): boolean {
        const membro = this.buscarMembroPorMatricula(matricula);

        if (!membro) {
            console.warn(`[ERRO] Membro com matrícula ${matricula} não encontrado.`);
            return false;
        }

        // Usa os Setters implementados na classe Pessoa/Membro
        if (novosDados.nome) membro.nome = novosDados.nome;
        if (novosDados.endereco) membro.endereco = novosDados.endereco;
        if (novosDados.telefone) membro.telefone = novosDados.telefone;
        
        this.salvarMembros();
        console.log(`Membro com matrícula ${matricula} atualizado com sucesso!`);
        return true;
    }

    public removerMembro(matricula: string): boolean {
        const indice = this._membros.findIndex(membro => membro.matricula === matricula);

        if (indice === -1) {
            console.warn(`[ERRO] Membro com matrícula ${matricula} não encontrado.`);
            return false;
        }
        
        this._membros.splice(indice, 1);
        this.salvarMembros();
        console.log(`Membro com matrícula ${matricula} removido com sucesso.`);
        return true;
    }
}