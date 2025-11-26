import { GerenciadorLivros } from '../servicos/GerenciadorLivros';
import { Livro } from '../biblioteca/Livro';

describe('GerenciadorLivros', () => {
  let gerenciador: GerenciadorLivros;

  beforeEach(() => {
    gerenciador = new GerenciadorLivros();
  });

  test('Deve adicionar um livro com sucesso', () => {
    const livro = new Livro('Título Teste', 'Autor Teste', '123456789', 2025);
    const resultado = gerenciador.adicionarLivro(livro);

    expect(resultado).toBe(true);
    expect(gerenciador.listarTodos()).toContain(livro);
  });

  test('Não deve adicionar um livro com ISBN duplicado', () => {
    const livro = new Livro('Título Teste', 'Autor Teste', '123456789', 2025);
    gerenciador.adicionarLivro(livro);

    const resultado = gerenciador.adicionarLivro(livro);

    expect(resultado).toBe(false);
  });

  test('Deve remover um livro com sucesso', () => {
    const livro = new Livro('Título Teste', 'Autor Teste', '123456789', 2025);
    gerenciador.adicionarLivro(livro);

    const resultado = gerenciador.removerLivro('123456789');

    expect(resultado).toBe(true);
    expect(gerenciador.listarTodos()).not.toContain(livro);
  });

  test('Não deve remover um livro inexistente', () => {
    const resultado = gerenciador.removerLivro('000000000');

    expect(resultado).toBe(false);
  });
});