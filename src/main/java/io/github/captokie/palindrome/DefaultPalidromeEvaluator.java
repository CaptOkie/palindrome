package io.github.captokie.palindrome;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The default implementation of {@link PalindromeEvaluator} that allows a
 * pattern to be configured to remove characters from the values to be checked
 */
@Service
public class DefaultPalidromeEvaluator implements PalindromeEvaluator {

    private final Pattern removalPattern;

    /**
     * @param removalPattern The pattern to use to match the characters to remove
     *                       before checking if a String is a palindrome
     */
    public DefaultPalidromeEvaluator(Pattern removalPattern) {
        this.removalPattern = removalPattern;
    }

    /**
     * Uses a removal pattern of <code>[^a-z0-9]</code>
     */
    @Autowired
    public DefaultPalidromeEvaluator() {
        this(Pattern.compile("[^a-z0-9]"));
    }

    @Override
    public boolean evaluate(String text) {
        text = removalPattern.matcher(text.toLowerCase()).replaceAll("");
        // Integer division is fine since it's equivalent to flooring the result and we
        // can ignore the middle character in odd length strings
        int halfLength = text.length() / 2;
        // Iterate from the start and end simultaneously
        for (int i = 0; i < halfLength; ++i) {
            int j = text.length() - 1 - i;
            if (text.charAt(i) != text.charAt(j)) {
                return false;
            }
        }
        return true;
    }
}
