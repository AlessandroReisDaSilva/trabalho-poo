//Prepara as classes
import { Emprestimo } from '../biblioteca/Emprestimo'; 
import { Persistencia } from './Persistencia';
import { GerenciadorLivros } from './GerenciadorLivros';
import { GerenciadorMembros } from './GerenciadorMembros';


export class GerenciadorEmprestimos {
    private static NOME_ARQUIVO = 'emprestimos.json';
    private _emprestimos: Emprestimo[] = [];
    private gerenciadorLivros: GerenciadorLivros;
    private gerenciadorMembros: GerenciadorMembros;

    constructor(gl: GerenciadorLivros, gm: GerenciadorMembros) {
        this.gerenciadorLivros = gl;
        this.gerenciadorMembros = gm;
        this.carregarEmprestimos();
    }

    // --- Métodos de Persistência ---

    private carregarEmprestimos(): void {
        this._emprestimos = Persistencia.carregar(GerenciadorEmprestimos.NOME_ARQUIVO, Emprestimo);
    }

    private salvarEmprestimos(): void {
        Persistencia.salvar(this._emprestimos, GerenciadorEmprestimos.NOME_ARQUIVO);
    }

    // --- Métodos de Gerenciamento ---

    /**
     * 1. Realiza a validação do Livro e Membro.
     * 2. Cria o registro de Empréstimo.
     * 3. Atualiza o status de disponibilidade do Livro.
     */
    public realizarEmprestimo(isbnLivro: string, matriculaMembro: string): boolean {
        const livro = this.gerenciadorLivros.buscarLivroPorISBN(isbnLivro);
        const membro = this.gerenciadorMembros.buscarMembroPorMatricula(matriculaMembro);

        // 1. Validações
        if (!livro) {
            console.warn(`[ERRO] Livro com ISBN ${isbnLivro} não encontrado.`);
            return false;
        }
        if (!membro) {
            console.warn(`[ERRO] Membro com Matrícula ${matriculaMembro} não encontrado.`);
            return false;
        }
        if (!livro.disponivel) {
            console.warn(`[ERRO] Livro "${livro.titulo}" já está emprestado.`);
            return false;
        }

        // 2. Cria e registra o empréstimo
        const novoEmprestimo = new Emprestimo(isbnLivro, matriculaMembro);
        this._emprestimos.push(novoEmprestimo);

        // 3. Atualiza o status do Livro
        livro.disponivel = false;
        
        // Salva os dados de Empréstimos e Livros (o GerenciadorLivros já salva ao atualizar)
        this.salvarEmprestimos();
        
        this.gerenciadorLivros.atualizarLivro(isbnLivro, {}); // Chama o atualizar para forçar o salvamento dos livros
        
        console.log(`Empréstimo realizado: Livro "${livro.titulo}" para o Membro ${membro.nome}.`);
        return true;
    }

   
    public registrarDevolucao(isbnLivro: string, matriculaMembro: string): boolean {
        // Busca o empréstimo ativo
        const emprestimoAtivo = this._emprestimos.find(e => 
            e.isbnLivro === isbnLivro && 
            e.matriculaMembro === matriculaMembro && 
            e.isAtivo()
        );

        if (!emprestimoAtivo) {
            console.warn(`[ERRO] Não há empréstimo ativo para o livro ${isbnLivro} e membro ${matriculaMembro}.`);
            return false;
        }

        const livro = this.gerenciadorLivros.buscarLivroPorISBN(isbnLivro);
        if (!livro) {
             console.error(`[ERRO CRÍTICO] Livro não encontrado, mas está em um empréstimo ativo.`);
             return false;
        }

        // 2. Registra a devolução
        emprestimoAtivo.dataDevolucao = new Date();

        // 3. Atualiza o status do Livro
        livro.disponivel = true;

        // Salva os dados de Empréstimos e Livros
        this.salvarEmprestimos();
        this.gerenciadorLivros.atualizarLivro(isbnLivro, {}); // Força o salvamento da lista de livros

        console.log(`Devolução registrada com sucesso para o Livro "${livro.titulo}".`);
        return true;
    }

    public listarEmprestimosAtivos(): Emprestimo[] {
        return this._emprestimos.filter(e => e.isAtivo());
    }

    public listarHistorico(): Emprestimo[] {
        return this._emprestimos;
    }
}