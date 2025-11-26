import { GerenciadorMembros } from '../servicos/GerenciadorMembros';
import { Membro } from '../biblioteca/Membro';

describe('GerenciadorMembros', () => {
  let gerenciador: GerenciadorMembros;

  beforeEach(() => {
    gerenciador = new GerenciadorMembros();
  });

  test('Deve adicionar um membro com sucesso', () => {
    const membro = new Membro('Nome Teste', 'Endereço Teste', '123456789', 'MAT123');
    const resultado = gerenciador.adicionarMembro(membro);

    expect(resultado).toBe(true);
    expect(gerenciador.listarTodos()).toContain(membro);
  });

  test('Não deve adicionar um membro com matrícula duplicada', () => {
    const membro = new Membro('Nome Teste', 'Endereço Teste', '123456789', 'MAT123');
    gerenciador.adicionarMembro(membro);

    const resultado = gerenciador.adicionarMembro(membro);

    expect(resultado).toBe(false);
  });

  test('Deve remover um membro com sucesso', () => {
    const membro = new Membro('Nome Teste', 'Endereço Teste', '123456789', 'MAT123');
    gerenciador.adicionarMembro(membro);

    const resultado = gerenciador.removerMembro('MAT123');

    expect(resultado).toBe(true);
    expect(gerenciador.listarTodos()).not.toContain(membro);
  });

  test('Não deve remover um membro inexistente', () => {
    const resultado = gerenciador.removerMembro('MAT000');

    expect(resultado).toBe(false);
  });
});