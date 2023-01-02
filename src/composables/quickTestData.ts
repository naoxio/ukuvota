export function quickTest() {
    return {
        proposalEnd: +new Date() + 100000,
        votingEnd: +new Date() + 200000,
        weighting: '3',
        description: 'Test description',
        title: 'Topic Question Test',
        proposals: [
            {
                id: '0',
                title: 'Example proposal',
                description: 'Example description'
            },
            {
                id: '1',
                title: 'Example proposal2',
                description: 'Example description'
            },
            {
                id: '2',
                title: 'Example proposal3',
                description: 'Example description'
            },
        ],
        voters: [
            {
                id: '0',
                name: "Kim",
                votes: [
                    {
                        proposalId: '0',
                        vote: -3
                    },
                    {
                        proposalId: '1',
                        vote: 0
                    },
                    {
                        proposalId: '2',
                        vote: 2
                    }
                ]
            },
            {
                id: '1',
                name: "Elon",
                votes: [
                    {
                        proposalId: '0',
                        vote: -2
                    },
                    {
                        proposalId: '1',
                        vote: -2
                    },
                    {
                        proposalId: '2',
                        vote: 1
                    }
                ]
            },
            {
                id: '2',
                name: "Billy",
                votes: [
                    {
                        proposalId: '0',
                        vote: -2
                    },
                    {
                        proposalId: '1',
                        vote: 3
                    },
                    {
                        proposalId: '2',
                        vote: 3
                    }
                ]
            },
            {
                id: '3',
                name: "Doug",
                votes: [
                    {
                        proposalId: '0',
                        vote: 0
                    },
                    {
                        proposalId: '1',
                        vote: 2
                    },
                    {
                        proposalId: '2',
                        vote: 1
                    }
                ]
            },
            {
                id: '4',
                name: "Phillip",
                votes: [
                    {
                        proposalId: '0',
                        vote: -3
                    },
                    {
                        proposalId: '1',
                        vote: 3
                    },
                    {
                        proposalId: '2',
                        vote: -3
                    }
                ]
            },
            {
                id: '5',
                name: "Julia",
                votes: [
                    {
                        proposalId: '0',
                        vote: 0
                    },
                    {
                        proposalId: '1',
                        vote: -2
                    },
                    {
                        proposalId: '2',
                        vote: 3
                    }
                ]
            }
        ]
    }
}