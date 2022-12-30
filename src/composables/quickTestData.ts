export function quickTest() {
    return {
        proposalEnd: +new Date() + 100000,
        votingEnd: +new Date() + 200000,
        weighting: '3',
        description: 'Test description',
        title: 'Topic Question Test',
        proposals: [
            {
                title: 'Example proposal',
                description: 'Example description'
            },
            {
                title: 'Example proposal2',
                description: 'Example description'
            },
            {
                title: 'Example proposal3',
                description: 'Example description'
            },
        ]
    }
}