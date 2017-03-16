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
    def test_fx(self):
        """test_fx
        unittest to test that fx() functions correctly
        """
        alpha = [50, 54, 60]
        beta = [20, 30, 19]
        xco = 0
        yco = 1
        zco = 2
        delx = math.fabs(alpha[xco]-beta[xco])
        delz = math.fabs(alpha[yco]-beta[yco])
        dely = math.fabs(alpha[zco]-beta[zco])
        delta = [delx, dely, delz]
        step = f(alpha, beta)
        assert (delta[xco] > step[1][xco]) and (delta[yco] > step[1][yco]) and (delta[zco] > step[1][zco]), 'success'
        assert (delta[xco] > 1) and (delta[yco] > 1) and (delta[zco] > 1), 'success'
if __name__ == '__main__':
    unittest.main()
