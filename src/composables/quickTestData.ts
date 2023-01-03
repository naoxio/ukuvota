interface Proposal {
    id: string
    title: string
    description: string
}

const proposals: Proposal[] = [
    {
        id: '0',
        title: 'Pepperoni and mushroom',
        description: 'This proposal suggests ordering a pizza with pepperoni and mushroom toppings.'
    },
    {
        id: '1',
        title: 'Margherita with arugula',
        description: 'This proposal suggests a Margherita pizza topped with arugula after it has been baked.'
    },
    {
        id: '2',
        title: 'BBQ chicken with red onions',
        description: 'This proposal suggests a BBQ chicken pizza with red onions as the toppings.'
    },
    {
        id: '3',
        title: 'Signature pizza',
        description: 'This proposal suggests ordering a pizza with a variety of toppings, such as pepperoni, mushroom, sausage, bell peppers, and olives.'
    },
    {
        id: '4',
        title: 'Build your own',
        description: 'This proposal suggests allowing each person to choose their own toppings for their individual pizza.'
    }
]

interface Vote {
    proposalId: string;
    vote: number;
}
interface Voter {
    id: string
    name: string
    votes: Vote[]
}

const voterNames = ['Kim', 'Elon', 'Billy', 'Doug', 'Phillip', 'Julia'];
const voters: Voter[] = [];

voterNames.forEach((voterName, i) => {
    const voter = {
        id: i.toString(),
        name: voterName,
        votes: [] as Vote[]
    };
    const votes: Vote[] = [];

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
        proposalEnd: +new Date() + 100000,
        votingEnd: +new Date() + 200000,
        weighting: '3',
        title: 'What pizza toppings should we order for our office party?',
        description: 'We are planning an office party and would like to order pizza for everyone. We are trying to decide on the toppings and would like some ideas. Please suggest your favorite toppings and any unique combinations you think would be delicious!',
        proposals,
        voters,
    }
}