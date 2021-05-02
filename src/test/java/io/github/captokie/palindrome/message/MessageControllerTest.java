package io.github.captokie.palindrome.message;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import io.github.captokie.palindrome.PalindromeEvaluator;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class MessageControllerTest {

    MessageController controller;
    @Mock
    MessageRepository repository;
    @Mock
    PalindromeEvaluator palindromeEvaluator;
    Message message;

    @BeforeEach
    void setUp() {
        controller = new MessageController(repository, palindromeEvaluator);
        message = new Message();
        message.setId("message_id");
        message.setPalindrome(true);
        message.setValue("message_value");
    }

    @Test
    void testFindAll() {
        when(repository.findAll()).thenReturn(Flux.empty());
        assertEquals(Arrays.asList(), controller.findAll().collectList().block());

        when(repository.findAll()).thenReturn(Flux.just(message));
        assertEquals(Arrays.asList(message), controller.findAll().collectList().block());
    }

    @Test
    void testFindOne() {
        when(repository.findById("message_id")).thenReturn(Mono.empty());
        Mono<Message> mono = controller.findOne("message_id");
        ResponseStatusException e = assertThrows(ResponseStatusException.class, () -> mono.block());
        assertEquals(HttpStatus.NOT_FOUND, e.getStatus());

        when(repository.findById("message_id")).thenReturn(Mono.just(message));
        assertSame(message, controller.findOne("message_id").block());
    }

    @Test
    void testCreate() {
        Message create = new Message();
        create.setPalindrome(true);
        create.setValue("message_value");

        when(palindromeEvaluator.evaluate("message_value")).thenReturn(false);
        when(repository.save(create)).thenReturn(Mono.just(message));
        assertSame(message, controller.create(create).block());
        assertFalse(create.isPalindrome());
    }

    @Test
    void testUpdate() {
        Message update = new Message();
        update.setValue("new_message_value");

        when(repository.findById("message_id")).thenReturn(Mono.empty());
        Mono<Message> mono = controller.update("message_id", update);
        ResponseStatusException e = assertThrows(ResponseStatusException.class, () -> mono.block());
        assertEquals(HttpStatus.NOT_FOUND, e.getStatus());

        when(repository.findById("message_id")).thenReturn(Mono.just(message));
        when(palindromeEvaluator.evaluate("new_message_value")).thenReturn(false);
        when(repository.save(message)).thenReturn(Mono.just(message));
        assertSame(message, controller.update("message_id", update).block());
        assertFalse(message.isPalindrome());
    }

    @Test
    void testDelete() {
        when(repository.deleteById("message_id")).thenReturn(Mono.just(false));
        Mono<Void> mono = controller.delete("message_id");
        ResponseStatusException e = assertThrows(ResponseStatusException.class, () -> mono.block());
        assertEquals(HttpStatus.NOT_FOUND, e.getStatus());

        when(repository.deleteById("message_id")).thenReturn(Mono.just(true));
        assertNull(controller.delete("message_id").block());
    }
}
