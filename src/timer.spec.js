import { buildOutput } from './timer'

describe('timer.buildOutput', () => {
  it('should format the timer correctly', () => {
    expect(buildOutput(1, 0, 0, 1)).to.equal('1 day')
    expect(buildOutput(0, 20, 0, 0)).to.equal('20 hours')
    expect(buildOutput(0, 0, 5, 1)).to.equal('5 minutes 1 second')
  })
})
