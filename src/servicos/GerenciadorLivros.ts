// src/servicos/GerenciadorLivros.ts

import { Livro } from '../biblioteca/Livro'; // Ajuste o caminho
import { Persistencia } from './Persistencia';

/**
 * Classe responsável pela lógica de negócios (CRUD) dos Livros.
 * Gerencia a lista de Livros e a persistência de dados.
 */
export class GerenciadorLivros {
    private static NOME_ARQUIVO = 'livros.json';
    private _livros: Livro[] = [];

    constructor() {
        // Ao ser inicializado, o gerenciador carrega todos os livros do arquivo
        this.carregarLivros();
    }

    // --- Métodos de Persistência ---

    private carregarLivros(): void {
        // Usa a Persistencia para carregar o array e desserializar para objetos Livro
        this._livros = Persistencia.carregar(GerenciadorLivros.NOME_ARQUIVO, Livro);
    }

    /**
     * Salva a lista atual de livros no arquivo JSON.
     */
    public salvarLivros(): void {
        Persistencia.salvar(this._livros, GerenciadorLivros.NOME_ARQUIVO);
    }

    // --- Métodos de CRUD ---

    /**
     * Adiciona um novo livro, verifica se o ISBN já existe e salva.
     */
    public adicionarLivro(livro: Livro): boolean {
        // Validação: Checa se o ISBN já existe
        if (this.buscarLivroPorISBN(livro.isbn)) {
            console.warn(`[ERRO] Livro com ISBN ${livro.isbn} já cadastrado.`);
            return false;
        }

        this._livros.push(livro);
        this.salvarLivros();
        console.log(`Livro "${livro.titulo}" cadastrado com sucesso!`);
        return true;
    }

    /**
     * Lista todos os livros cadastrados.
     */
    public listarTodos(): Livro[] {
        return this._livros;
    }

    /**
     * Encontra um livro pelo seu ISBN.
     */
    public buscarLivroPorISBN(isbn: string): Livro | undefined {
        return this._livros.find(livro => livro.isbn === isbn);
    }

    /**
     * Atualiza as informações de um livro existente (exceto o ISBN).
     */
    public atualizarLivro(isbn: string, novosDados: { titulo?: string, autor?: string, anoPublicacao?: number }): boolean {
        const livro = this.buscarLivroPorISBN(isbn);

        if (!livro) {
            console.warn(`[ERRO] Livro com ISBN ${isbn} não encontrado.`);
            return false;
        }

        if (novosDados.titulo) livro.titulo = novosDados.titulo;
        if (novosDados.autor) livro.autor = novosDados.autor;
        if (novosDados.anoPublicacao) livro.anoPublicacao = novosDados.anoPublicacao;
        
        this.salvarLivros();
        console.log(`Livro com ISBN ${isbn} atualizado com sucesso!`);
        return true;
    }

    /**
     * Remove um livro do cadastro.
     */
    public removerLivro(isbn: string): boolean {
        const indice = this._livros.findIndex(livro => livro.isbn === isbn);

        if (indice === -1) {
            console.warn(`[ERRO] Livro com ISBN ${isbn} não encontrado.`);
            return false;
        }
        
        // Regra de Negócio: Não pode remover se estiver emprestado
        if (!this._livros[indice].disponivel) {
             console.warn(`[ERRO] Livro com ISBN ${isbn} não pode ser removido, pois está emprestado.`);
             return false;
        }

        this._livros.splice(indice, 1);
        this.salvarLivros();
        console.log(`Livro com ISBN ${isbn} removido com sucesso.`);
        return true;
    }
}