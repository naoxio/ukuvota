---
layout: templates/BaseLayout.astro
---
_v0.9 | 2018-03-xx | 2000 words | [Doug Webb](https://douginamug.gitlab.io/)_

---

# Cooperative Decision Making

## Abstract

Three features of cooperative voting systems are put forward:

1. the inclusion of an option to ‘find other options’ by default,
2. the ability for participants to expressively score each option, and
3. the appropriate multiplication of negative scores before tallying.

---

## Introduction

Just as the present has been shaped by the decisions of the past, so too do the decisions we are yet to make shape the future. On the basis that _how_ decisions are made influences _what_ is decided, an important question for those wishing to find themselves in a more cooperative future is _how can we decide more cooperatively?_

Often 'cooperation' is used to describe conflict-free compliance. Here cooperation is used more boldly to describe a quality of interaction which supports, and arises from, personal autonomy, interpersonal equivalence and mutual interest.

A method of decision-making can be said to respect autonomy if it allows each affected member of a group to meaningfully and directly participate. For any sizeable group this requires a formal procedure which specifies how participants can express their opinions on a set of options, and how participant opinions are combined to select from these options: procedures fitting this description are commonly called _voting methods_. In contrast are methods based on random chance (e.g. lottery) or those in which some decide for others (e.g. dictatorships.)

A voting method can further be said to respect equivalence if it values participants equally, as summarized by the principle _one person, one vote_. A counterexample is seen in stock-owned companies where share-holders receive voting power proportional to their share size. However, a voting method which respects equivalence does not necessarily respect mutual interest.

Consider a group of people who are deciding whether to paint their bike-shed Blue, Red or Green. They vote by each choosing one option and selecting the most chosen option (i.e. a relative majority/plurality vote.) Blue wins by a narrow margin, an outcome quite unacceptable to the large minority which voted Green. However, Blue-voters and Green-voters find Red to be acceptable and both would have preferred it—despite it not being their first personal preference—since they share a mutual interest: that Red wasn't chosen demonstrates that the method was inadequate to respect mutual interest.

Thus a voting method can be said to respect mutual interest by making a selection which values acceptance over preference. Some methods attempt to do this by allowing participants to veto proposals (e.g. unanimous consent or consensus) with the reasoning that no participant need endure a decision they find unacceptable. However, if the option to veto is viewed positively as the option to _change nothing_ then a single voter who prefers things the way they are is in a position of dictatorial power to select their preferred option regardless of how (un)acceptable the others find it.

Given this exploration into what cooperative voting is and isn't considered to be, specific features for each aspect of a voting system are reasoned in turn: the available options, expression of opinions and combination of opinions.

## Options: an acceptable one for everyone

The outcome of a vote is restricted to the options available at the time of voting. Since there is always the option to change nothing (i.e. continue with the status quo,) only one alternative option must be proposed.

However most decisions are not binary; there is almost always more than one alternative for any situation, usually an overwhelming number. Since only a fraction of alternatives can be made available for a vote, it is possible that the 'best' option for a group is not among them. Worse still, some voters could find none of the available options to be acceptable and thus be forced to _vote for the lesser evil_.

Hence the first feature of cooperative voting is to include the option to 'find other options'. Providing a way for people to vote again on different options essentially allows people to vote on _every_ option, including options not yet conceived; this ensures that there is always an acceptable option for every participant.

![a diagram representing the expansive nature of the "find other options" option](/manual/a_findOtherOptions.svg)

## Expression: getting the whole picture

People must be able to express themselves in a way that is simple enough to be easily combined later, yet complex enough to communicate acceptance and preference.

When voters are only allowed to select one option (i.e. plurality) they express nothing about the other options. Even methods which allow voters to rank all options in order of preference (i.e. ordinal methods,) voters cannot express whether they hold a positive, neutral or negative opinion toward a particular option: does someone like or dislike an option they voted third out of five? Additionally both plurality and ordinal methods can actively encourage voters to tactically misrepresent their preference order to secure a better personal outcome whenever there are more than two options available (Arrow, 1963), precisely the situation caused by putting the first feature of cooperative voting in place.

While no voting system is free from the possibility of tactical voting in the presence of three or more options (Gibbard, 1973), scoring methods (i.e. cardinal methods) encourage fewer distortions, most notably they never encourage voters to misrepresent their preference order. Even more importantly, scoring option allows the selection of  the context of cooperation, scoring options allows voters to express acceptance and preference. Using a symmetrical range of positive and negative numbers, voters can indicate the degree to which they find options (un)acceptable with negative scores, and the degree to which they acceptable options preferable with positive scores.

Hence the second feature of cooperative voting is to allow participants to score each option from an expressive range. A range of less than 10 points is recommended for cognitive ease, verbal or pictorial indicators can be used to clarify what is meant by the numerical values.

![a graphical comparison of plurality, rank and score methods](/manual/b_scoreEach.svg)

## Combination: acceptable, achievable outcomes

To reach a decision which upholds mutual interest, scores should be combined in a way that values acceptance over preference. This requires something other than direct addition, since allowing positive scores to cancel out negative ones (e.g. +3 + -3 = 0) equates the value of acceptance with preference. A simple way to achieve the difference in valuation is to increase the weight of negative scores before totalling. 

This approach reflects the philosophical intuition that "human suffering makes a direct moral appeal, namely, the appeal for help, while there is no similar call to increase the happiness of a person who is doing well anyway" (Popper, 1945). A practical advantage with this approach is that options with higher levels of acceptance will be selected; these are less likely to cause later conflict and are therefore more likely to be realized.

However, considering negative scores to be 'infinitely' more important than positive ones is problematic. As a philosophical position this implies that an outcome which everyone is completely neutral towards is preferable to one which everyone strongly prefers except one who finds it mildly unacceptable. The practical issue with this approach is that options towards which voters have insufficient intrinsic motivation may not happen in cooperative groups, where those who execute are the same as those who legislate.

Hence the third feature of cooperative voting is to appropriately multiply negative scores. This factor represents an exchange rate between positive and negative opinion which is likely to differ between groups. It should at least be larger than 1 to value acceptance over preference and less than the number of group members to make positive scores meaningful: a factor of two may be an appropriate starting point.

![a scale with a sad emoji weighing more than a happy one](/manual/c_weightingFactor.svg)

## An example: back to the bike-shed

The group that earlier voted to paint their bike-shed Blue are unsatisfied with the result of their initial method. They vote again using a method with the features of cooperative voting described above: they list the options "Change nothing: leave it unpainted" and "Find better options: vote again in a week" alongside the previously identified options Green, Red and Blue; they score using a three-point scale (+1, 0, -1) and they multiply negative scores by a factor of two before totalling scores. This time, without voter opinions changing, Red is selected: a more cooperative outcome.

## Conclusion

I propose that cooperative voting—which respects individual autonomy, interpersonal equivalence and mutual interest—should feature: 1) the inclusion of an option to ‘Find other options’ by default, 2) the ability for participants to expressively score each option, and 3) the appropriate multiplication of negative scores before tallying. All these features are present in the free, open-source voting application [Ukuvota](https://ukuvota.world) and in the procedures to make formal decisions at [Kanthaus](https://kanthaus.online).

Organizations need not adopt all features at once, they can do so incrementally. From plurality voting one could first introduce 'find other options' and allow participants to 'vote for each proposal they approve of' (a.k.a. Approval Voting.) From veto methods, one could first switch to score voting with an _infinite_ negative multiplication factor. 

In groups of very large size or diversity (e.g. countries) mutual interest may be reduced to the point where a significant portion of participants vote tactically, and cooperation as descibed above is not a reasonable goal. In these cases simple score voting without the multiplication of negative scores, or  score voting hybrids such as '[STAR](http://www.equal.vote/starvoting)' (Score Then Automatic Runoff) or [Quadratic Voting](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2343956) may lead to better outcomes. 

While long-term and wide-reaching decisions are better done formally, perhaps the majority of decisions made in organizations are informal, allowing an organization to be adaptable at the point of operation. How informal decisions are made can be positively influenced by promoting certain norms such as the [Advice Process](http://www.reinventingorganizationswiki.com/Decision_Making), [3-pirate-rule](https://wiki.pirateparty.be/PP_Structure_Proposal#Three_Pirate_Rule) or [doocracy](https://communitywiki.org/wiki/DoOcracy).

I wish cooperative groups well in their endeavors and hope that they are able to radically challenge their fundaments while remaining functional.

---

### References
- Popper, K.R., 1945. The Open Society and Its Enemies, Volume 1, The Spell of Plato, George Routledge & Sons. p. 241, Notes to Chapter 9, 2. 
- Arrow, K.J., 1963. Social choice and individual values. 2nd ed., Wiley, New York
- Gibbard, A., 1973.  Manipulation  of  voting  schemes:  a  general  result.  Econometrica  41,  587–601.
- Ord, T., 201x. Why I'm not a negative Utilitarian. http://www.amirrorclear.net/academic/ideas/negative-utilitarianism/

### Conflict of interests
I really want to live in a more cooperative world.

### Acknowledgements
I first thank Erich Visotschnig and Siegfried Schrotta for developing the decision-making framework [Systemisches Konsensieren](http://www.sk-prinzip.eu/#) (Systemic Consensus), Joachim Thome for introducing it to me, and the early [yunity](https://yunity.org/en) group for trying it out: this framework was the primary influence for this text, indeed the first two features are almost identical. To the enthusiastic discussions of the [Centre for Election Science](https://www.electology.org/) community which helped me clarify my issues with the ignorance of positive opinion within Systemisches Konsensieren. Being hosted free-of-charge by [Projektwerkstaat Saasen](http://www.projektwerkstatt.de/pwerk/saasen.html), [Kanthaus](https://kanthaus.online/en) and many other places made it possible for me gift forward this work. Many thanks to [Waotzi](https://waotzi.org) for his development of Ukuvota which motivated me to finish this work. To the countless others, countless thanks.

### Licensing
All original text and figures are licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) meaning you can do whatever you want with them, even without attributing me (although it's nice if you do.) The figures in 2 and 3 are derivative works using emojis from [Twemoji2](https://github.com/twitter/twemoji/tree/gh-pages/2/svg) by Twitter, Inc. which is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

