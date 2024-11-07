import math
from scipy.stats import binom

# Given values
n = 20  # number of drivers
p = 0.25  # probability that a driver comes to a complete stop

# a. Probability that at most 6 drivers will come to a complete stop (P(X <= 6))
prob_at_most_6 = binom.cdf(6, n, p)

# b. Probability that exactly 6 drivers will come to a complete stop (P(X = 6))
prob_exactly_6 = binom.pmf(6, n, p)

# c. Probability that at least 6 drivers will come to a complete stop (P(X >= 6))
# This is 1 - P(X < 6) = 1 - P(X <= 5)
prob_at_least_6 = 1 - binom.cdf(5, n, p)

prob_at_most_6, prob_exactly_6, prob_at_least_6
