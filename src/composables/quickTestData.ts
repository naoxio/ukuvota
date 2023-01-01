export function quickTest() {
    return {
        proposalEnd: +new Date() + 100000,
        votingEnd: +new Date() + 200000,
        weighting: '3',
        description: 'Test description',
        title: 'Topic Question Test',
        proposals: [
            {
                id: 0,
                title: 'Example proposal',
                description: 'Example description'
            },
            {
                id: 1,
                title: 'Example proposal2',
                description: 'Example description'
            },
            {
                id: 2,
                title: 'Example proposal3',
                description: 'Example description'
            },
        ],
        voters: [
            {
                name: "Kim Dotcom",
                votes: [
                    {
                        proposalId: 0,
                        vote: 0
                    },
                    {
                        proposalId: 1,
                        vote: 2
                    },
                    {
                        proposalId: 2,
                        vote: 6
                    }
                ]
            },
            {
                name: "Elon Musk",
                votes: [
                    {
                        proposalId: 0,
                        vote: 4
                    },
                    {
                        proposalId: 1,
                        vote: 0
                    },
                    {
                        proposalId: 2,
                        vote: 7
                    }
                ]
            }
        ]
    }
}