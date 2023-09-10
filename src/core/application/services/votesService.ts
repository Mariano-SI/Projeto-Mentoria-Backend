import { injectable, inject } from 'tsyringe';
import { UpdateVoteInput } from '../../domain/dtos/votes/updateVoteInput';
import { VoteEntity } from '../../domain/entities/VoteEntity';
import IContestRepository from '../../domain/repositories/IContestRepository';
import IVoteRepository from '../../domain/repositories/IVotesRepository';
import IVoteService from '../../domain/services/IVoteService';

@injectable()
export default class VotesService implements IVoteService {
  private _voteRepository: IVoteRepository;
  private _contestRepository: IContestRepository; 
  /*coloquei o repository dos contests, pois vou verificar se entidades existem durante as validações,
    mas fiquei na duvida se deveria usar o repository ou o service
  */

  constructor(@inject('VoteRepository') voteRepository: IVoteRepository, @inject('ContestRepository') contestRepository : IContestRepository) {
    this._voteRepository = voteRepository;
    this._contestRepository = contestRepository;
  }

  public async getAllVotes(): Promise<VoteEntity[]> {
    try {
        //o que eu poderia validar aqui se não tem parametros de entrada?
      return await this._voteRepository.getAllVotes();
    } catch (error) {
      throw new Error(`Erro ao buscar votos`);
    }
  }

  public async getVoteById(id: string): Promise<VoteEntity | null> {
      if (!id) {
        throw new Error("O ID do voto é obrigatório");
      }
    try {
      const vote = await this._voteRepository.getVoteById(id);

      if(!vote){
        throw new Error("Voto não encontrado");
      }
      else{
        return vote
      } 
    } catch (error) {
      throw new Error(`Erro ao buscar voto por ID`);
    }
  }

  public async createVote(user_id: string, participant_id: string, contest_id: string): Promise<void> {
    // Validações de entrada: Garante que os IDs não sejam vazios ou nulos
    if (!user_id || !participant_id || !contest_id) {
    throw new Error("IDs de usuário, participante e concurso são obrigatórios");
    }

    //como sao chaves eu deveria lhes verificar no banco também mas por enquanto posso fazer apenas com contest
    const contest = await this._contestRepository.selectConstestById(contest_id);
    if(!contest){
    throw new Error("Esse concurso não existe");
    }

    try {
      await this._voteRepository.createVote(user_id, participant_id, contest_id);
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : "Não foi possivel criar concurso"}`);
    }
  }

  public async deleteVoteById(id: string): Promise<void> {
      // Validação de entrada: Garante que o ID não seja vazio ou nulo
      if (!id) {
        throw new Error("O ID do voto é obrigatório");
      }

      //como é uma operação de deleção fiquei na duvida: eu deveria checkar se existe esse voto puxando do repository ou apenas tentar deleta-lo?

    try {
      await this._voteRepository.deleteVoteById(id);
    } catch (error) {
      throw new Error(`Não foi possível deletar o voto`);
    }
  }

  public async updateVote(input: UpdateVoteInput): Promise<void> {

    // Validação de entrada: Garante que o ID e pelo menos um campo a ser atualizado sejam fornecidos
    if (!input.id) {
    throw new Error("O ID do voto é obrigatório");
    }

    if (!input.user_id && !input.participant_id && !input.contest_id) {
        throw new Error("Pelo menos um campo (user_id, participant_id, contest_id) deve ser fornecido para atualização");
    }

    //podia fazer com os outros mas por enquanto só temos contest e votes
    if(input.contest_id){
        const contest = this._contestRepository.selectConstestById(input.contest_id);
        if(!contest){
            throw new Error("Concurso inexistente");
        }
    }

    try {
      await this._voteRepository.updateVote(input);
    } catch (error) {
      throw new Error(`Não foi possível atualizar o voto`);
    }
  }
}
