//Prepara as classes
import * as fs from 'fs';
import * as path from 'path';

import { Livro } from '../biblioteca/Livro';
import { Membro } from '../biblioteca/Membro';
import { Emprestimo } from '../biblioteca/Emprestimo';
import { Pessoa } from '../biblioteca/Pessoa'; 

//exporta da classe de persistencia responsavel por salvar e carregar
export class Persistencia {
    private static BASE_DIR = path.join(process.cwd(), 'data'); 

    // o metodo salvar salva em lista em um arquivo JSON
    // O método .toJSON() é para transição de um onjeto para JSON
    public static salvar(dados: Array<{ toJSON: () => object }>, nomeArquivo: string): void {
        const caminhoCompleto = path.join(Persistencia.BASE_DIR, nomeArquivo);
        
        const dadosSerializados = dados.map(obj => obj.toJSON());
        
        try {
            //verifica a existencia de uma pasta chamada Data
            if (!fs.existsSync(Persistencia.BASE_DIR)) {
                fs.mkdirSync(Persistencia.BASE_DIR, { recursive: true });
            }
            fs.writeFileSync(caminhoCompleto, JSON.stringify(dadosSerializados, null, 2), 'utf-8');
        } catch (error) {
            console.error(`Erro ao salvar dados em ${nomeArquivo}:`, error);
        }
    }

    // Carrega dados de um arquivo JSON e transiciona para objeto.
    
    public static carregar<T>(nomeArquivo: string, ConstrutorClasse: new (...args: any[]) => T): T[] {
        const caminhoCompleto = path.join(Persistencia.BASE_DIR, nomeArquivo);
        
        if (!fs.existsSync(caminhoCompleto)) {
            return []; 
        }

        try {
            const dadosJson = fs.readFileSync(caminhoCompleto, 'utf-8');
            const dadosArray = JSON.parse(dadosJson);

            return dadosArray.map((dados: any) => {
                
                
                if (ConstrutorClasse === Livro) {
                    return new Livro(
                        dados.titulo, 
                        dados.autor, 
                        dados.isbn, 
                        dados.anoPublicacao, 
                        dados.disponivel
                    ) as T;

                } else if (ConstrutorClasse === Membro) {
                    // O Membro precisa ser desserializado com base nos atributos de Pessoa e Membro
                    return new Membro(
                        dados.nome,
                        dados.endereco,
                        dados.telefone,
                        dados.matricula
                    ) as T;

                } else if (ConstrutorClasse === Emprestimo) {
                    // Datas precisam ser convertidas de volta para objetos Date
                    return new Emprestimo(
                        dados.isbnLivro,
                        dados.matriculaMembro,
                        new Date(dados.dataEmprestimo),
                        dados.dataDevolucao ? new Date(dados.dataDevolucao) : undefined
                    ) as T;
                }
                
                // Retorna o objeto simples se não for uma classe conhecida como um erro
                return dados as T; 
            });

        } catch (error) {
            console.error(`Erro ao carregar dados de ${nomeArquivo}. O arquivo pode estar corrompido.`, error);
            return [];
        }
    }
}