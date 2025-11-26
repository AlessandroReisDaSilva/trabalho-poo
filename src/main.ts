//Prepara as classes
import { GerenciadorLivros } from './servicos/GerenciadorLivros';
import { GerenciadorMembros } from './servicos/GerenciadorMembros';
import { GerenciadorEmprestimos } from './servicos/GerenciadorEmprestimos';
//Prepara a interface de linha de comando
import { CLI } from './CLI/Cli';

//Confirgura e Inicializa as classes e a interface
const gerenciadorLivros = new GerenciadorLivros();
const gerenciadorMembros = new GerenciadorMembros();
const gerenciadorEmprestimos = new GerenciadorEmprestimos(gerenciadorLivros, gerenciadorMembros);
const cli = new CLI(gerenciadorLivros, gerenciadorMembros, gerenciadorEmprestimos);

cli.iniciar();