package io.github.captokie.palindrome;

/**
 * Checks whether or not values are palindromes
 */
@FunctionalInterface
public interface PalindromeEvaluator {

    /**
     * @param text The String to check if it is a palindrome
     * @return <code>true</code> if the String is a palindrome, <code>false</code>
     *         otherwise
     */
    boolean evaluate(String text);
}
