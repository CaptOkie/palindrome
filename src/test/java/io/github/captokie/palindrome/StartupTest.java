package io.github.captokie.palindrome;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.mongodb.reactivestreams.client.MongoClient;

@SpringBootTest
class StartupTest {

    @MockBean
    MongoClient client;

    @Test
    void contextLoads() {
    }
}
