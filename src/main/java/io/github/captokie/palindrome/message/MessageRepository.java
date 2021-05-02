package io.github.captokie.palindrome.message;

import org.springframework.data.repository.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * The interface for managing {@link Message} resources
 */
public interface MessageRepository extends Repository<Message, String> {

    /**
     * @return All the messages in the repository
     */
    Flux<Message> findAll();

    /**
     * @param id The ID of the message to look up
     * @return The message with the matching ID, otherwise an empty result
     */
    Mono<Message> findById(String id);

    /**
     * @param message The message to either create or update. If the message has no
     *                ID set, then a new entry will be created, otherwise the
     *                message with the matching ID will be updated.
     * @return The updated message
     */
    Mono<Message> save(Message message);

    /**
     * @param id The ID of the message to delete
     * @return <code>true</code> if a message was deleted, <code>false</code>
     *         otherwise
     */
    Mono<Boolean> deleteById(String id);
}
