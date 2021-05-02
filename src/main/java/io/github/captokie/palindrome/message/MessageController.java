package io.github.captokie.palindrome.message;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.github.captokie.palindrome.PalindromeEvaluator;
import io.swagger.v3.oas.annotations.media.Schema;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageRepository repository;
    private final PalindromeEvaluator palindromeEvaluator;

    public MessageController(MessageRepository repository, PalindromeEvaluator palindromeEvaluator) {
        this.repository = repository;
        this.palindromeEvaluator = palindromeEvaluator;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<Message> findAll() {
        return repository.findAll();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Message> findOne(@Schema(description = "The ID of the message") @PathVariable("id") String id) {
        return repository.findById(id).switchIfEmpty(notFound());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Message> create(@Validated @RequestBody Message message) {
        message.setId(null);
        return save(message);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Message> update(@Schema(description = "The ID of the message") @PathVariable("id") String id,
            @Validated @RequestBody Message message) {
        return repository.findById(id).map(existingMessage -> {
            existingMessage.setValue(message.getValue());
            return existingMessage;
        }).flatMap(this::save).switchIfEmpty(notFound());
    }

    private Mono<Message> save(Message message) {
        message.setPalindrome(palindromeEvaluator.evaluate(message.getValue()));
        return repository.save(message);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> delete(@Schema(description = "The ID of the message") @PathVariable("id") String id) {
        return repository.deleteById(id);
    }

    private static <T> Mono<T> notFound() {
        return Mono.error(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
