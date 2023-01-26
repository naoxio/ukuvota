import { IProposal } from '../../shared/interfaces/IProposal'
import { IVoter } from '../../shared/interfaces/IVoter'

const proposals: IProposal[] = [
    {
        id: '12804f77-64be-a566-17c2-9e134e824f41c9c9',
        title: 'Pepperoni and mushroom',
        description: 'This proposal suggests ordering a pizza with pepperoni and mushroom toppings.'
    },
    {
        id: '249831b2-da46-bc40-dbef-61034d77ef4dddaf',
        title: 'Margherita with arugula',
        description: 'This proposal suggests a Margherita pizza topped with arugula after it has been baked.'
    },
    {
        id: 'a4750500-16b3-a8d4-d38b-3808bb4b29566f0a',
        title: 'BBQ chicken with red onions',
        description: 'This proposal suggests a BBQ chicken pizza with red onions as the toppings.'
    },
    {
        id: 'f6fe4552-5677-ab2c-0c92-b4811e8bf22e7b21',
        title: 'Signature pizza',
        description: 'This proposal suggests ordering a pizza with a variety of toppings, such as pepperoni, mushroom, sausage, bell peppers, and olives.'
    },
    {
        id: '2e1b5019-32eb-25ca-2c88-7240fd91612742ae',
        title: 'Build your own',
        description: 'This proposal suggests allowing each person to choose their own toppings for their individual pizza.'
    }
]


const voterNames = ['Kim', 'Elon', 'Billy', 'Doug', 'Phillip', 'Julia'];
const voterIds = [
    '37586673-1ca2-486b-b73b-ac4d829a389f',
    '57adc453-7e98-4f36-aa4c-058c5d93f67f',
    '023093da-29af-46dc-a810-2aa696fc4a8c',
    '87dabf92-4d88-4852-b7fe-21d6f12d41cd',
    '96b28f92-5c7e-41fe-9eb0-25c12a973f13',
    'd56224b7-4ce2-4450-a49c-5c7e50b3cf45',
]
const voters: IVoter[] = [];

voterNames.forEach((voterName: string, i: number) => {
    const voter = {
        id: voterIds[i],
        name: voterName,
        votes: []
    } as IVoter;
    proposals.forEach((proposal) => {
        voter.votes.push({
            proposalId: proposal.id,
            vote: Math.floor(Math.random() * 7) - 3
        });
    })
    voters.push(voter);
})   

export function quickTest() {
    return {
        proposalDates: [+new Date() + 100000, +new Date() + 20000000],
        votingDates: [+new Date() + 30000000, +new Date() + 50000000],
        weighting: '3',
        title: 'What pizza toppings should we order for our office party?',
        description: 'We are planning an office party and would like to order pizza for everyone. We are trying to decide on the toppings and would like some ideas. Please suggest your favorite toppings and any unique combinations you think would be delicious!',
        proposals,
        voters,
    }
}