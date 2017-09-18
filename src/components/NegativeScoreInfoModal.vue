<template>
  <div>
    <h4>Negative Score Multiplier</h4>
    <p>
      Score voting normally values scores as equal increments and chooses the option the highest total score.
      For example, in a situation where there are three ways to score ('Resist, accept, support') the score values would be -1, 0 and +1.
      However, on the basis that scoring represents resistance and support, using this equal weighting treats resistance as 'negative support' and selects the option where R < A < S.
      <br></br>
      The simplest way to select the option where R << A < S is to weight resistance scores more heavily than support scores.
      Using a weighting factor of 3 would value non-resistance twice as favorably as support.
      It might be tempting to increase thie weighting factor to something in an attempt to avoid resistance however do so has consequences.
      If a weighting factor approaches the point where resistance from one individual outweighs all potential support in the group, the voting system degenerates such that only resistance scores carry decision-making value. This potentially denies a supermajority of individuals from pursuing their interests and forces them to vote dishonestly (only in terms of resistance), become more exclusive/exclusionary or leave. So the weighting factor must be greater than 1 and significantly less than the number of individuals.
      In smaller groups the weighting factor is likely to be higher and in larger groups it is likely to be lower.
    </p>
    <slot></slot>
  </div>
</template>
<script>
import { QBtn, QModal } from 'quasar'

export default {
  components: {
    QBtn, QModal
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus">


</style>
