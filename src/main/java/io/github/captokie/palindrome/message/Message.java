package io.github.captokie.palindrome.message;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

@Document
public class Message {

    @Nullable
    private String id;
    private String value;
    private boolean palindrome = false;

    /**
     * @return The ID of the message, or <code>null</code> if it hasn't been stored
     *         yet
     */
    @Nullable
    public String getId() {
        return id;
    }

    /**
     * @param id The ID of the message, or <code>null</code> if it hasn't been
     *           stored yet
     */
    public void setId(@Nullable String id) {
        this.id = id;
    }

    /**
     * @return The text value representing the actual message
     */
    public String getValue() {
        return value;
    }

    /**
     * @param value The text value representing the actual message
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * @return <code>true</code> if the message is a palindrome, <code>false</code>
     *         otherwise
     */
    public boolean isPalindrome() {
        return palindrome;
    }

    /**
     * @param palindrome <code>true</code> if the message is a palindrome,
     *                   <code>false</code> otherwise
     */
    public void setPalindrome(boolean palindrome) {
        this.palindrome = palindrome;
    }
}
