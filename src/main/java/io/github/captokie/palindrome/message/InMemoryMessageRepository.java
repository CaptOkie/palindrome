package io.github.captokie.palindrome.message;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class InMemoryMessageRepository implements MessageRepository {

    private final Map<String, Message> messages = new ConcurrentHashMap<>();

    @Override
    public Flux<Message> findAll() {
        return Flux.fromIterable(messages.values());
    }

    @Override
    public Mono<Message> findById(String id) {
        return Mono.justOrEmpty(messages.get(id));
    }

    @Override
    public Mono<Message> save(Message message) {
        if (message.getId() == null) {
            message.setId(UUID.randomUUID().toString());
        }
        messages.put(message.getId(), message);
        return Mono.just(message);
    }

    @Override
    public Mono<Boolean> deleteById(String id) {
        return Mono.just(messages.remove(id) != null);
    }
}
