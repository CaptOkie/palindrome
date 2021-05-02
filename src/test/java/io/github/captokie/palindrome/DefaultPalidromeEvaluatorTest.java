package io.github.captokie.palindrome;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class DefaultPalidromeEvaluatorTest {

    DefaultPalidromeEvaluator evaluator;

    @BeforeEach
    void setUp() {
        evaluator = new DefaultPalidromeEvaluator();
    }

    @ParameterizedTest
    @ValueSource(strings = { "", "a", "a1b1a", "a2b2a?", "a ba", "1234321", "Able was I ere I saw Elba",
            "A man, a plan, a canal – Panama", "Madam, I'm Adam", "Never odd or even",
            "Doc, note: I dissent. A fast never prevents a fatness. I diet on cod" })
    void testEvaluate_True(String palindrome) {
        assertTrue(evaluator.evaluate(palindrome));
    }

    @ParameterizedTest
    @ValueSource(strings = { "a1ba", "ab2a?", "a 3 ba", "12343212", "Able was I ere I saw Elba, huh?",
            "A man, a plant, a canal – Panama", "Madam, I'm not Adam", "Always odd or even",
            "Doc, note: I dissent. A fast never prevents a fatness. I diet on cola" })
    void testEvaluate_False(String palindrome) {
        assertFalse(evaluator.evaluate(palindrome));
    }
}
