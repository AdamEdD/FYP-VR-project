"""unittests
test compute.fx functionality
"""
import unittest
import math

from python.compute.fx import f

class Tests(unittest.TestCase):
    """Tests
    testing python functionality
    """
    def test_per_step(self):
        """test_per_step
        unittest to test that f() functions correctly
        tests that step size is always smaller than delta
        """
        alpha = [50, 54, 60]
        beta = [20, 30, 19]
        step = f(alpha, beta)[1]
        delx = math.fabs(alpha[0]-beta[0])
        delz = math.fabs(alpha[1]-beta[1])
        dely = math.fabs(alpha[2]-beta[2])
        delta = [delx, dely, delz]
        assert (delta[0] > step[0]) and (delta[1] > step[1]) and (delta[2] > step[2]), 'success'
        assert (delta[0] > 1) and (delta[1] > 1) and (delta[2] > 1), 'success'
    def test_move_to_alpha(self):
        """test_move_to_alpha
        unittest to test that f() functions correctly
        tests that the update is always towards alpha
        """
        alpha = [50, 54, 60]
        beta = [20, 30, 19]
        update = f(alpha, beta)[0]
        assert (math.fabs(alpha[0]-update[0]) < math.fabs(alpha[0]-beta[0])), 'success'
        assert (math.fabs(alpha[1]-update[1]) < math.fabs(alpha[1]-beta[1])), 'success'
        assert (math.fabs(alpha[2]-update[2]) < math.fabs(alpha[2]-beta[2])), 'success'
if __name__ == '__main__':
    unittest.main()
